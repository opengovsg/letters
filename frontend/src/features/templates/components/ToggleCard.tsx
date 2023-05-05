import { Card } from '@chakra-ui/react'
import { ReactNode } from 'react'

export interface ToggleCardProps {
  children?: ReactNode
  shouldDisplay: boolean
}

export const ToggleCard = ({ children, shouldDisplay }: ToggleCardProps) => {
  return shouldDisplay ? (
    <Card minW="50vw" variant="outline" alignItems="center" padding={8}>
      {children}
    </Card>
  ) : (
    <></>
  )
}
