import {
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Badge, Radio, Switch, Textarea } from '@opengovsg/design-system-react'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { MdChat, MdInfo, MdLock } from 'react-icons/md'

import PasswordInstruction from '~/assets/PasswordInstruction.svg'
import { CitizenNotificationMethod } from '~shared/dtos/letters.dto'

import { BulkIssueCard } from './BulkIssueCard'
import { BulkLetterIssueFormState } from './states/BulkLetterIssueFormState'

interface BulkIssueSettingsCardProps {
  shouldDisplay: boolean
  goToNext: () => void
}

export const BulkIssueSettingsCard = ({
  shouldDisplay,
  goToNext,
}: BulkIssueSettingsCardProps) => {
  const { register } = useFormContext<BulkLetterIssueFormState>()
  const [isPasswordProtected, setIsPasswordProtected] = useState(false)
  const [notificationMethod, setNotificationMethod] =
    useState<CitizenNotificationMethod>()

  return (
    <BulkIssueCard
      shouldDisplay={shouldDisplay}
      handleNextClick={() => goToNext()}
      buttonConfig={{
        nextButtonLabel: 'Next',
        isNextButtonDisabled: notificationMethod == null,
      }}
    >
      <Box marginBottom={'36px'}>
        <HStack textStyle="h6" marginBottom={'36px'}>
          <Icon as={MdChat} />{' '}
          <Text>How would you like to notify citizens?</Text>
        </HStack>
        <RadioGroup
          {...register('notificationMethod')}
          marginLeft={'24px'}
          onChange={(newVal: CitizenNotificationMethod) => {
            if (newVal) {
              setNotificationMethod(newVal)
            }
          }}
          value={notificationMethod}
        >
          <Stack textStyle="subhead-2">
            <Radio value={CitizenNotificationMethod.SMS}>
              <Text>Via SMS sent through LetterSG</Text>
              <Text textStyle={'caption-1'} color={'grey.400'}>
                Send letter links using a SMS{' '}
              </Text>
            </Radio>
            <Radio value={CitizenNotificationMethod.EMAIL} isDisabled>
              <HStack>
                <Text>Via Email sent through LetterSG</Text>
                <Badge colorScheme="grey" fontSize={'10px'}>
                  {' '}
                  COMING SOON{' '}
                </Badge>
              </HStack>
              <Text textStyle={'caption-1'} color={'grey.400'}>
                Send letter links using Email
              </Text>
            </Radio>
            <Radio value={CitizenNotificationMethod.NONE}>
              <Text>Don’t need to notify using LetterSG</Text>
              <Text textStyle={'caption-1'} color={'grey.400'}>
                Generates a CSV file with unique letter links{' '}
              </Text>
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>
      <hr />
      <HStack textStyle="h6" paddingTop={'36px'}>
        <Icon as={MdLock} /> <Text>Secure Letters</Text>
      </HStack>
      <Box paddingLeft="24px">
        <Flex justify="space-between">
          <Stack>
            <Text textStyle="subhead-2">Password Protection</Text>
            <Text fontSize="14px" fontWeight="400">
              You can add a unique password for each letter.{' '}
              <Link href="https://lettersg.gitbook.io/lettersg-guide/for-agency-users/bulk-generating-letters/generating-password-protected-letters">
                Password Guidelines
              </Link>{' '}
            </Text>
          </Stack>
          <Switch
            {...register('isPasswordProtected')}
            size="lg"
            colorScheme="green"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setIsPasswordProtected(e.target.checked)
            }
            isChecked={isPasswordProtected}
          ></Switch>
        </Flex>
        {isPasswordProtected && (
          <Stack paddingTop="24px">
            <HStack>
              <Text textStyle="subhead-2">Password Hint (Optional)</Text>
              <Box position="relative">
                <Popover trigger="hover">
                  <PopoverTrigger>
                    <Icon as={MdInfo} />
                  </PopoverTrigger>
                  <PopoverContent bg="grey.600" borderRadius={'10px'}>
                    <PopoverArrow />
                    <Stack padding={'15px'} color={'grey.200'}>
                      <Image
                        maxW="100%"
                        maxH="100%"
                        src={PasswordInstruction}
                      />
                      <PopoverBody textStyle={'body-4'} fontSize={'14px'}>
                        Citizens will see this hint when they enter their
                        password to view the letter.
                      </PopoverBody>
                    </Stack>
                  </PopoverContent>
                </Popover>
              </Box>
            </HStack>
            <Text fontSize="14px" fontWeight="400">
              Do <b>NOT</b> put any password here.
            </Text>
            <Textarea
              {...register('passwordInstructions')}
              placeholder="Sample password hint: Your password is the first three letters of your first name + DOB in DD/MM/YYYY format "
            />
          </Stack>
        )}
      </Box>
    </BulkIssueCard>
  )
}
