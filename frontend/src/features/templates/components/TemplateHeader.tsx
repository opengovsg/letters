import { Box, Flex, HStack, Icon, Text } from '@chakra-ui/react'
import {
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
} from '@chakra-ui/stepper'
import { Button } from '@opengovsg/design-system-react'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { Link as RouterLink } from 'react-router-dom'

export interface TemplateHeaderProps {
  activeStep: number
}

export const TemplateHeader = ({
  activeStep,
}: TemplateHeaderProps): JSX.Element => {
  const steps = ['SETTINGS', 'UPLOAD CSV', 'DOWNLOAD']

  return (
    <Flex
      position="static"
      pos="relative"
      flexDir="row"
      p={5}
      justifyContent="space-between"
      borderBottom="1px"
      borderBottomColor="base.divider.medium"
      w="full"
      align="center"
    >
      <HStack spacing={4}>
        <HStack spacing={4} fontSize={'14px'}>
          <RouterLink to={'/admin/templates'}>
            <Button variant="link" leftIcon={<BiLeftArrowAlt />}>
              All templates
            </Button>
          </RouterLink>
          <Text>/</Text>
          <Text>Issue Letter</Text>
        </HStack>
        {/* Fix styling of the stepper, shouldn't be using paddingLeft technically */}
        <Box paddingLeft={'225px'}>
          <Stepper index={activeStep} gap="20" color="grey.200">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Text textStyle="caption-3" fontSize={'14px'} flexShrink={'0'}>
                  {step}
                </Text>
              </Step>
            ))}
          </Stepper>
        </Box>
      </HStack>
    </Flex>
  )
}
