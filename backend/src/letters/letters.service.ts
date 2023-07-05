import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
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
import { NotificationsService } from '../notifications/notifications.service'
import { TemplatesService } from '../templates/templates.service'
import { LettersEncryptionService } from './letters-encryption.service'
import { LettersRenderingService } from './letters-rendering.service'
import { LettersSanitizationService } from './letters-sanitization.service'
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
    private readonly lettersSanitizationService: LettersSanitizationService,
    private readonly lettersEncryptionService: LettersEncryptionService,
    private readonly notificationsService: NotificationsService,
    private dataSource: DataSource,
  ) {}

  async create(createLetterDto: CreateLetterDto): Promise<Letter> {
    const sanitizedCreateLetterDto =
      this.lettersSanitizationService.sanitizeLetter(createLetterDto)
    const letter = this.repository.create(sanitizedCreateLetterDto)
    return await this.repository.save(letter)
  }

  private async createWithTransaction(
    createLetterDtos: CreateLetterDto[],
    entityManager: EntityManager,
  ): Promise<Letter[]> {
    const letters = this.repository.create(createLetterDtos)
    return entityManager.save(letters)
  }

  async bulkCreate(
    userId: number,
    createBulkLetterDto: CreateBulkLetterDto,
  ): Promise<Letter[]> {
    const { templateId, letterParamMaps, passwords, phoneNumbers } =
      createBulkLetterDto
    const template = await this.templatesService.findOne(templateId)
    if (!template) throw new NotFoundException('Template not found')

    const validationResult = this.lettersValidationService.validateBulk(
      template.fields,
      letterParamMaps,
      passwords,
      phoneNumbers,
    )

    if (!validationResult.success)
      throw new BadRequestException(validationResult)

    const renderedLetters = this.lettersRenderingService.bulkRender(
      template.html,
      letterParamMaps,
    )

    const sanitizedLetters = renderedLetters.map((renderedLetter) =>
      this.lettersSanitizationService.sanitizeLetter(renderedLetter),
    )

    const securedLetters = !passwords
      ? sanitizedLetters
      : sanitizedLetters.map((letter, i) =>
          this.lettersEncryptionService.encryptLetter(letter, passwords[i]),
        )

    const createdLetters = await this.dataSource.transaction(
      async (entityManager) => {
        const createBatchDto = {
          userId,
          templateId,
        } as CreateBatchDto

        const batch = await this.batchesService.createWithTransaction(
          createBatchDto,
          entityManager,
        )
        const lettersDto = securedLetters.map(
          (securedLetters: Partial<Letter>) => ({
            ...securedLetters,
            batchId: batch.id,
            userId,
            templateId,
            shortLink: '',
            isPasswordProtected: !!passwords,
          }),
        ) as CreateLetterDto[]

        return await this.createWithTransaction(lettersDto, entityManager)
      },
    )

    if (createBulkLetterDto.phoneNumbers)
      await this.notificationsService.sendNotifications(
        userId,
        createdLetters,
        createBulkLetterDto.phoneNumbers,
      )

    return createdLetters
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

  async findOneByPublicId(
    publicId: string,
    password?: string,
  ): Promise<Letter> {
    const letter = await this.repository.findOne({
      where: {
        publicId: publicId,
      },
    })

    if (!letter) throw new NotFoundException('Letter not found')

    if (letter.isPasswordProtected) {
      if (!password) {
        throw new UnauthorizedException('No Password provided')
      }

      return this.lettersEncryptionService.decryptLetter(letter, password)
    }

    return letter
  }

  async recordFirstReadAtById(id: number) {
    const letter = await this.repository.findOneBy({ id })
    if (!letter) throw new NotFoundException('Letter not found')

    // If time that letter has been retrieved has already been recorded, then do nothing
    if (letter.firstReadAt) return

    const updatedLetter = {
      ...letter,
      firstReadAt: new Date().toISOString(),
    }

    await this.repository.save(updatedLetter)
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
