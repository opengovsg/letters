import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

import { DASHBOARD_ROUTE } from '~constants/routes'

import { useEditor } from '~features/builder/EditorContext'

import { BuilderNavBar } from './BuilderNavBar'

const useBuilderNavBar = () => {
  const navigate = useNavigate()
  const { activeTemplateName, saveTemplate } = useEditor()
  const toast = useToast()

  const handleBackToDashboard = useCallback(
    (): void => navigate(DASHBOARD_ROUTE),
    [navigate],
  )

  const handleAddCollaborator = useCallback((): void => {
    console.log('add collab button clicked')
  }, [])

  const handleSaveTemplate = async () => {
    try {
      await saveTemplate()
      toast({
        title: `${activeTemplateName} saved.`,
        position: 'top',
        status: 'success',
      })
    } catch (err) {
      toast({
        title: `Failed to save ${activeTemplateName}.`,
        position: 'top',
        status: 'error',
      })
    }
    navigate(DASHBOARD_ROUTE)
  }

  const handleCreateMemo = useCallback((): void => {
    console.log('create memo button clicked')
  }, [])

  return {
    handleBackToDashboard,
    handleAddCollaborator,
    handleCreateMemo,
    handleSaveTemplate,
  }
}

/**
 * @precondition Must have AdminFormTabProvider parent due to usage of TabList and Tab.
 */
export const BuilderNavBarContainer = (): JSX.Element => {
  const {
    handleBackToDashboard,
    handleAddCollaborator,
    handleCreateMemo,
    handleSaveTemplate,
  } = useBuilderNavBar()

  return (
    <BuilderNavBar
      handleBackButtonClick={handleBackToDashboard}
      handleAddCollabButtonClick={handleAddCollaborator}
      handleCreateMemoClick={handleCreateMemo}
      handleSaveTemplateClick={handleSaveTemplate}
    />
  )
}
