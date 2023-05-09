import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, EntityManager, Repository } from 'typeorm'

import { BulkRequestBody } from '~shared/dtos/create-bulk-letter.dto'
import { CreateLetterDto } from '~shared/dtos/create-letter.dto'
import { UpdateLetterDto } from '~shared/dtos/update-letter.dto'

import { BatchesService } from '../batches/batches.service'
import { Batch, Letter, Template } from '../database/entities'
import { TemplatesService } from '../templates/templates.service'

@Injectable()
export class LettersService {
  @InjectRepository(Letter)
  private repository: Repository<Letter>
  readonly PLACE_HOLDER_PREFIX = '{{'
  readonly PLACE_HOLDER_SUFFIX = '}}'
  constructor(
    private readonly templatesService: TemplatesService,
    private readonly batchesService: BatchesService,
    private readonly dataSource: DataSource,
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
      const letterDtos = this.bulkRender(bulkRequest, template, userId, batch)
      const letters = await this.bulkCreateWithTransaction(
        letterDtos,
        entityManager,
      )
      return letters
    })
  }

  private bulkRender(
    bulkRequest: BulkRequestBody,
    template: Template,
    userId: number,
    batch: Batch,
  ) {
    const letterDtos = []
    for (const letterParamMap of bulkRequest.letterParamMaps) {
      const issuedLetter = this.render(template.html, letterParamMap)
      letterDtos.push({
        userId: userId,
        batchId: batch.id,
        templateId: bulkRequest.templateId,
        issuedLetter: issuedLetter,
        fieldValues: JSON.stringify(letterParamMap),
        shortLink: '',
      })
    }
    return letterDtos
  }

  private render(
    html: string,
    letterParamMap: { [key: string]: string },
  ): string {
    for (const key in letterParamMap) {
      const value = letterParamMap[key]
      const placeHolder = `${this.PLACE_HOLDER_PREFIX}${key}${this.PLACE_HOLDER_SUFFIX}`
      html = html.replace(placeHolder, value)
    }
    return html
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
