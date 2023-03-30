import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import {
  Editor,
  Issuer,
  Template,
  TemplateVersion,
  User,
} from 'database/entities'
import { isEqual, union } from 'lodash'
import { Connection, In } from 'typeorm'
import { TemplateStatus } from 'types'
import {
  CreateTemplateDto,
  CreateTemplateResponseDto,
  GetTemplateMetaResponseDto,
  GetTemplateResponseDto,
  UpdateTemplateDto,
  UpdateTemplateResponseDto,
} from './dto'
import {
  isTemplateEditor,
  isTemplateEditorOrIssuer,
  parseTemplate,
} from './templates.util'

@Injectable()
export class TemplatesService {
  constructor(private connection: Connection) {}

  // Creates a new template
  async createTemplate(
    author: User,
    _data: CreateTemplateDto,
  ): Promise<CreateTemplateResponseDto> {
    const { name, body } = _data

    return this.connection.transaction(async (manager) => {
      // Create template
      const template = manager.create(Template, {
        name,
        author,
        status: TemplateStatus.Public,
      })
      await manager.save(template)

      // Create template version
      const paramsRequired = body.flatMap((block) => {
        if (typeof block.data !== 'string') return []
        return parseTemplate(block.data)
      })
      const templateVersion = manager.create(TemplateVersion, {
        template,
        editor: author,
        version: 1, // new template, first version
        body,
        paramsRequired,
      })
      await manager.save(templateVersion)

      // Add author as an editor and issuer
      const editor = manager.create(Editor, {
        template,
        user: author,
      })
      await manager.save(editor)

      const issuer = manager.create(Issuer, {
        template,
        user: author,
      })
      await manager.save(issuer)

      return { id: template.id, version: templateVersion.version }
    })
  }

  async updateTemplate(
    editor: User,
    _data: UpdateTemplateDto & { templateId: number },
  ): Promise<UpdateTemplateResponseDto> {
    const { name, body, templateId } = _data

    // Check that there is a template version to actually update
    const oldVersion = await this.connection.manager.findOne(TemplateVersion, {
      where: {
        template: { id: templateId },
        isLatestVersion: true,
      },
      relations: ['template'],
    })

    if (!oldVersion) {
      throw new NotFoundException('Template to update not found.')
    }

    // Check if user is editor.
    const isAllowed = await isTemplateEditor(
      editor,
      this.connection.manager,
      templateId,
    )

    if (!isAllowed) {
      throw new ForbiddenException('User has no edit permissions.')
    }

    // If no changes, return as is.
    if (isEqual(oldVersion.body, body) && oldVersion.template.name == name) {
      return { id: oldVersion.template.id, version: oldVersion.version }
    }

    return this.connection.transaction(async (manager) => {
      // Update the template name if required.
      if (oldVersion.template.name !== name) {
        await manager.update(Template, templateId, {
          name,
        })
      }

      let version = oldVersion.version
      if (!isEqual(oldVersion.body, body)) {
        // Deprecate old version
        await manager.update(TemplateVersion, oldVersion.id, {
          isLatestVersion: false,
        })
        // Create new template version
        const paramsRequired = body.flatMap((block) => {
          if (typeof block.data !== 'string') return []
          return parseTemplate(block.data)
        })
        version += 1 // Bump up version number
        const templateVersion = manager.create(TemplateVersion, {
          template: { id: templateId },
          editor,
          version,
          body,
          paramsRequired,
        })
        await manager.save(templateVersion)
      }

      return { id: templateId, version }
    })
  }

  async hideTemplate(_templateId: number): Promise<void> {
    return
  }

  // Retrieves an existing template
  async getTemplate(
    requester: User,
    _templateId: number,
  ): Promise<GetTemplateResponseDto> {
    // Find template
    const template = await this.connection.manager.findOne(Template, {
      where: {
        id: _templateId,
      },
      relations: ['author'],
    })
    if (!template) {
      throw new NotFoundException()
    }

    // Check if requester is editor/issuer
    // TODO: this might be a guard (?)
    const isAllowed = await isTemplateEditorOrIssuer(
      requester,
      this.connection.manager,
      _templateId,
    )
    if (!isAllowed) {
      throw new ForbiddenException()
    }

    // Find latest template version
    const templateVersion = await this.connection.manager.findOne(
      TemplateVersion,
      {
        where: {
          template,
        },
        order: {
          version: 'DESC',
        },
        relations: ['editor'],
      },
    )
    if (!templateVersion) {
      // Template found but no versions exist. This is an anomaly, should take a closer look into the error.
      throw new NotFoundException()
    }

    return {
      id: template.id,
      version: templateVersion.version,
      status: template.status,
      author: template.author.id,
      editor: templateVersion.editor.id,
      name: template.name,
      body: templateVersion.body,
      paramsRequired: templateVersion.paramsRequired,
    }
  }

  /**
   * This is so inefficient, I want to die.
   * Should have just used the query builder...
   * @param userId
   * @returns All template metadata which user is editor or issuer of.
   */
  async listTemplatesForUser(
    userId: number,
  ): Promise<GetTemplateMetaResponseDto[]> {
    const editorOf = await this.connection.manager.find(Editor, {
      where: {
        user: userId,
      },
      relations: ['template'],
    })
    // IDs of templates this user can edit
    const eTemplateIds = editorOf.map((_) => _.template.id)

    const issuerOf = await this.connection.manager.find(Issuer, {
      where: {
        user: userId,
      },
      relations: ['template'],
    })
    // IDs of templates this user can issue
    const iTemplateIds = issuerOf.map((_) => _.template.id)

    const templateIds = union(eTemplateIds, iTemplateIds)
    // We have to do this extra fetch to get the last editor
    const templates = await this.connection.manager.find(TemplateVersion, {
      where: {
        template: { id: In(templateIds) },
        isLatestVersion: true,
      },
      relations: ['editor', 'template'],
    })

    return templates.map((t) => ({
      id: t.template.id,
      status: t.template.status,
      editor: t.editor.id,
      isEditor: eTemplateIds.includes(t.template.id),
      isIssuer: iTemplateIds.includes(t.template.id),
      name: t.template.name,
      updatedAt: t.updatedAt,
    }))
  }
}
