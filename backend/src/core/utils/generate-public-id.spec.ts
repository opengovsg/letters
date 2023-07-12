import { PROTECTED_NAMESPACES } from '~shared/constants/protected-namespaces'

import { generatePublicId } from './generate-public-id'

describe('generatePublicId', () => {
  test('should return a unique ID not present in PROTECTED_NAMESPACES', () => {
    const id = generatePublicId()
    expect(PROTECTED_NAMESPACES).not.toContain(id)
  })

  test('should regenerate ID if it matches a protected string', () => {
    const mockGenerator = jest
      .fn()
      .mockReturnValueOnce('apicd')
      .mockReturnValue('abcdeabcdeabcdeabcde')

    const id = generatePublicId(mockGenerator)

    expect(mockGenerator).toHaveBeenCalledTimes(1)
    expect(PROTECTED_NAMESPACES).not.toContain(id)
    expect(id).toEqual('apicd')
  })

  test('should throw error if ID string is not divisible by block size', () => {
    const mockGenerator = jest
      .fn()
      .mockReturnValueOnce('api')
      .mockReturnValue('abcdefgj')

    expect(() => {
      generatePublicId(mockGenerator)
    }).toThrow()
  })

  test('should correctly insert delimeter in the id string generated', () => {
    const mockGenerator = jest.fn().mockReturnValueOnce('23432dfdsf')

    const id = generatePublicId(mockGenerator)

    expect(id).toEqual('23432-dfdsf')
  })
})
