import { UseToastOptions } from '@chakra-ui/react'
import {
  // eslint-disable-next-line no-restricted-imports
  useToast as useOgpToast,
} from '@opengovsg/design-system-react'

const DEFAULT_TOAST_OPTIONS: UseToastOptions = {
  duration: 3000,
  isClosable: true,
}

export const useToast = (props: UseToastOptions = {}) => {
  return useOgpToast({ ...DEFAULT_TOAST_OPTIONS, ...props })
}
