export type LetterParamMaps = Array<{ [key: string]: string }>

export interface BulkRequestBody {
  templateId: number
  letterParamMaps: LetterParamMaps
}
