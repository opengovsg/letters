import ApiService from '~services/ApiService'

// TODO: migrate to shared types
enum TemplateStatus {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
  Archived = 'ARCHIVED',
}

enum TemplateBlockType {
  Header = 'HEADER',
  Text = 'TEXT',
}

interface TemplateHeaderBlock {
  type: TemplateBlockType.Header
  data: string
}

interface TemplateTextBlock {
  type: TemplateBlockType.Text
  data: string
}

type TemplateBlock = TemplateHeaderBlock | TemplateTextBlock

export interface Template {
  id: number
  version: number
  status: TemplateStatus
  author: number
  editor: number

  name: string
  body: TemplateBlock[]
  paramsRequired: string[]
}

const TEMPLATES_ENDPOINT = '/templates'
const templatesApi = ApiService.url(TEMPLATES_ENDPOINT)

/**
 * Gets a template and its latest version based on id
 */
export const getTemplate = (templateId: number): Promise<Template> => {
  return templatesApi.url(`/${templateId}`).get().json()
}
