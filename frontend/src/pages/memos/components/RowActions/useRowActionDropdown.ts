import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

type UseRowActionDropdownReturn = {
  handleViewMemo: () => void
  handleCopyWeblink: () => void
  handleDownloadCsv: () => void
  handleVoidMemo: () => void
}

export const useRowActionDropdown = (
  memoId: number,
  slug: string,
): UseRowActionDropdownReturn => {
  const navigate = useNavigate()
  const toast = useToast()
  const handleCopyWeblink = async () => {
    const { protocol, hostname, port } = new URL(window.location.href)
    await navigator.clipboard.writeText(
      `${protocol}//${hostname}:${port}/p/${slug}`,
    )

    toast({
      title: 'Weblink copied to clipboard',
      position: 'top',
      status: 'success',
    })
  }
  return {
    handleViewMemo: () => navigate(`/p/${slug}`),
    handleCopyWeblink: handleCopyWeblink,
    handleDownloadCsv: () =>
      console.log(`download csv button clicked for memo id: ${memoId}`),
    handleVoidMemo: () =>
      console.log(`void memo button clicked for memo id: ${memoId}`),
  }
}
