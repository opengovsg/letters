import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Template, TemplateVersion, User, Memo } from 'database/entities'
import { randomBytes } from 'crypto'
import { pick } from 'lodash'
import {
  isTemplateIssuer,
  renderTemplate,
  UIN_TOKEN,
  UIN_TYPE_TOKEN,
} from 'templates/templates.util'
import { Connection } from 'typeorm'
import { TemplateStatus } from 'types'

import {
  CreateMemoDto,
  CreateMemoResponseDto,
  GetMemoMetaResponseDto,
  GetMemoResponseDto,
} from './dto'
import { ListMemosForUserDto } from 'users/dto'

@Injectable()
export class MemosService {
  constructor(private connection: Connection) {}

  // Creates a new memo
  async createMemo(
    issuer: User,
    _data: CreateMemoDto,
  ): Promise<CreateMemoResponseDto> {
    const { templateId, versionId, uin, uinType, params, expiresAt } = _data
    /*
    1. Check template status
      b. If not public, fail.
    2. Check if user is an issuer.
    3. Check if versionId exists, if not, retrieve latest version
    4. Retrieve template version
      a. body, paramsRequired
    5. Check if params provided matches the params_required.
      a. uin and uinType must exist.
    5. Create memo, return slug.
    */
    const template = await this.connection.manager.findOne(Template, {
      where: {
        id: templateId,
      },
    })

    if (!template || template.status !== TemplateStatus.Public) {
      // Whether the template is private or archived shouldn't matter to issuers
      throw new NotFoundException("Template doesn't exist, or is inaccessible.")
    }

    // Check if user is an issuer
    const isIssuer = await isTemplateIssuer(
      issuer,
      this.connection.manager,
      templateId,
    )
    if (!isIssuer) {
      throw new ForbiddenException('User is not issuer of this template.')
    }

    const templateVersion = await this.connection.manager.findOne(
      TemplateVersion,
      {
        where: {
          template,
          // Get the lastest version if versionId is provided
          ...(versionId ? { version: versionId } : { isLatestVersion: true }),
        },
      },
    )

    if (!templateVersion) {
      // This really shouldn't happen...
      throw new NotFoundException('Template version not found.')
    }

    // Match the params, check for uin and uinType
    for (const key of templateVersion.paramsRequired) {
      if (!params[key]) {
        throw new BadRequestException('All required params must be provided')
      }
    }

    // Expiry cannot be in the past, for now.
    if (expiresAt) {
      const expiry = new Date(expiresAt)
      if (expiry < new Date()) {
        throw new BadRequestException('Expiry date cannot be in the past.')
      }
    }

    // TODO: Verify uin against uinType.

    let slug
    // eslint-disable-next-line no-constant-condition
    while (true) {
      slug = randomBytes(16).toString('hex')
      const sameSlug = await this.connection.manager.findOne(Memo, {
        where: { slug },
      })
      // If another memo with the same slug doesn't exist, break
      if (!sameSlug) break
    }

    const pending = this.connection.manager.create(Memo, {
      templateVersion,
      issuer,
      uin,
      uinType,
      slug,
      params,
      expiresAt,
    })
    const memo = await this.connection.manager.save(pending)

    return { slug: memo.slug }
  }

  async voidMemos(): Promise<void> {
    return
  }
  async uploadMemos(): Promise<void> {
    return
  }
  async uploadMemosComplete(): Promise<void> {
    return
  }

  async listMemosForUser(
    userId: number,
    query: ListMemosForUserDto,
  ): Promise<GetMemoMetaResponseDto[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { templateId, version, page, limit } = query

    // TODO: Fetch by page, limit
    if (!templateId && version) {
      throw new BadRequestException('Cannot provide version without template.')
    }

    const issued = await this.connection.manager.find(Memo, {
      where: {
        issuer: { id: userId },
        // If templateId is provided, filter by it
        ...(templateId && {
          templateVersion: {
            template: { id: templateId },
            // If version is given, filter by it
            ...(version && { version }),
          },
        }),
      },
      relations: ['templateVersion', 'templateVersion.template'],
    })

    return issued.map((m) => ({
      id: m.id,
      issuer: m.issuer,
      slug: m.slug,
      createdAt: m.createdAt,
      template: m.templateVersion.template.name,
    }))
  }

  // Retrieves an existing memo based on slug
  async getMemo(slug: string): Promise<GetMemoResponseDto> {
    const memo = await this.connection.manager.findOne(Memo, {
      where: {
        slug,
      },
      relations: ['issuer', 'templateVersion'],
    })
    if (!memo) {
      throw new NotFoundException()
    }

    // Interpolate parameters
    const {
      templateVersion: { body },
      params,
    } = memo
    const renderedBody = body.map((block) => {
      // If data is not a string, return untouched
      if (typeof block.data !== 'string') return block
      return {
        ...block,
        data: renderTemplate(block.data, {
          ...params,
          [UIN_TOKEN]: memo.uin,
          [UIN_TYPE_TOKEN]: memo.uinType,
        }),
      }
    })

    return {
      ...pick(memo, [
        'id',
        'issuer',
        'uin',
        'uinType',
        'expiresAt',
        'isViewed',
        'isVoid',
        'voidReason',
      ]),
      body: renderedBody,
      slug,
    }
  }
}
