import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

import { colours } from './foundations/colours'
import { components } from './components'
import { textStyles } from './textStyles'

export const theme = extendTheme(
  withDefaultColorScheme({ colorScheme: 'theme-orange' }),
  {
    colors: colours,
    textStyles,
    components,
  },
)
