import { ResponsiveValue } from '@chakra-ui/react'
import {
  RestrictedFooter,
  RestrictedFooterContainerProps,
} from '@opengovsg/design-system-react'

import { APP_NAME } from '~/constants/config'
import {
  CONTACT_US,
  PRIVACY,
  REPORT_VULNERABILITY,
  TERMS_OF_USE,
  USER_GUIDE,
} from '~shared/constants/links'

const FOOTER_LINKS = [
  {
    label: 'Contact Us',
    href: CONTACT_US,
  },
  {
    label: 'Guide',
    href: USER_GUIDE,
  },
  {
    label: 'Privacy',
    href: PRIVACY,
  },
  {
    label: 'Terms of Use',
    href: TERMS_OF_USE,
  },
  {
    label: 'Report Vulnerability',
    href: REPORT_VULNERABILITY,
  },
]

// TODO: Extend from RestrictedFooterProps instead when they are exported by the package in the future.
interface AppFooterProps {
  variant?: ResponsiveValue<'full' | 'compact'>
  colorMode?: 'light' | 'dark'
  containerProps?: Partial<RestrictedFooterContainerProps>
}

export const AppFooter = ({
  variant,
  colorMode,
  containerProps,
}: AppFooterProps): JSX.Element => {
  return (
    <RestrictedFooter
      appLink={window.location.origin}
      appName={APP_NAME}
      footerLinks={FOOTER_LINKS}
      variant={variant}
      colorMode={colorMode ?? 'dark'}
      containerProps={containerProps}
    />
  )
}
