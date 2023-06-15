import { Letter } from '../database/entities/letter.entity'
import { LettersEncryptionService } from './letters-encryption.service'
import { RenderedLetter } from './letters-rendering.service'

describe('LettersEncryptionService', () => {
  let service: LettersEncryptionService

  beforeEach(() => {
    service = new LettersEncryptionService()
  })

  describe('encryption & decryption', () => {
    it('should decrypt a letter that has been encrypted before when the correct password is provided', () => {
      const letter = '<p>Hello, {{name}}!</p>'
      const letterParamMap = JSON.stringify({ name: 'John' })

      const password = 'hunter2'

      const encryptedLetter: RenderedLetter = service.encryptLetter(
        { issuedLetter: letter, fieldValues: letterParamMap },
        password,
      )
      const decryptedLetter: Letter = service.decryptLetter(
        { ...new Letter(), ...encryptedLetter },
        password,
      )

      expect(encryptedLetter.issuedLetter).not.toEqual(letter)
      expect(decryptedLetter.issuedLetter).toEqual(letter)
      expect(encryptedLetter.fieldValues).not.toEqual(letterParamMap)
      expect(decryptedLetter.fieldValues).toEqual(letterParamMap)
    })

    it('should NOT decrypt a letter when the provided password is wrong (for a short letter)', () => {
      const letter = '<p>Hello, {{name}}!</p>'
      const letterParamMap = JSON.stringify({ name: 'John' })
      const password = 'hunter2'
      const wrongPassword = 'This is the wrong password'
      const encryptedLetter: RenderedLetter = service.encryptLetter(
        { issuedLetter: letter, fieldValues: letterParamMap },
        password,
      )

      expect(() => {
        service.decryptLetter(
          { ...new Letter(), ...encryptedLetter },
          wrongPassword,
        )
      }).toThrow('Invalid Key')
    })

    it('should NOT decrypt a letter when the provided password is wrong (for a long letter)', () => {
      const letter =
        '<p>Hello, {{name}}!</p><p>Hello, {{name}}!</p><p>Hello, {{name}}!</p><p>Hello, {{name}}!</p><p>Hello, {{name}}!</p><p>Hello, {{name}}!</p><p>Hello, {{name}}!</p><p>Hello, {{name}}!</p><p>Hello, {{name}}!</p><p>Hello, {{name}}!</p><p>Hello, {{name}}!</p><p>Hello, {{name}}!</p><p>Hello, {{name}}!</p>'
      const letterParamMap = JSON.stringify({ name: 'John' })
      const password = 'hunter2'
      const wrongPassword = 'This is the wrong password'
      const encryptedLetter: RenderedLetter = service.encryptLetter(
        { issuedLetter: letter, fieldValues: letterParamMap },
        password,
      )

      expect(() => {
        service.decryptLetter(
          { ...new Letter(), ...encryptedLetter },
          wrongPassword,
        )
      }).toThrow('Malformed UTF-8 data')
    })
  })
})
