import 'inter-ui/inter.css'
import '@fontsource/ibm-plex-mono'

import { ThemeProvider } from '@opengovsg/design-system-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AppBanner } from '~/app/AppBanner'
import { theme } from '~/theme'

import { AppRouter } from './AppRouter'

export const queryClient = new QueryClient()

export const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme} resetCSS>
      <AppBanner />
      <AppRouter />
    </ThemeProvider>
  </QueryClientProvider>
)
