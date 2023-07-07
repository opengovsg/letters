import crypto from 'crypto'

import { PROTECTED_NAMESPACES } from '~shared/constants/protected-namespaces'

// A workaround to nanoid being incompatible with commonjs
const random = (bytes: number) => crypto.randomBytes(bytes)
const customRandom = (
  alphabet: string,
  size: number,
  getRandom: (x: number) => Uint8Array,
) => {
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
      }
    }
  }
}

const splitStrIntoBlocks = (
  stringToSplit: string,
  blockSize: number,
  divider = '-',
) => {
  // throws error if the stirng is not divisible by blockSize
  if (stringToSplit.length % blockSize != 0) {
    throw new Error('The string cannot be split into equal block sizes.')
  }
  // generate regex pattern for recurrently matching a string length of blockSize
  const matchBlockSizeRegex = new RegExp(`(.{${blockSize}})`, 'g')

  // now, simply match with the above generated regex and insert dividers
  // also remove the last character to remove the extra added '-' at the end using .slice(0, -1)
  return stringToSplit.replace(matchBlockSizeRegex, '$1' + divider).slice(0, -1)
}

const customAlphabet = (alphabet: string, size: number) =>
  customRandom(alphabet, size, random)

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz'
const BLOCK_SIZE = 5
const GROUPS = 4
const ID_LENGTH = BLOCK_SIZE * GROUPS

/*
 * Generates publicID of the format `xzyqd-dsfss-sdfs0-sdfss`
 * Where each alphabet belongs to the ALPHABET const string above
 * The letter ID contains 4 GROUPS and each group has a BLOCK_SIZE of 5
 */
export const generatePublicId = (
  generator = customAlphabet(ALPHABET, ID_LENGTH),
): string => {
  let id = splitStrIntoBlocks(generator(), BLOCK_SIZE)
  // if publicId is in protected name space, regenerate
  while (PROTECTED_NAMESPACES.includes(id)) {
    id = splitStrIntoBlocks(generator(), BLOCK_SIZE)
  }

  return id
}
