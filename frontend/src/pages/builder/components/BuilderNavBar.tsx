import { useMemo } from 'react'
import {
  BiDotsHorizontalRounded,
  BiLeftArrowAlt,
  BiShareAlt,
  BiShow,
  BiUserPlus,
} from 'react-icons/bi'
import {
  Box,
  Button,
  ButtonGroup,
  ButtonProps,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Input,
  useDisclosure,
} from '@chakra-ui/react'

import { useEditor } from '~features/builder/EditorContext'

export interface BuilderNavBarProps {
  /**
   * Minimum form info needed to render the navbar.
   * If not provided, the navbar will be in a loading state.
   */

  handleBackButtonClick: () => void
  handleAddCollabButtonClick: () => void
  handleSaveTemplateClick: () => void
  handleCreateMemoClick: () => void
}

/**
 * @precondition Must have AdminFormTabProvider parent due to usage of TabList and Tab.
 */
export const BuilderNavBar = ({
  handleAddCollabButtonClick,
  handleBackButtonClick,
  handleSaveTemplateClick,
  handleCreateMemoClick,
}: BuilderNavBarProps): JSX.Element => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { activeTemplateName, setActiveTemplateName } = useEditor()
  const mobileDrawerExtraButtonProps: Partial<ButtonProps> = useMemo(
    () => ({
      isFullWidth: true,
      iconSpacing: '1rem',
      justifyContent: 'flex-start',
      variant: 'clear',
      colorScheme: 'secondary',
      textStyle: 'body-1',
    }),
    [],
  )

  return (
    <Grid
      w="100vw"
      position="sticky"
      top={0}
      flexDir="column"
      templateColumns={{
        base: '1fr',
        lg: 'repeat(2, minmax(0, 1fr))',
      }}
      templateRows="min-content"
      templateAreas={{
        base: `'left right' 'actions actions' 'tabs tabs'`,
        lg: `'left tabs right'`,
      }}
      boxShadow={{ lg: '0 1px 1px var(--chakra-colors-neutral-300)' }}
      bg="white"
      zIndex="docked"
    >
      <GridItem
        display="flex"
        flex={1}
        alignItems="center"
        gridArea="left"
        py="0.625rem"
        pl={{ base: '1.5rem', md: '1.75rem', lg: '2rem' }}
        pr="1rem"
      >
        <Box>
          <IconButton
            mr="0.5rem"
            aria-label="Go back to dashboard"
            variant="clear"
            colorScheme="secondary"
            onClick={handleBackButtonClick}
            icon={<BiLeftArrowAlt />}
          />
        </Box>
        <Box flex={1}>
          <Input
            value={activeTemplateName}
            type="text"
            aria-label="Enter a name for template"
            onChange={(event) => setActiveTemplateName(event.target.value)}
          />
        </Box>
      </GridItem>

      <Flex
        py="0.625rem"
        pl="1rem"
        pr={{ base: '1.5rem', md: '1.75rem', lg: '2rem' }}
        flex={1}
        gridArea="right"
        justify="flex-end"
        align="center"
      >
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          aria-label="Form actions"
          onClick={onOpen}
          icon={<BiDotsHorizontalRounded />}
        />
        <Box display={{ base: 'none', md: 'flex' }}>
          <ButtonGroup spacing="0.5rem">
            <IconButton
              aria-label="Manage collaborators"
              variant="outline"
              onClick={handleAddCollabButtonClick}
              icon={<BiUserPlus />}
              disabled={true}
            />
            <Button onClick={handleSaveTemplateClick}>Save Template</Button>
            {/* <Button onClick={handleCreateMemoClick}>Create Memo</Button> */}
          </ButtonGroup>
        </Box>
      </Flex>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderTopRadius="0.25rem">
          <DrawerBody px={0} py="0.5rem">
            <ButtonGroup flexDir="column" spacing={0} w="100%">
              <Button
                onClick={handleSaveTemplateClick}
                {...mobileDrawerExtraButtonProps}
                leftIcon={<BiShow fontSize="1.25rem" />}
              >
                Save template
              </Button>
              <Button
                {...mobileDrawerExtraButtonProps}
                onClick={handleCreateMemoClick}
                leftIcon={<BiShareAlt fontSize="1.25rem" />}
              >
                Create a memo from this template
              </Button>
              <Button
                {...mobileDrawerExtraButtonProps}
                onClick={handleAddCollabButtonClick}
                leftIcon={<BiUserPlus fontSize="1.25rem" />}
                disabled={true}
              >
                Manage collaborators
              </Button>
            </ButtonGroup>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Grid>
  )
}
