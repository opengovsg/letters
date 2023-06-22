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
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Text,
  useDisclosure,
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
  const {
    isOpen: isPopoverOpen,
    onOpen: onPopoverOpen,
    onClose: onPopoverClose,
  } = useDisclosure()

  if (!letter) return <></>
  const letterPublicLink = getLetterPublicLink(letter.publicId)

  const handleCopy = () => {
    void navigator.clipboard.writeText(letterPublicLink)
    onPopoverOpen()

    setTimeout(() => {
      // hide the popover after 1 second
      onPopoverClose()
    }, 1000)
  }

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
                    <Box position="relative">
                      <Popover isOpen={isPopoverOpen} placement="right-end">
                        <IconButton onClick={handleCopy}>
                          <PopoverTrigger>
                            <BiCopy size="1.5rem" />
                          </PopoverTrigger>
                        </IconButton>
                        <PopoverContent
                          marginTop={12}
                          maxWidth="30%"
                          bg="grey.600"
                          color="white"
                        >
                          <PopoverBody>Copied</PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </Box>
                  </HStack>
                }
              />
              <GridItem
                heading="Read Reciept"
                content={<Text>{letter.firstReadAt ?? 'Unread'}</Text>}
              />
              <GridItem
                heading="Issued on"
                content={<Text>{letter.createdAt}</Text>}
              />
              <GridItem
                heading="Template used"
                content={<Text>{letter.templateName}</Text>}
              />
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
