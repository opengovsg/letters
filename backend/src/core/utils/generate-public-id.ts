import crypto from 'crypto'

import { PROTECTED_NAMESPACES } from '~shared/constants/protected-namespaces'

// A workaround to nanoid being incompatible with commonjs
const random = (bytes: number) => crypto.randomBytes(bytes)
const customRandom = (
  alphabet: string,
  size: number,
  blockSize: number,
  getRandom: (x: number) => Uint8Array,
) => {
  let dashMod = blockSize // the number by which id length should be divisible for adding a '-'
  const mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  const step = -~((1.6 * mask * size) / alphabet.length)
  return () => {
    let id = ''
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const bytes = getRandom(step)
      // A compact alternative for `for (var i = 0; i < step; i++)`.
      let j = step
      while (j--) {
        // Adding `|| ''` refuses a random byte that exceeds the alphabet size.
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
        if (id.length && id.length % dashMod == 0) {
          id += '-'
          dashMod += blockSize + 1
        }
      }
    }
  }
}
const customAlphabet = (alphabet: string, blockSize: number, size: number) =>
  customRandom(alphabet, size, blockSize, random)

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz'
const BLOCK_SIZE = 5
const GROUPS = 4
const ID_LENGTH = BLOCK_SIZE * GROUPS + GROUPS - 1

export const generatePublicId = (
  generator = customAlphabet(ALPHABET, BLOCK_SIZE, ID_LENGTH),
): string => {
  let id = generator()
  // if publicId is in protected name space, regenerate
  while (PROTECTED_NAMESPACES.includes(id)) {
    id = generator()
  }

  return id
}
