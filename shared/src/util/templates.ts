import { ACCEPTED_TEMPLATE_FIELDS_REGEX } from '../constants/regex'

export const getTemplateFields = (html: string): string[] => {
  // returns array of unique valid template fields
  const fields: string[] = []
  let match: RegExpExecArray | null

  while ((match = ACCEPTED_TEMPLATE_FIELDS_REGEX.exec(html)) !== null) {
    if (!fields.includes(match[1])) fields.push(match[1])
  }
  return fields
}

export const parseTemplateField = (field: string): string =>
  field.trim().toLowerCase()
