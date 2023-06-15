import {
  convertFieldsToLowerCase,
  deduplicateFields,
  setHtmlKeywordsToLowerCase,
} from '../templates'

describe('convertFieldsToLowerCase', () => {
  test('converts fields array to lowercase', () => {
    const fields = ['Field1', 'FIELD2', 'field3']
    const result = convertFieldsToLowerCase(fields)
    expect(result).toEqual(['field1', 'field2', 'field3'])
  })

  test('returns an empty array if input is empty', () => {
    const fields: string[] = []
    const result = convertFieldsToLowerCase(fields)
    expect(result).toEqual([])
  })
})

describe('deduplicateFields', () => {
  test('removes duplicate values from the fields array', () => {
    const fields = ['field1', 'field2', 'field1', 'field2']
    const result = deduplicateFields(fields)
    expect(result).toEqual(['field1', 'field2'])
  })

  test('preserves the order of unique values', () => {
    const fields = ['field1', 'field2', 'field1', 'field3', 'field2']
    const result = deduplicateFields(fields)
    expect(result).toEqual(['field1', 'field2', 'field3'])
  })

  test('returns an empty array if input is empty', () => {
    const fields: string[] = []
    const result = deduplicateFields(fields)
    expect(result).toEqual([])
  })
})

describe('setHtmlKeywordsToLowerCase', () => {
  test('sets matched keywords in HTML to lowercase', () => {
    const html = '<p>{{Keyword1}}</p><p>{{KEYWORD2}}</p>'
    const result = setHtmlKeywordsToLowerCase(html)
    expect(result).toEqual('<p>{{keyword1}}</p><p>{{keyword2}}</p>')
  })

  test('leaves HTML unchanged if no keywords are found', () => {
    const html = '<p>Hello world</p>'
    const result = setHtmlKeywordsToLowerCase(html)
    expect(result).toEqual('<p>Hello world</p>')
  })

  test('returns an empty string if input is empty', () => {
    const html = ''
    const result = setHtmlKeywordsToLowerCase(html)
    expect(result).toEqual('')
  })
})
