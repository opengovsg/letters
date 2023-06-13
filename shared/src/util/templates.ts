import { TEMPLATE_KEYWORD_REGEX } from '../constants/regex'

export const convertFieldsToLowerCase = (fields: string[]): string[] =>
  fields.map((field: string) => field.toLowerCase())

export const deduplicateFields = (fields: string[]): string[] => [
  ...new Set(fields),
]

export const setHtmlKeywordsToLowerCase = (html: string): string =>
  html.replace(
    TEMPLATE_KEYWORD_REGEX,
    (match: string, keyword: string) => `{{${keyword.toLowerCase()}}}`,
  )
