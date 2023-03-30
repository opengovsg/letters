import { useNavigate } from 'react-router-dom'

import { BUILDER_ROUTE } from '~constants/routes'

type UseRowActionDropdownReturn = {
  handleUseTemplate: () => void
  handleEditTemplate: () => void
  handlePreviewTemplate: () => void
  handleDeleteTemplate: () => void
}

export const useRowActionDropdown = (
  templateId: number,
): UseRowActionDropdownReturn => {
  const navigate = useNavigate()
  return {
    handleUseTemplate: () => navigate(`/issue/${templateId}`),
    handleEditTemplate: () => navigate(`${BUILDER_ROUTE}/${templateId}`),
    handlePreviewTemplate: () =>
      console.log(`preview button clicked for template id: ${templateId}`),
    handleDeleteTemplate: () =>
      console.log(
        `delete template button clicked for template id: ${templateId}`,
      ),
  }
}
