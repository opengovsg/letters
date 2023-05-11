import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, EntityManager, Repository } from 'typeorm'

import {
  CreateBulkLetterDto,
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
    createBulkLetterDto: CreateBulkLetterDto,
  ): Promise<Letter[]> {
    const { templateId, letterParamMaps } = createBulkLetterDto
    const template = await this.templatesService.findOne(templateId)
    if (!template) throw new NotFoundException('Template not found')
    // TODO: validation logic
    const renderedLetters = this.lettersRenderingService.bulkRender(
      template.html,
      letterParamMaps,
    )
    return await this.dataSource.transaction(async (entityManager) => {
      const createBatchDto = {
        userId,
        templateId,
        rawCsv: JSON.stringify(letterParamMaps),
      } as CreateBatchDto

      const batch = await this.batchesService.createWithTransaction(
        createBatchDto,
        entityManager,
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
