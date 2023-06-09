import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Text,
  UseDisclosureReturn,
  VStack,
} from '@chakra-ui/react'
import { BiCopy, BiLeftArrowAlt } from 'react-icons/bi'
import { Link as RouterLink } from 'react-router-dom'

import { IconButton } from '~components/IconButton'
import { GetLetterDto } from '~shared/dtos/letters.dto'
import { getLetterPublicLink } from '~utils/linkUtils'

type IssuedLetterDrawerProp = UseDisclosureReturn & {
  letter?: GetLetterDto
}

export const IssuedLetterDrawer = ({
  onClose,
  isOpen,
  letter,
}: IssuedLetterDrawerProp): JSX.Element => {
  if (!letter) return <></>
  const letterPublicLink = getLetterPublicLink(letter.publicId)

  return (
    <Drawer size="lg" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader paddingTop="1.25rem">
            <HStack>
              <IconButton onClick={onClose}>
                <BiLeftArrowAlt size="1.5rem" />
              </IconButton>
              <Heading size="md">Letter details</Heading>
            </HStack>
          </DrawerHeader>
          <Divider />
          <DrawerBody paddingTop={8}>
            <SimpleGrid columns={2} gap={8}>
              <VStack alignItems="left">
                <Heading size="xs" textColor="grey.500">
                  Letter link
                </Heading>
                <HStack maxW="full" alignItems="center">
                  <Link
                    as={RouterLink}
                    to={`/letters/${letter.publicId}`}
                    maxW="80%"
                  >
                    {letterPublicLink}
                  </Link>
                  <IconButton
                    onClick={() => {
                      void navigator.clipboard.writeText(letterPublicLink)
                    }}
                  >
                    <BiCopy size="1.5rem" />
                  </IconButton>
                </HStack>
              </VStack>
              <VStack alignItems="left">
                <Heading size="xs" textColor="grey.500">
                  Issued on
                </Heading>
                <Text>{letter.createdAt}</Text>
              </VStack>
              <VStack alignItems="left">
                <Heading size="xs" textColor="grey.500">
                  Template used
                </Heading>
                <Text>{letter.templateName}</Text>
              </VStack>
              <VStack alignItems="left">
                <Heading size="xs" textColor="grey.500">
                  Password protected
                </Heading>
                {/* TODO: fix this */}
                <Text>Disabled</Text>
              </VStack>
            </SimpleGrid>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
