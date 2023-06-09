import { TEMPLATE_KEYWORD_REGEX } from '../constants/regex'

export const normalizeFields = (fields: string[]): string[] => {
  return [
    ...new Set<string>(fields.map((field: string) => field.toLowerCase())),
  ]
}

export const normalizeHtmlKeywords = (html: string): string => {
  return html.replace(
    TEMPLATE_KEYWORD_REGEX,
    (match: string, keyword: string) => `{{${keyword.toLowerCase()}}}`,
  )
}
