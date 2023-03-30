import { ELEMENT_PARAGRAPH } from '@udecode/plate'
import { Node } from 'slate'

type Leaf = {
  text: string
} & {
  [key: string]: boolean
}

export const createElement = (
  text: string,
  { type, mark }: { type?: string; mark?: string } = {},
): unknown => {
  const leaf: Leaf = Object.assign({ text }, mark ? { [mark]: true } : {})

  return {
    type: type || ELEMENT_PARAGRAPH,
    children: [leaf],
  }
}

const KEYWORD_REGEXP = new RegExp('{{\\s*([a-zA-Z0-9_]+)\\s*}}', 'gi')
export const getKeywords = (value: string): string[] => {
  let match
  const result = new Set<string>()
  while ((match = KEYWORD_REGEXP.exec(value))) {
    result.add(match[1].toLowerCase())
  }
  return Array.from(result)
}
export const serializeNodesToString = (nodes: Node[]): string => {
  return nodes.map((n) => Node.string(n)).join('\n')
}
