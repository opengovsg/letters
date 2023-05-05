import { useParams } from 'react-router-dom'

export const useTemplateId = (): { templateId: number } => {
  const { templateId } = useParams()
  if (!templateId) throw new Error('No templateId provided')
  return { templateId: Number(templateId) }
}

export const useGetTemplateById = (templateId: number) => {
  // TODO: insert react query call here
  console.log(`getting template for ${templateId}`)
  return { name: 'Certificate of Participation IMDA' }
}
