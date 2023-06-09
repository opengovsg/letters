import { normalizeFields, normalizeHtmlKeywords } from '../templates'

describe('Template Utils', () => {
  describe('normalizeFields', () => {
    it('should return an array with lowercase and unique values', () => {
      const fields = ['Field1', 'field2', 'FIELD1', 'Field3']
      const normalizedFields = normalizeFields(fields)
      expect(normalizedFields).toEqual(['field1', 'field2', 'field3'])
    })

    it('should return an empty array if input is empty', () => {
      const fields: string[] = []
      const normalizedFields = normalizeFields(fields)
      expect(normalizedFields).toEqual([])
    })
  })

  describe('normalizeHtmlKeywords', () => {
    it('should replace HTML keywords with lowercase versions', () => {
      const html = '<h1>{{KEYWORD1}}</h1><p>{{Keyword2}}</p>'
      const normalizedHtml = normalizeHtmlKeywords(html)
      expect(normalizedHtml).toEqual('<h1>{{keyword1}}</h1><p>{{keyword2}}</p>')
    })

    it('should not modify the HTML if there are no keywords', () => {
      const html = '<h1>This is a heading</h1><p>This is a paragraph</p>'
      const normalizedHtml = normalizeHtmlKeywords(html)
      expect(normalizedHtml).toEqual(html)
    })
  })
})
