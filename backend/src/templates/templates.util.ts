import { Editor, Issuer, User } from 'database/entities'
import { EntityManager } from 'typeorm'
import mustache from 'mustache'

export const UIN_TOKEN = 'UIN'
export const UIN_TYPE_TOKEN = 'UIN Type'

/**
 * Checks whether a user is an editor of a template.
 */
export const isTemplateEditor = async (
  user: User,
  manager: EntityManager,
  templateId: number,
) => {
  const editor = await manager.findOne(Editor, {
    where: {
      user,
      template: {
        id: templateId,
      },
    },
  })
  return !!editor
}

/**
 * Checks whether a user is an editor of a template.
 */
export const isTemplateIssuer = async (
  user: User,
  manager: EntityManager,
  templateId: number,
) => {
  const issuer = await manager.findOne(Issuer, {
    where: {
      user,
      template: {
        id: templateId,
      },
    },
  })
  return !!issuer
}

/**
 * Checks whether a user is an editor OR issuer of a template.
 */
export const isTemplateEditorOrIssuer = async (
  user: User,
  manager: EntityManager,
  templateId: number,
) => {
  return (
    (await isTemplateEditor(user, manager, templateId)) ||
    (await isTemplateIssuer(user, manager, templateId))
  )
}

/**
 * eg. "This {{noun}} is {{adjective}}." -> ["noun", "adjective"]
 * @param body - body of block
 * @returns Array of parameter keys
 */

export const parseTemplate = (body: string): Array<string> => {
  const vars: Set<string> = new Set()

  const parsed = mustache.parse(body)
  for (const meta of parsed) {
    const type = meta[0]
    const token = meta[1]

    // uin and uin_type are required properties of the memo and should not be included in the params
    if (type === 'name' && token !== UIN_TOKEN && token !== UIN_TYPE_TOKEN) {
      if (!token) {
        // TODO: throw an error? This currently ignores empty keys
        continue
      }
      vars.add(token)
    }
  }

  return Array.from(vars)
}

/**
 * Returns a templated string given the template string and required parameters.
 */
export const renderTemplate = (
  template: string,
  params: Record<string, string>,
): string => {
  return mustache.render(template, params)
}
