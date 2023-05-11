import crypto from 'crypto'

// A workaround to nanoid being incompatible with commonjs
const random = (bytes: number) => crypto.randomBytes(bytes)
const customRandom = (
  alphabet: string,
  size: number,
  getRandom: (x: number) => Uint8Array
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
const customAlphabet = (alphabet: string, size: number) =>
  customRandom(alphabet, size, random)

const ALPHABET =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const ID_LENGTH = 16
export const generatePublicId = customAlphabet(ALPHABET, ID_LENGTH)
