import { ReactElement, useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Input,
  Select,
  Spacer,
  Textarea,
} from '@chakra-ui/react'
import { ArrowBack } from '@styled-icons/boxicons-regular'
import { render } from 'mustache'

import { textStyles } from '~theme/textStyles'
import { DASHBOARD_ROUTE } from '~constants/routes'
import { useTemplate } from '~hooks/useTemplate'
import Spinner from '~components/Spinner'

import { ReadonlyEditor } from '~pages/viewer/components/ReadonlyEditor'
import { CreateMemo, createMemo } from '~features/memos/MemosService'

import { UIN_TOKEN, UIN_TYPE_TOKEN } from './constants'

export const IssueSingleMemoPage = (): ReactElement => {
  const { templateId } = useParams()
  const { isLoading, isError, data: template } = useTemplate(Number(templateId))

  const [uin, setUin] = useState<string>('')
  const [uinType, setUinType] = useState<string>('') // TODO: restrict type
  const [params, setParams] = useState<Record<string, string>>({})
  const formRef = useRef<HTMLFormElement>(null)

  const navigate = useNavigate()
  const mutation = useMutation((data: CreateMemo) => createMemo(data))
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const [previewParams, setPreviewParams] = useState<typeof params>({})

  const handleParamsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setParams({
      ...params,
      [name]: value,
    })
  }

  const handleSubmit = async () => {
    // Basic validation
    const form = formRef.current
    if (!form) return
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    // TODO: handle errors
    if (!template) return

    setIsSubmitting(true)
    const { slug } = await mutation.mutateAsync({
      templateId: template.id,
      versionId: template.version,
      uin,
      uinType,
      params,
    })
    navigate(`/issue/single/success?slug=${slug}`)
  }

  useEffect(() => {
    const paramsFromTemplate = template?.paramsRequired || []
    setParams(Object.fromEntries(paramsFromTemplate.map((p) => [p, ''])))
  }, [template])

  useEffect(() => {
    const paramsWithDefault: Record<string, string> = {
      ...params,
      [UIN_TOKEN]: uin,
      [UIN_TYPE_TOKEN]: uinType,
    }
    for (const key in paramsWithDefault) {
      if (!paramsWithDefault[key]) {
        paramsWithDefault[key] = `{{ ${key} }}`
      }
    }
    setPreviewParams(paramsWithDefault)
  }, [params, uin, uinType])

  return (
    <Flex
      flexDir="column"
      height="100vh"
      overflow="hidden"
      pos="relative"
      color="gray.600"
    >
      {isLoading && <Spinner />}
      {isError && <p>error</p>}
      {template && (
        <>
          {/* Header */}
          <Box p="4" borderBottom="1px solid" borderColor="gray.200">
            <Flex alignItems="center">
              <Link to={DASHBOARD_ROUTE}>
                <Icon as={ArrowBack} />
              </Link>
              <Heading as="h1" {...textStyles.h4} ml="4">
                {template.name}
              </Heading>
              <Spacer />
              <Button onClick={handleSubmit} isLoading={isSubmitting}>
                Issue Memo
              </Button>
            </Flex>
          </Box>

          {/* Body */}
          <Grid
            templateColumns="repeat(4, 1fr)"
            width="100%"
            height="calc(100% - 77px)" // TODO fix this
          >
            {/* Sidebar */}
            <GridItem
              borderRight="1px solid"
              borderColor="gray.200"
              overflowY="scroll"
              colSpan={{ base: 4, lg: 1 }}
            >
              <Box
                w="100%"
                borderBottom="1px solid"
                borderColor="gray.200"
                p="4"
              >
                <Heading as="h2" {...textStyles['subhead-2']}>
                  FIELDS REQUIRED
                </Heading>
              </Box>

              <form ref={formRef}>
                <Box
                  w="100%"
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  p="4"
                >
                  <Heading {...textStyles['subhead-2']} mb="2">
                    {UIN_TOKEN}
                  </Heading>
                  <Input
                    value={uin}
                    onChange={(e) => setUin(e.target.value)}
                    placeholder="Enter a NRIC, FIN or Passport Number"
                    required
                    disabled={isSubmitting}
                  />
                </Box>

                <Box
                  w="100%"
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  p="4"
                >
                  <Heading {...textStyles['subhead-2']} mb="2">
                    {UIN_TYPE_TOKEN}
                  </Heading>
                  <Select
                    placeholder="Choose a UIN type"
                    value={uinType}
                    onChange={(e) => setUinType(e.target.value)}
                    required
                    disabled={isSubmitting}
                  >
                    <option value="NRIC">NRIC</option>
                    <option value="FIN">FIN</option>
                    <option value="Passport number">Passport number</option>
                  </Select>
                </Box>

                {/* Params */}
                {Object.keys(params).map((key) => (
                  <Box
                    w="100%"
                    borderBottom="1px solid"
                    borderColor="gray.200"
                    p="4"
                    key={key}
                  >
                    <Heading {...textStyles['subhead-2']} mb="2">
                      {key}
                    </Heading>
                    <Textarea
                      name={key}
                      value={params[key]}
                      onChange={handleParamsChange}
                      required
                      disabled={isSubmitting}
                      resize="vertical"
                      rows={1}
                    />
                  </Box>
                ))}
              </form>
            </GridItem>

            {/* Content */}
            <GridItem colSpan={{ base: 4, lg: 3 }} overflowY="scroll">
              <Box w="100%" maxW="48em" margin="0 auto" p="8" shadow="md">
                <ReadonlyEditor
                  value={render(template.body[0].data, previewParams)}
                />
              </Box>
            </GridItem>
          </Grid>
        </>
      )}
    </Flex>
  )
}
