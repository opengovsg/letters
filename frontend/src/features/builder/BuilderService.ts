import ApiService from '../../services/ApiService'

const TEMPLATES_ENDPOINT = '/templates'
//const MEMOS_ENDPOINT = '/memos'

const TemplatesApi = ApiService.url(TEMPLATES_ENDPOINT)

export enum TemplateBlockType {
  Header = 'HEADER',
  Text = 'TEXT',
}
export interface SaveTemplateProps {
  name: string
  body: Array<{ type: TemplateBlockType; data: string }>
}

export const saveTemplate = async (data: SaveTemplateProps): Promise<void> => {
  return TemplatesApi.url('/').post(data).res()
}

export const updateTemplate = async (
  templateId: string,
  data: SaveTemplateProps,
): Promise<void> => {
  return TemplatesApi.url(`/${templateId}`).put(data).res()
}

export interface GetTemplateProps {
  templateId: string
}
export class GetTemplateResponseDto {
  name!: string
  body!: { data: string }[]
}

export const getTemplate = async (
  data: GetTemplateProps,
): Promise<GetTemplateResponseDto> => {
  return TemplatesApi.url(`/${data.templateId}`).get().json()
}
