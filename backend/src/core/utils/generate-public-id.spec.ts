import { PROTECTED_NAMESPACES } from '~shared/constants/protected-namespaces'

import { generatePublicId } from './generate-public-id'

describe('generatePublicId', () => {
  test('should return a unique ID not present in PROTECTED_NAMESPACES', () => {
    const id = generatePublicId()
    expect(PROTECTED_NAMESPACES).not.toContain(id)
  })

  test('should regenerate ID if it matches a protected string', () => {
    // Create a mock function that always returns a protected string
    const mockGenerateId = jest
      .fn()
      .mockReturnValueOnce('api')
      .mockReturnValue('abcdefghi')

    // Replace the original generateId function with the mock function
    const id = generatePublicId(mockGenerateId)

    // Expect the mock generateId function to be called twice (once for the initial match and once for the regenerated ID)
    expect(mockGenerateId).toHaveBeenCalledTimes(2)
    // Expect the regenerated ID to be different from the protected string
    expect(PROTECTED_NAMESPACES).not.toContain(id)
    // Expect the output to be 'abcdefghi'
    expect(id).toEqual('abcdefghi')
  })
})
