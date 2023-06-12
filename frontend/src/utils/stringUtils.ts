export const pluraliseIfNeeded = (
  collection: any[],
  singular: string,
): string => (collection.length > 1 ? `${singular}s` : singular)
