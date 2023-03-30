import ApiService from '~services/ApiService'

const USERS_ENDPOINT = '/users'
const UsersApi = ApiService.url(USERS_ENDPOINT)

// This should be in a shared file with the backend.
export class TemplateMetaResponseDto {
  id!: number
  status!: string
  editor!: number
  isEditor!: boolean
  isIssuer!: boolean

  name!: string
  updatedAt!: Date
}

export class MemoMetaResponseDto {
  id!: number
  issuer!: number // Name?
  slug!: string
  createdAt!: Date // issued at

  template!: string // Name of template for this memo
}

/**
 * Gets metadata for all templates in dashboard view i.e. templates which user
 * owns or collaborates on
 * @returns Metadata required for templates on dashboard view
 */
export const getTemplatesView = async (
  userId: number,
): Promise<TemplateMetaResponseDto[]> => {
  return UsersApi.url(`/${userId}/templates`).get().json()
}

/**
 * Gets metadata for all memos in dashboard view i.e. memos which user
 * has issued
 * @returns Metadata required for memos on dashboard view
 */
export const getMemosView = async (
  userId: number,
): Promise<MemoMetaResponseDto[]> => {
  return UsersApi.url(`/${userId}/memos`).get().json()
}
