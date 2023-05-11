export const publicQueryKeys = {
  base: 'public' as const,
  letters: (letterPublicId: string) =>
    [publicQueryKeys.base, letterPublicId] as const,
}
