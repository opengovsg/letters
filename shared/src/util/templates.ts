import {
  TEMPLATE_KEYWORD_CHAR_REGEX,
  TEMPLATE_KEYWORD_DELIMITER_REGEX,
  TEMPLATE_KEYWORD_REGEX,
} from '../constants/regex'

export const convertFieldsToLowerCase = (fields: string[]): string[] =>
  fields.map((field: string) => field.toLowerCase())

export const deduplicateFields = (fields: string[]): string[] => [
  ...new Set(fields),
]

export const setHtmlKeywordsToLowerCase = (html: string): string => {
  return html.replace(
    TEMPLATE_KEYWORD_DELIMITER_REGEX,
    (match: string) => `${match.toLowerCase()}`,
  )
}

export const getHtmlFields = (html: string) => {
  const fields: string[] = []
  let match: RegExpExecArray | null

  while ((match = TEMPLATE_KEYWORD_REGEX.exec(html)) !== null)
    if (
      TEMPLATE_KEYWORD_CHAR_REGEX.test(match[1]) &&
      !fields.includes(match[1])
    )
      fields.push(match[1])

  return convertFieldsToLowerCase(fields)
}

export const isFieldsInvalid = (fields: string[]) => {
  const invalidFields: string[] = []

  fields.forEach((field) => {
    if (!TEMPLATE_KEYWORD_CHAR_REGEX.test(field)) invalidFields.push(field)
  })

  return invalidFields.length > 0 ? invalidFields : false
}
