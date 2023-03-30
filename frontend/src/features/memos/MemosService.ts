import ApiService from '~services/ApiService'

const MEMOS_ENDPOINT = '/memos'
const memosApi = ApiService.url(MEMOS_ENDPOINT)

// TODO: stub until we setup shared types
interface Memo {
  id: number
  issuer: Record<string, string>
  slug: string

  uin: string
  uinType: string

  expiresAt?: Date
  isViewed: boolean
  isVoid: boolean
  voidReason?: string

  body: Array<{
    type: string
    data: string
  }>
}

export interface CreateMemo {
  templateId: number
  versionId?: number
  uin: string
  uinType: string // TODO restrict
  params: Record<string, string>
  expiresAt?: string
}

interface CreateMemoResponse {
  slug: string
}

/**
 * Gets a memo based on slug
 */
export const getMemo = async (slug: string): Promise<Memo> => {
  return memosApi.url(`/${slug}`).get().json()
}

export const createMemo = async (
  memo: CreateMemo,
): Promise<CreateMemoResponse> => {
  return memosApi.post(memo).json()
}
