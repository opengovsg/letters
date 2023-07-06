import { getTemplateFields, parseTemplateField } from '../templates'

describe('getTemplateFields', () => {
  test('returns an empty array if no template fields are found', () => {
    const html = '<div>No fields</div>'
    const expectedFields = []

    const result = getTemplateFields(html)

    expect(result).toEqual(expectedFields)
  })

  test('returns an array of unique valid template fields', () => {
    const html =
      '<div>{{Field1}}</div><div>{{Field2}}</div><div>{{Field1}}</div>'
    const expectedFields = ['Field1', 'Field2']

    const result = getTemplateFields(html)

    expect(result).toEqual(expectedFields)
  })

  test('allows leading and trailing whitespace in template fields', () => {
    const html = '<div>{{   Field1   }}</div><div>{{Field2}}</div>'
    const expectedFields = ['   Field1   ', 'Field2']

    const result = getTemplateFields(html)

    expect(result).toEqual(expectedFields)
  })

  test('allows alphanumeric characters and and underscore in template fields', () => {
    const html = '<div>{{name1}}{{EMail}}{{Da_Te}}</div>'
    const expectedFields = ['name1', 'EMail', 'Da_Te']

    const result = getTemplateFields(html)

    expect(result).toEqual(expectedFields)
  })

  test('invalid variables should be treated as plain text', () => {
    const html = '<div>{{nam&34e1}} {{Email}}{{Da Te}}</div>'
    const expectedFields = ['Email']

    const result = getTemplateFields(html)

    expect(result).toEqual(expectedFields)
  })
})

describe('parseTemplateField', () => {
  test('replaces "&nbsp;" with an empty string', () => {
    const field = 'Field&nbsp;1'
    const expectedParsedField = 'field1'

    const result = parseTemplateField(field)

    expect(result).toEqual(expectedParsedField)
  })

  test('trims leading and trailing whitespace', () => {
    const field = '  Field2  '
    const expectedParsedField = 'field2'

    const result = parseTemplateField(field)

    expect(result).toEqual(expectedParsedField)
  })

  test('converts the field to lowercase', () => {
    const field = 'Field3'
    const expectedParsedField = 'field3'

    const result = parseTemplateField(field)

    expect(result).toEqual(expectedParsedField)
  })
})
