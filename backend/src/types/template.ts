export enum TemplateStatus {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
  Archived = 'ARCHIVED',
}

export enum TemplateBlockType {
  Header = 'HEADER',
  Text = 'TEXT',
}

export interface TemplateHeaderBlock {
  type: TemplateBlockType.Header
  data: string
}

export interface TemplateTextBlock {
  type: TemplateBlockType.Text
  data: string
}

export type TemplateBlock = TemplateHeaderBlock | TemplateTextBlock
