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
      const passwordInstructions = undefined
      const phoneNumbers = undefined

      const result = service.validateBulk(
        [],
        [],
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

      expect(result.success).toBe(true)
      expect(result.message).toEqual('Validation Success')
      expect(result.errors).toBeUndefined()
    })

    it('should validate passwords when they are enabled but none are set', () => {
      const passwords: string[] = ['']
      const fields = ['field1']
      const phoneNumbers = undefined
      const letterParamMaps: LetterParamMaps = [
        {
          field1: 'param1',
        },
      ]
      const passwordInstructions =
        'These are some instructions to unlock the letters'

      const result = service.validateBulk(
        fields,
        letterParamMaps,
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

      expect(result.success).toBe(false)
      expect(result.message).toEqual('Malformed bulk create object')
      expect(result.errors).toEqual([
        { id: 0, param: 'Password', message: 'Missing param' },
      ])
    })

    it('should fail when one password is missing ', () => {
      const passwords: string[] = ['hunter2', '', 'hunter2']
      const fields = ['field1']
      const phoneNumbers = undefined
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
      const passwordInstructions =
        'These are some instructions to unlock the letters'

      const result = service.validateBulk(
        fields,
        letterParamMaps,
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

      expect(result.success).toBe(false)
      expect(result.message).toEqual('Malformed bulk create object')
      expect(result.errors).toEqual([
        { id: 1, param: 'Password', message: 'Missing param' },
      ])
    })

    it('should immediately fail the number passwords is not matching the number of letters', () => {
      const passwords: string[] = ['hunter2', 'hunter2', 'hunter2']
      const fields = ['field1', 'field2', 'field3']
      const phoneNumbers = undefined
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
      const passwordInstructions =
        'These are some instructions to unlock the letters'

      const result = service.validateBulk(
        fields,
        letterParamMaps,
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

      expect(result.success).toBe(false)
      expect(result.message).toEqual(
        'Number of passwords does not match number of letters',
      )
    })

    it('should succeed when all passwords are provided ', () => {
      const passwords: string[] = ['hunter2', 'hunter2', 'hunter2']
      const fields = ['field1']
      const phoneNumbers = undefined
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
      const passwordInstructions =
        'These are some instructions to unlock the letters'

      const result = service.validateBulk(
        fields,
        letterParamMaps,
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

      expect(result.success).toBe(true)
      expect(result.message).toEqual('Validation Success')
      expect(result.errors).toBeUndefined()
    })
  })

  describe('validate password instructions', () => {
    it('should not validate if the password instructions are less than 10 characters', () => {
      const passwords: string[] = ['hunter2', 'hunter2', 'hunter2']
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
      const passwordInstructions = 'They are'
      const phoneNumbers = undefined
      const result = service.validateBulk(
        fields,
        letterParamMaps,
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

      expect(result.success).toBe(false)
      expect(result.message).toEqual(
        'Password instructions need to have a minimum of 10 characters',
      )
      expect(result.errors).toBeUndefined()
    })

    it('should validate if the password instructions are more than 10 characters', () => {
      const passwords: string[] = ['hunter2', 'hunter2', 'hunter2']
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
      const passwordInstructions =
        'These are some instructions to unlock the letters'
      const phoneNumbers = undefined
      const result = service.validateBulk(
        fields,
        letterParamMaps,
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

      expect(result.success).toBe(true)
      expect(result.message).toEqual('Validation Success')
      expect(result.errors).toBeUndefined()
    })
  })

  describe('validate letterParams exist in Template', () => {
    it('should succeed when all params exist in template', () => {
      const passwords = undefined
      const fields = ['field1', 'field2', 'field3']
      const phoneNumbers = undefined
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
      const passwordInstructions =
        'These are some instructions to unlock the letters'

      const result = service.validateBulk(
        fields,
        letterParamMaps,
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

      expect(result.success).toBe(true)
      expect(result.message).toEqual('Validation Success')
      expect(result.errors).toBeUndefined()
    })

    it('should fail when a param is not a field in the template', () => {
      const passwords = undefined
      const fields = ['field1', 'field2']
      const phoneNumbers = undefined
      const letterParamMaps: LetterParamMaps = [
        {
          field1: 'param1',
          field2: 'param2',
          'field not in template': 'param3',
        },
      ]
      const passwordInstructions = undefined

      const result = service.validateBulk(
        fields,
        letterParamMaps,
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

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
      const passwordInstructions = undefined
      const fields = ['field1', 'field2', 'field3']
      const phoneNumbers = undefined
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

      const result = service.validateBulk(
        fields,
        letterParamMaps,
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

      expect(result.success).toBe(true)
      expect(result.message).toEqual('Validation Success')
      expect(result.errors).toBeUndefined()
    })

    it('should fail when a template field is not present in the params', () => {
      const passwords = undefined
      const passwordInstructions = undefined
      const fields = ['field1', 'field2', 'field3']
      const phoneNumbers = undefined
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

      const result = service.validateBulk(
        fields,
        letterParamMaps,
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

      expect(result.success).toBe(false)
      expect(result.message).toEqual('Malformed bulk create object')
      expect(result.errors).toEqual([
        { id: 1, message: 'Missing param', param: 'field3' },
      ])
    })

    it('should fail when a param field is empty', () => {
      const passwords = undefined
      const passwordInstructions = undefined
      const fields = ['field1', 'field2', 'field3']
      const phoneNumbers = undefined
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

      const result = service.validateBulk(
        fields,
        letterParamMaps,
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

      expect(result.success).toBe(false)
      expect(result.message).toEqual('Malformed bulk create object')
      expect(result.errors).toEqual([
        { id: 1, message: 'Missing param', param: 'field3' },
      ])
    })
  })

  describe('validate Phone numbers', () => {
    it('should not validate phone numbers if none are set', () => {
      const passwords = undefined
      const phoneNumbers = undefined
      const passwordInstructions = undefined
      const result = service.validateBulk(
        [],
        [],
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

      expect(result.success).toBe(true)
      expect(result.message).toEqual('Validation Success')
      expect(result.errors).toBeUndefined()
    })

    it('should validate phone numbers when they are enabled but none are set', () => {
      const passwords = undefined
      const passwordInstructions = undefined
      const phoneNumbers: string[] = ['']
      const fields = ['field1']
      const letterParamMaps: LetterParamMaps = [
        {
          field1: 'param1',
        },
      ]

      const result = service.validateBulk(
        fields,
        letterParamMaps,
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

      expect(result.success).toBe(false)
      expect(result.message).toEqual('Malformed bulk create object')
      expect(result.errors).toEqual([
        { id: 0, param: 'Phone Number', message: 'Invalid phone number' },
      ])
    })

    it('should allow phone numbers of with "+65", "65", "65-", or "+65-" prefix', () => {
      const passwords = undefined
      const passwordInstructions = undefined
      const phoneNumbers: string[] = [
        '+6588877766',
        '6588877766',
        '65-88877766',
        '+65-88877766',
      ]
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
        {
          field1: 'param1',
        },
      ]

      const result = service.validateBulk(
        fields,
        letterParamMaps,
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

      expect(result.success).toBe(true)
      expect(result.message).toEqual('Validation Success')
    })
    it('should fail validation of phone numbers when they are of the wrong format', () => {
      const passwords = undefined
      const passwordInstructions = undefined
      const phoneNumbers: string[] = ['+4912345678', '+6512345']
      const fields = ['field1']
      const letterParamMaps: LetterParamMaps = [
        {
          field1: 'param1',
        },
        {
          field1: 'param1',
        },
      ]

      const result = service.validateBulk(
        fields,
        letterParamMaps,
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

      expect(result.success).toBe(false)
      expect(result.message).toEqual('Malformed bulk create object')
      expect(result.errors).toEqual([
        { id: 0, param: 'Phone Number', message: 'Invalid phone number' },
        { id: 1, param: 'Phone Number', message: 'Invalid phone number' },
      ])
    })

    it('should fail when one phone Number is missing ', () => {
      const passwords = undefined
      const passwordInstructions = undefined
      const phoneNumbers: string[] = ['+6588877766', '', '+6588877766']
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

      const result = service.validateBulk(
        fields,
        letterParamMaps,
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

      expect(result.success).toBe(false)
      expect(result.message).toEqual('Malformed bulk create object')
      expect(result.errors).toEqual([
        { id: 1, param: 'Phone Number', message: 'Invalid phone number' },
      ])
    })

    it('should immediately fail the number phone numbers is not matching the number of letters', () => {
      const passwords = undefined
      const passwordInstructions = undefined
      const phoneNumbers: string[] = [
        '+6588877766',
        '+6588877766',
        '+6588877766',
      ]
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

      const result = service.validateBulk(
        fields,
        letterParamMaps,
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

      expect(result.success).toBe(false)
      expect(result.message).toEqual(
        'Number of phone numbers does not match number of letters',
      )
    })

    it('should succeed when all phone numbers are provided ', () => {
      const passwords = undefined
      const passwordInstructions = undefined
      const phoneNumbers: string[] = [
        '+6588877766',
        '+6588877766',
        '+6588877766',
      ]
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

      const result = service.validateBulk(
        fields,
        letterParamMaps,
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

      expect(result.success).toBe(true)
      expect(result.message).toEqual('Validation Success')
      expect(result.errors).toBeUndefined()
    })
  })

  describe('validate Bulk', () => {
    it('should succeed when request data is valid', () => {
      const passwords: string[] = ['hunter2', 'hunter2']
      const passwordInstructions = undefined
      const phoneNumbers: string[] = ['+6588877766', '+6588877766']
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

      const result = service.validateBulk(
        fields,
        letterParamMaps,
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

      expect(result.success).toBe(true)
      expect(result.message).toEqual('Validation Success')
      expect(result.errors).toBeUndefined()
    })

    it('should raise errors with correct ids and messages when request data is not valid', () => {
      const phoneNumbers: string[] = ['+6588877766', '']
      const passwords: string[] = ['hunter2', '']
      const passwordInstructions =
        'These are some password instructions to unlock the letters'
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

      const result = service.validateBulk(
        fields,
        letterParamMaps,
        passwords,
        passwordInstructions,
        phoneNumbers,
      )

      expect(result.success).toBe(false)
      expect(result.message).toEqual('Malformed bulk create object')
      expect(result.errors).toEqual([
        { id: 0, message: 'Missing param', param: 'field missing' },
        { id: 1, message: 'Missing param', param: 'field3' },
        { id: 1, message: 'Missing param', param: 'field missing' },
        { id: 1, message: 'Missing param', param: 'Password' },
        { id: 1, message: 'Invalid phone number', param: 'Phone Number' },
      ])
    })
  })
})
