import { LetterParamMaps } from '~shared/dtos/letters.dto'

import { LettersValidationService } from './letters-validation.service'

describe('LettersValidationService', () => {
  let service: LettersValidationService

  beforeAll(() => {
    service = new LettersValidationService()
  })

  describe('validate Passwords', () => {
    it('should not validate passwords if none are set', () => {
      const passwords = undefined

      const result = service.validateBulk([], [], passwords)

      expect(result.success).toBe(true)
      expect(result.message).toEqual('Validation Success')
      expect(result.errors).toBeUndefined()
    })

    it('should validate passwords when they are enabled but none are set', () => {
      const passwords: string[] = ['']
      const fields = ['field1']
      const letterParamMaps: LetterParamMaps = [
        {
          field1: 'param1',
        },
      ]

      const result = service.validateBulk(fields, letterParamMaps, passwords)

      expect(result.success).toBe(false)
      expect(result.message).toEqual('Malformed bulk create object')
      expect(result.errors).toEqual([
        { id: 0, param: 'Password', message: 'Missing param' },
      ])
    })

    it('should fail when one password is missing ', () => {
      const passwords: string[] = ['hunter22', '', 'hunter22']
      const fields = ['field1']
      const letterParamMaps: LetterParamMaps = [
        {
          field1: 'param1',
        },
        {
          field1: 'param1',
        },
        {
          field1: 'param1',
        },
      ]

      const result = service.validateBulk(fields, letterParamMaps, passwords)

      expect(result.success).toBe(false)
      expect(result.message).toEqual('Malformed bulk create object')
      expect(result.errors).toEqual([
        { id: 1, param: 'Password', message: 'Missing param' },
      ])
    })

    it('should fail when anyone password is not alphanumeric ', () => {
      const passwords: string[] = ['hunter#22', '##23232243', 'hunter22']
      const fields = ['field1']
      const letterParamMaps: LetterParamMaps = [
        {
          field1: 'param1',
        },
        {
          field1: 'param1',
        },
        {
          field1: 'param1',
        },
      ]

      const result = service.validateBulk(fields, letterParamMaps, passwords)

      expect(result.success).toBe(false)
      expect(result.message).toEqual('Malformed bulk create object')
      expect(result.errors).toEqual([
        { id: 0, param: 'Password', message: 'Password is not alphanumeric' },
        { id: 1, param: 'Password', message: 'Password is not alphanumeric' },
      ])
    })

    it('should fail when anyone password is less than 8 characters ', () => {
      const passwords: string[] = ['hunter2', 'hunter22', 'hunter22']
      const fields = ['field1']
      const letterParamMaps: LetterParamMaps = [
        {
          field1: 'param1',
        },
        {
          field1: 'param1',
        },
        {
          field1: 'param1',
        },
      ]

      const result = service.validateBulk(fields, letterParamMaps, passwords)

      expect(result.success).toBe(false)
      expect(result.message).toEqual('Malformed bulk create object')
      expect(result.errors).toEqual([
        { id: 0, param: 'Password', message: 'Short password' },
      ])
    })

    it('should immediately fail the number passwords is not matching the number', () => {
      const passwords: string[] = ['hunter2', 'hunter2', 'hunter2']
      const fields = ['field1', 'field2', 'field3']
      const letterParamMaps: LetterParamMaps = [
        {
          field1: 'param1',
          field2: 'param2',
          field3: 'param3',
        },
        {
          field1: 'param1',
          field2: 'param2',
          field3: 'param3',
        },
      ]

      const result = service.validateBulk(fields, letterParamMaps, passwords)

      expect(result.success).toBe(false)
      expect(result.message).toEqual(
        'Number of passwords does not match number of letters',
      )
    })

    it('should succeed when all passwords are provided ', () => {
      const passwords: string[] = ['hunter22', 'hunter22', 'hunter22']
      const fields = ['field1']
      const letterParamMaps: LetterParamMaps = [
        {
          field1: 'param1',
        },
        {
          field1: 'param1',
        },
        {
          field1: 'param1',
        },
      ]

      const result = service.validateBulk(fields, letterParamMaps, passwords)

      expect(result.success).toBe(true)
      expect(result.message).toEqual('Validation Success')
      expect(result.errors).toBeUndefined()
    })
  })

  describe('validate letterParams exist in Template', () => {
    it('should succeed when all params exist in template', () => {
      const passwords = undefined
      const fields = ['field1', 'field2', 'field3']
      const letterParamMaps: LetterParamMaps = [
        {
          field1: 'param1',
          field2: 'param2',
          field3: 'param3',
        },
        {
          field1: 'param1',
          field2: 'param2',
          field3: 'param3',
        },
      ]

      const result = service.validateBulk(fields, letterParamMaps, passwords)

      expect(result.success).toBe(true)
      expect(result.message).toEqual('Validation Success')
      expect(result.errors).toBeUndefined()
    })

    it('should fail when a param is not a field in the template', () => {
      const passwords = undefined
      const fields = ['field1', 'field2']
      const letterParamMaps: LetterParamMaps = [
        {
          field1: 'param1',
          field2: 'param2',
          'field not in template': 'param3',
        },
      ]

      const result = service.validateBulk(fields, letterParamMaps, passwords)

      expect(result.success).toBe(false)
      expect(result.message).toEqual('Malformed bulk create object')
      expect(result.errors).toEqual([
        {
          id: 0,
          message: 'Invalid attribute in param',
          param: 'field not in template',
        },
      ])
    })
  })

  describe('validate template fields are in letterParams', () => {
    it('should succeed when all fields are present in params', () => {
      const passwords = undefined
      const fields = ['field1', 'field2', 'field3']
      const letterParamMaps: LetterParamMaps = [
        {
          field1: 'param1',
          field2: 'param2',
          field3: 'param3',
        },
        {
          field1: 'param1',
          field2: 'param2',
          field3: 'param3',
        },
      ]

      const result = service.validateBulk(fields, letterParamMaps, passwords)

      expect(result.success).toBe(true)
      expect(result.message).toEqual('Validation Success')
      expect(result.errors).toBeUndefined()
    })

    it('should fail when a template field is not present in the params', () => {
      const passwords = undefined
      const fields = ['field1', 'field2', 'field3']
      const letterParamMaps: LetterParamMaps = [
        {
          field1: 'param1',
          field2: 'param2',
          field3: 'param2',
        },
        {
          field1: 'param1',
          field2: 'param2',
        },
      ]

      const result = service.validateBulk(fields, letterParamMaps, passwords)

      expect(result.success).toBe(false)
      expect(result.message).toEqual('Malformed bulk create object')
      expect(result.errors).toEqual([
        { id: 1, message: 'Missing param', param: 'field3' },
      ])
    })

    it('should fail when a param field is empty', () => {
      const passwords = undefined
      const fields = ['field1', 'field2', 'field3']
      const letterParamMaps: LetterParamMaps = [
        {
          field1: 'param1',
          field2: 'param2',
          field3: 'param2',
        },
        {
          field1: 'param1',
          field2: 'param2',
          field3: '',
        },
      ]

      const result = service.validateBulk(fields, letterParamMaps, passwords)

      expect(result.success).toBe(false)
      expect(result.message).toEqual('Malformed bulk create object')
      expect(result.errors).toEqual([
        { id: 1, message: 'Missing param', param: 'field3' },
      ])
    })
  })

  describe('validate Bulk', () => {
    it('should succeed when request data is valid', () => {
      const passwords: string[] = ['hunter22', 'hunter22']
      const fields = ['field1', 'field2', 'field3']
      const letterParamMaps: LetterParamMaps = [
        {
          field1: 'param1',
          field2: 'param2',
          field3: 'param3',
        },
        {
          field1: 'param1',
          field2: 'param2',
          field3: 'param3',
        },
      ]

      const result = service.validateBulk(fields, letterParamMaps, passwords)

      expect(result.success).toBe(true)
      expect(result.message).toEqual('Validation Success')
      expect(result.errors).toBeUndefined()
    })

    it('should raise errors with correct ids and messages when request data is not valid', () => {
      const passwords: string[] = ['hunter22', '']
      const fields = ['field1', 'field2', 'field3', 'field missing']
      const letterParamMaps: LetterParamMaps = [
        {
          field1: 'param1',
          field2: 'param2',
          field3: 'param3',
        },
        {
          field1: 'param1',
          field2: 'param2',
          field3: '',
        },
      ]

      const result = service.validateBulk(fields, letterParamMaps, passwords)

      expect(result.success).toBe(false)
      expect(result.message).toEqual('Malformed bulk create object')
      expect(result.errors).toEqual([
        { id: 0, message: 'Missing param', param: 'field missing' },
        { id: 1, message: 'Missing param', param: 'field3' },
        { id: 1, message: 'Missing param', param: 'field missing' },
        { id: 1, message: 'Missing param', param: 'Password' },
      ])
    })
  })
})
