import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, EntityManager, Repository } from 'typeorm'

import {
  BulkRequestBody,
  CreateLetterDto,
  UpdateLetterDto,
} from '~shared/dtos/letters.dto'

import { BatchesService } from '../batches/batches.service'
import { Batch, Letter, Template } from '../database/entities'
import { TemplatesService } from '../templates/templates.service'
import { LettersRenderingService } from './letters-rendering.service'

@Injectable()
export class LettersService {
  @InjectRepository(Letter)
  private repository: Repository<Letter>
  constructor(
    private readonly templatesService: TemplatesService,
    private readonly batchesService: BatchesService,
    private readonly lettersRenderingService: LettersRenderingService,
  ) {}

  async createWithTransaction(
    createLetterDto: CreateLetterDto,
    entityManager: EntityManager | undefined,
  ): Promise<Letter> {
    const letter = this.repository.create(createLetterDto)
    if (entityManager) {
      return await entityManager.save(letter)
    }
    return await this.repository.save(letter)
  }

  async create(createLetterDto: CreateLetterDto): Promise<Letter> {
    return await this.createWithTransaction(createLetterDto, undefined)
  }

  async bulkCreate(
    userId: number,
    bulkRequest: BulkRequestBody,
  ): Promise<Letter[]> {
    const template = await this.templatesService.findOne(bulkRequest.templateId)
    if (!template) throw new NotFoundException('Template not found')
    // TODO: validation logic
    return await this.bulkRenderAndInsert(userId, bulkRequest, template)
  }

  private async bulkRenderAndInsert(
    userId: number,
    bulkRequest: BulkRequestBody,
    template: Template,
  ) {
    return await this.dataSource.transaction(async (entityManager) => {
      const createBatchDto = {
        userId: userId,
        templateId: bulkRequest.templateId,
        rawCsv: JSON.stringify(bulkRequest.letterParamMaps),
      }
      const batch = await this.batchesService.createWithTransaction(
        createBatchDto,
        entityManager,
      )
      const renderedLetters = this.lettersRenderingService.bulkRender(
        template.html,
        bulkRequest.letterParamMaps,
      )
      const lettersDto = renderedLetters.map(
        (renderedLetter: Partial<Letter>) => ({
          ...renderedLetter,
          batchId: batch.userId,
          userId,
          templateId,
          shortLink: '',
        }),
      ) as CreateLetterDto[]
      const letters = await this.bulkCreateWithTransaction(
        letterDtos,
        entityManager,
      )
      return letters
    })
  }

  private async bulkCreateWithTransaction(
    letterDtos: CreateLetterDto[],
    entityManager: EntityManager,
  ) {
    const letters = this.repository.create(letterDtos)
    if (entityManager) {
      return await entityManager.save(letters)
    }
    return await this.repository.save(letters)
  }

  findAll() {
    return `This action returns all letters`
  }

  findOne(id: number) {
    return `This action returns a #${id} letter`
  }

  update(id: number, updateLetterDto: UpdateLetterDto) {
    return `This action updates a #${id} letter`
  }

  remove(id: number) {
    return `This action removes a #${id} letter`
  }
}
