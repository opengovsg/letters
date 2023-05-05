import { Flex, HStack, Text } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { Link as RouterLink } from 'react-router-dom'

interface TemplateHeaderProps {
  templateName: string
}

export const TemplateHeader = ({
  templateName,
}: TemplateHeaderProps): JSX.Element => {
  return (
    <Flex
      position="static"
      pos="relative"
      flexDir="row"
      p={6}
      justifyContent="space-between"
      borderBottom="1px"
      borderBottomColor="base.divider.medium"
      w="full"
      align="center"
    >
      <HStack spacing={4}>
        <RouterLink to={'/admin/templates'}>
          <Button variant="link" leftIcon={<BiLeftArrowAlt />}>
            All templates
          </Button>
        </RouterLink>
        <Text>/</Text>
        <Text>{`Bulk issue ${templateName}`}</Text>
      </HStack>
    </Flex>
  )
}
