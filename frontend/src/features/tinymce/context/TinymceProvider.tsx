import { Center, Spinner } from '@chakra-ui/react'
import { createContext, FC, useContext } from 'react'

import { useTinymceApiKey } from '../hooks/tinymce.hooks'

type TinymceContextProps = {
  tinymceApiKey?: string
}

const TinymceContext = createContext<TinymceContextProps | undefined>(undefined)

export const TinymceProvider: FC<React.PropsWithChildren> = ({
  children,
}): JSX.Element => {
  const { tinymceApiKey, isLoadingTinymceApiKey } = useTinymceApiKey()

  if (isLoadingTinymceApiKey) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    )
  }
  return (
    <TinymceContext.Provider value={{ tinymceApiKey }}>
      {children}
    </TinymceContext.Provider>
  )
}

/**
 * Hook for components nested in ProvideAuth component to get the current auth object.
 */
export const useTinymce = (): TinymceContextProps => {
  const context = useContext(TinymceContext)
  if (!context) {
    throw new Error(
      `useTinymce must be used within a TinymceProvider component`,
    )
  }
  return context
}
