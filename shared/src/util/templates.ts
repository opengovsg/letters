import {
  TEMPLATE_KEYWORD_CHAR_REGEX,
  TEMPLATE_KEYWORD_REGEX,
} from '../constants/regex'

export const convertFieldsToLowerCase = (fields: string[]): string[] =>
  fields.map((field: string) => field.toLowerCase())

export const deduplicateFields = (fields: string[]): string[] => [
  ...new Set(fields),
]

export const isFieldsInvalid = (fields: string[]) => {
  const invalidFields: string[] = []

  fields.forEach((field) => {
    if (!TEMPLATE_KEYWORD_CHAR_REGEX.test(field)) invalidFields.push(field)
  })

  return invalidFields.length > 0 ? invalidFields : false
}

export const setHtmlKeywordsToLowerCase = (html: string): string =>
  html.replace(
    TEMPLATE_KEYWORD_REGEX,
    (match: string, keyword: string) => `{{${keyword.toLowerCase()}}}`,
  )

export const isHtmlKeywordsInvalid = (html: string) => {
  const invalidFields: string[] = []
  const matches = html.match(TEMPLATE_KEYWORD_REGEX)

  if (matches) {
    matches.forEach((match) => {
      const key = match.slice(2, -2)
      if (!TEMPLATE_KEYWORD_CHAR_REGEX.test(key)) invalidFields.push(match)
    })
  }

  return invalidFields.length > 0 ? invalidFields : false
}
