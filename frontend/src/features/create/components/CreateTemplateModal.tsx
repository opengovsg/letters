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
import {
  getHtmlFields,
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

  const onSubmit = async (data: FormData): Promise<void> => {
    const processedHtml = setHtmlKeywordsToLowerCase(
      stripSpanTags(templateContent),
    )

    await mutateAsync({
      name: data.templateName.trim(),
      fields: getHtmlFields(processedHtml),
      html: processedHtml,
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
                  validate: (value) =>
                    value.trim() === ''
                      ? 'Template name cannot be empty.'
                      : true,
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
            <Button
              isLoading={isLoading}
              type="submit"
              isDisabled={!!errors.templateName}
            >
              Save Template
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

export default CreateTemplateModal
