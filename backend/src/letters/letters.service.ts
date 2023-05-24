import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, EntityManager, Repository } from 'typeorm'

import { CreateBatchDto } from '~shared/dtos/batches.dto'
import {
  CreateBulkLetterDto,
  CreateLetterDto,
  UpdateLetterDto,
} from '~shared/dtos/letters.dto'

import { BatchesService } from '../batches/batches.service'
import { Letter } from '../database/entities'
import { TemplatesService } from '../templates/templates.service'
import { LettersRenderingService } from './letters-rendering.service'
import { LettersValidationService } from './letters-validation.service'

@Injectable()
export class LettersService {
  @InjectRepository(Letter)
  private repository: Repository<Letter>
  constructor(
    private readonly templatesService: TemplatesService,
    private readonly batchesService: BatchesService,
    private readonly lettersRenderingService: LettersRenderingService,
    private readonly lettersValidationService: LettersValidationService,
    private dataSource: DataSource,
  ) {}

  async create(createLetterDto: CreateLetterDto): Promise<Letter> {
    const letter = this.repository.create(createLetterDto)
    return await this.repository.save(letter)
  }

  async createWithTransaction(
    toCreate: CreateLetterDto | CreateLetterDto[],
    entityManager: EntityManager,
  ): Promise<Letter | Letter[]> {
    let created
    if (Array.isArray(toCreate)) {
      created = this.repository.create(toCreate as Partial<Letter>[])
    } else {
      created = this.repository.create(toCreate as Partial<Letter>)
    }
    return entityManager.save(created)
  }

  async bulkCreate(
    userId: number,
    createBulkLetterDto: CreateBulkLetterDto,
  ): Promise<Letter[]> {
    const { templateId, letterParamMaps } = createBulkLetterDto
    const template = await this.templatesService.findOne(templateId)
    if (!template) throw new NotFoundException('Template not found')

    const validationResult = this.lettersValidationService.validateBulk(
      template.fields,
      letterParamMaps,
    )
    if (!validationResult.success)
      throw new BadRequestException(validationResult)

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
          batchId: batch.id,
          userId,
          templateId,
          shortLink: '',
        }),
      ) as CreateLetterDto[]

      const letters = (await this.createWithTransaction(
        lettersDto,
        entityManager,
      )) as Letter[]
      return letters
    })
  }

  findAndCount(userId: number, limit: number, offset: number) {
    return this.repository.findAndCount({
      select: {
        template: {
          name: true,
        },
      },
      relations: {
        template: true,
      },
      where: { userId },
      take: limit,
      skip: offset,
      order: {
        createdAt: 'DESC',
      },
    })
  }

  async findOneByPublicId(publicId: string) {
    const letter = await this.repository.findOne({
      where: {
        publicId: publicId,
      },
    })
    if (!letter) throw new NotFoundException('Letter not found')
    return letter
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
