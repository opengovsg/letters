import {
  LettersRenderingService,
  RenderedLetter,
} from './letters-rendering.service'

describe('LettersRenderingService', () => {
  let service: LettersRenderingService

  beforeEach(() => {
    service = new LettersRenderingService()
  })

  describe('render', () => {
    it('should replace placeholders in the HTML with corresponding values', () => {
      const html = '<p>Hello, {{name}}!</p>'
      const letterParamMap = { name: 'John' }

      const result: RenderedLetter = service.render(html, letterParamMap)

      expect(result.issuedLetter).toEqual('<p>Hello, John!</p>')
      expect(result.fieldValues).toEqual('{"name":"John"}')
    })

    it('should handle multiple placeholders in the HTML', () => {
      const html = '<p>Dear {{name}}, your ID is {{id}}.</p>'
      const letterParamMap = { name: 'Alice', id: '123' }

      const result: RenderedLetter = service.render(html, letterParamMap)

      expect(result.issuedLetter).toEqual('<p>Dear Alice, your ID is 123.</p>')
      expect(result.fieldValues).toEqual('{"name":"Alice","id":"123"}')
    })
  })

  describe('bulkRender', () => {
    it('should render multiple letters correctly', () => {
      const html = 'Hello {{name}}!'
      const letterParamMaps = [{ name: 'John' }, { name: 'Jane' }]

      const results = service.bulkRender(html, letterParamMaps)

      expect(results.length).toEqual(letterParamMaps.length)
      expect(results[0].issuedLetter).toEqual('Hello John!')
      expect(results[0].fieldValues).toEqual('{"name":"John"}')
      expect(results[1].issuedLetter).toEqual('Hello Jane!')
      expect(results[1].fieldValues).toEqual('{"name":"Jane"}')
    })
  })
})
