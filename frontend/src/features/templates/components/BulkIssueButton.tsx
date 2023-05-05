import { Box, Center, HStack, Text } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'
import { ReactNode } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'

interface BulkIssueButtonProps {
  buttonIndex: number
  currIndex: number
  onClick: () => void
  isCompleted?: boolean
  children: ReactNode
}

export const BulkIssueButton = ({
  buttonIndex,
  currIndex,
  onClick,
  children,
  isCompleted,
}: BulkIssueButtonProps) => {
  const isDisabled = currIndex < buttonIndex
  const showCompleted = currIndex > buttonIndex || isCompleted
  return (
    <HStack spacing={2}>
      <Button
        isDisabled={isDisabled}
        variant="link"
        onClick={onClick}
        leftIcon={
          showCompleted ? (
            <Box as={AiFillCheckCircle} size="32" />
          ) : (
            <Center border="2px" minH="8" minW="8" borderRadius="full">
              {buttonIndex}
            </Center>
          )
        }
      >
        <Text paddingLeft={4}>{children}</Text>
      </Button>
    </HStack>
  )
}
