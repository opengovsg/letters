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
      .mockReturnValueOnce('api')
      .mockReturnValue('abcdefghi')

    const id = generatePublicId(mockGenerator)

    expect(mockGenerator).toHaveBeenCalledTimes(2)
    expect(PROTECTED_NAMESPACES).not.toContain(id)
    expect(id).toEqual('abcdefghi')
  })
})
