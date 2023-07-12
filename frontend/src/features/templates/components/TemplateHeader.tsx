import { Flex, HStack, Image, Text } from '@chakra-ui/react'
import {
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepStatus,
} from '@chakra-ui/stepper'
import { Button } from '@opengovsg/design-system-react'
import { useFormContext } from 'react-hook-form'
import { Link as RouterLink } from 'react-router-dom'

import LogoSvg from '~/assets/Logo.svg'
import { CitizenNotificationMethod } from '~shared/dtos/letters.dto'

export interface TemplateHeaderProps {
  activeStep: number
}

export const TemplateHeader = ({
  activeStep,
}: TemplateHeaderProps): JSX.Element => {
  const { getValues } = useFormContext()
  const steps =
    getValues('notificationMethod') === CitizenNotificationMethod.SMS
      ? ['SETTINGS', 'UPLOAD CSV', 'SEND']
      : ['SETTINGS', 'UPLOAD CSV', 'DOWNLOAD']

  return (
    <HStack
      spacing={4}
      borderBottom="1px"
      borderBottomColor="base.divider.medium"
    >
      <Flex
        position="static"
        pos="relative"
        flexDir="row"
        p={2}
        justifyContent="space-between"
        w="38%"
        align="center"
      >
        <HStack spacing={4} fontSize={'14px'}>
          <RouterLink to={'/admin/templates'}>
            <Button
              variant="link"
              leftIcon={<Image src={LogoSvg} h={'80%'} w={'80%'} pl={'20px'} />}
            >
              All templates
            </Button>
          </RouterLink>
          <Text>/</Text>
          <Text>Issue Letter</Text>
        </HStack>
      </Flex>
      <Stepper
        index={activeStep}
        color="grey.200"
        gap="10"
        fontSize={'12'}
        size={'sm'}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Text textStyle="caption-3" flexShrink={'0'}>
              {step}
            </Text>
          </Step>
        ))}
      </Stepper>
    </HStack>
  )
}
