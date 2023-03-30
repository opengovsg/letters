export class ListMemosForUserDto {
  templateId!: number
  /**
   * If version is not supplied, defaults to retrieving latest version of template
   * Comment: Shouldn't we retrieve all memos regardless of version instead?
   */
  version?: number
  page?: number = 1
  limit?: number = 100
}
export class ListMemosForUserResponseDto {}
