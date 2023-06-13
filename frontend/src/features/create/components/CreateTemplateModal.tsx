import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { routes } from '~constants/routes'
import { TEMPLATE_KEYWORD_REGEX } from '~shared/constants/regex'
import {
  convertFieldsToLowerCase,
  isHtmlKeywordsInvalid,
  setHtmlKeywordsToLowerCase,
} from '~shared/util/templates'

import { useCreateTemplateMutation } from '../hooks/create.hooks'

interface CreateTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  templateContent: string
}

interface FormData {
  templateName: string
}

export const CreateTemplateModal = ({
  isOpen,
  onClose,
  templateContent,
}: CreateTemplateModalProps) => {
  const navigate = useNavigate()
  const { mutateAsync, isLoading } = useCreateTemplateMutation({
    onSuccess: () => {
      onClose()
      navigate(`/admin/${routes.admin.templates}`)
    },
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>()

  const getFields = (): string[] => {
    const fields: string[] = []
    let match: RegExpExecArray | null

    while ((match = TEMPLATE_KEYWORD_REGEX.exec(templateContent)) !== null)
      if (!fields.includes(match[1])) fields.push(match[1])

    return convertFieldsToLowerCase(fields)
  }

  const validateTemplate = (value: string) => {
    if (value.trim() === '') return 'Template name cannot be empty.'

    const invalidKeywords = isHtmlKeywordsInvalid(templateContent)

    if (invalidKeywords) {
      let errorMessage = 'The following keywords are invalid: '

      invalidKeywords.forEach((field, index) => {
        errorMessage += field
        if (index !== invalidKeywords.length - 1) errorMessage += ', '
      })
      return errorMessage
    }

    return true
  }

  function stripSpanTags(content: string) {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    const spanElements = tempDiv.querySelectorAll('span')

    if (spanElements)
      spanElements.forEach((span) => {
        if (span.parentNode) {
          const spanText = document.createTextNode(span.innerText)
          span.parentNode.replaceChild(spanText, span)
        }
      })

    return tempDiv.innerHTML
  }

  const onSubmit = async (data: FormData): Promise<void> => {
    await mutateAsync({
      name: data.templateName.trim(),
      fields: getFields(),
      html: setHtmlKeywordsToLowerCase(stripSpanTags(templateContent)),
      thumbnailS3Path: 'TODO',
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <ModalContent>
          <ModalHeader>Add Template Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired isInvalid={!!errors.templateName}>
              <Input
                {...register('templateName', {
                  required: true,
                  validate: validateTemplate,
                })}
              />
              <FormErrorMessage>
                {errors.templateName && errors.templateName.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose} border={0}>
              Cancel
            </Button>
            <Button isLoading={isLoading} type="submit">
              Save Template
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

export default CreateTemplateModal
