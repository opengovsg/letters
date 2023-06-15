import {
  Box,
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
import { LetterViewer } from '~features/editor/components/LetterViewer'
import { GetLetterDto } from '~shared/dtos/letters.dto'
import { getLetterPublicLink } from '~utils/linkUtils'

type IssuedLetterDrawerProp = UseDisclosureReturn & {
  letter?: GetLetterDto
}

type GridItemProp = {
  heading: string
  content: string | JSX.Element
}

const GridItem = ({ heading, content }: GridItemProp): JSX.Element => {
  return (
    <VStack alignItems="left">
      <Heading size="xs" textColor="grey.500">
        {heading}
      </Heading>
      {content}
    </VStack>
  )
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
              <GridItem
                heading="Letter link"
                content={
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
                }
              />
              <GridItem
                heading="Issued on"
                content={<Text>{letter.createdAt}</Text>}
              />
              <GridItem
                heading="Template used"
                content={<Text>{letter.templateName}</Text>}
              />
              {/* TODO: fix this */}
              <GridItem
                heading="Password protection"
                content={
                  <Text>
                    {letter.isPasswordProtected ? 'Enabled' : 'Disabled'}
                  </Text>
                }
              />
            </SimpleGrid>
            {!letter.isPasswordProtected && (
              <Box py={8}>
                <GridItem
                  heading="Preview"
                  content={
                    <LetterViewer
                      isLoading={false}
                      html={letter.issuedLetter}
                    />
                  }
                />
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
