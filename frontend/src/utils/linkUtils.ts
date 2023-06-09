export const getLetterPublicLink = (publicId: string): string => {
  return `${document.location.host}/letters/${publicId}`
}
