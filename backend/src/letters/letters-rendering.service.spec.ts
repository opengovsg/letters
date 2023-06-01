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

    it('if two of the same placeholders exist in the HTML, both should be replaced', () => {
      const html = '<p>Dear {{name}}, your name is {{name}}.</p>'
      const letterParamMap = { name: 'Alice' }

      const result: RenderedLetter = service.render(html, letterParamMap)

      expect(result.issuedLetter).toEqual(
        '<p>Dear Alice, your name is Alice.</p>',
      )
      expect(result.fieldValues).toEqual('{"name":"Alice"}')
    })

    it('should not throw error if letterParamMap has additional params not in HTML', () => {
      // We expect no error to be thrown as the error-throwing is handled at the validation level
      const html = '<p>Hello, {{name}}!</p>'
      const letterParamMap = { name: 'John', date: '01/01/2010' } // date not in html

      expect(() => service.render(html, letterParamMap)).not.toThrowError()
    })

    it('should not throw error if letterParamMap does not contain param in HTML', () => {
      // We expect no error to be thrown as the error-throwing is handled at the validation level
      const html = '<p>Hello, {{name}}!</p>'
      const letterParamMap = {} // date not in html

      expect(() => service.render(html, letterParamMap)).not.toThrowError()
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
