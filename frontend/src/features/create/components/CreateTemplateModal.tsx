import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { routes } from '~constants/routes'

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
  const { mutateAsync, isLoading } = useCreateTemplateMutation()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>()

  const getFields = (): string[] => {
    const fields = []
    const regex = /\{\{([^{}]+)\}\}/g
    let match
    while ((match = regex.exec(templateContent)) !== null) {
      fields.push(match[1])
    }
    return fields
  }

  const validateName = (value: string) => {
    return value.trim() !== ''
  }

  const onSubmit = async (data: FormData): Promise<void> => {
    await mutateAsync({
      name: data.templateName.trim(),
      fields: getFields(),
      html: templateContent,
      thumbnailS3Path: 'TODO',
    })
    onClose()
    navigate(`/admin/${routes.admin.templates}`)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <ModalContent>
          <ModalHeader>Add Template Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <Input
                {...register('templateName', {
                  required: true,
                  validate: validateName,
                })}
              />
              {errors.templateName && (
                <Text color="red">This field is required.</Text>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose} border={0}>
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              color="#005DEA"
              textColor="white"
              type="submit"
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
