// adapted from https://github.com/opengovsg/calsg/blob/develop/frontend/src/features/common/landing/LandingPage.tsx
import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { BiRightArrowAlt } from 'react-icons/bi'
import { Link as RouterLink } from 'react-router-dom'

import { AppFooter } from '~/app/AppFooter'
// TODO: replace assets
import FileHandoverSvg from '~/assets/landing/OgpSuite.svg'
import EndToEndEncryptionSvg from '~/assets/landing/OgpSuite.svg'
import OgpSuiteSvg from '~/assets/landing/OgpSuite.svg'
import PersonalizedLinksSvg from '~/assets/landing/OgpSuite.svg'
import TrackSubmissionsSvg from '~/assets/landing/OgpSuite.svg'
import { routes } from '~/constants/routes'
import { useIsDesktop } from '~/hooks/useIsDesktop'

import { FeatureGridItem } from './components/FeatureGridItem'
import { LandingSection } from './components/LandingSection'
import { PublicHeader } from './components/PublicHeader'

export const LandingPage = (): JSX.Element => {
  const isDesktop = useIsDesktop()

  return (
    <Flex flexDir="column">
      <PublicHeader />
      <LandingSection>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          align="left"
          spacing={{ base: '1.5rem', md: '3.125rem' }}
        >
          <Flex flexDir="column" flex={1}>
            <Text
              textStyle={{
                base: 'responsive-display.heavy',
                md: 'responsive-display.heavy-480',
                lg: 'responsive-display.heavy-600',
              }}
              pb="2rem"
            >
              Send letters to citizens in minutes
            </Text>
            <Text>
              {`Create and send letters to citizens quickly, at zero cost and no onboarding.`}
            </Text>
            <RouterLink to={routes.admin.login}>
              <Button
                w={isDesktop ? 'unset' : 'full'}
                mt="2.5rem"
                rightIcon={<BiRightArrowAlt />}
              >
                Create your template today
              </Button>
            </RouterLink>
          </Flex>
          <Image src={FileHandoverSvg} />
        </Stack>
      </LandingSection>
      <LandingSection bg="grey.50">
        <Text
          textStyle={{
            base: 'responsive-heading.heavy',
            md: 'responsive-heading.heavy-480',
            lg: 'responsive-heading.heavy-600',
          }}
        >
          Why use Letters?
        </Text>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacingX="2.5rem"
          spacingY="4rem"
          mt="4rem"
        >
          <FeatureGridItem
            image={TrackSubmissionsSvg}
            title="Verified via GoGovSG"
            description="Letters can be easily verified by citizens as government links"
          />
          <FeatureGridItem
            image={EndToEndEncryptionSvg}
            title="Bulk creation"
            description="Send out one, two or many letters at one go!"
          />
          <FeatureGridItem
            image={PersonalizedLinksSvg}
            title="Template personalisation"
            description="Reuse the same letter templates"
          />
        </SimpleGrid>
      </LandingSection>
      <LandingSection>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          align="left"
          spacing={{ base: '1.5rem', md: '3.125rem' }}
        >
          <Flex flexDir="column" flex={1}>
            <Text
              textStyle={{
                base: 'responsive-heading.heavy',
                md: 'responsive-heading.heavy-480',
                lg: 'responsive-heading.heavy-600',
              }}
              pb="2rem"
            >
              All the government tools you need to manage your workflow
            </Text>
            <Text>
              <Text>
                <Text as="span">{`Highway is part of the `}</Text>
                <Text fontWeight="bold" as="span">
                  Open Government Products Suite
                </Text>
                <Text as="span">{`, and as a public officer you can mix and match from our set of productivity and collaboration tools.`}</Text>
              </Text>
            </Text>
            <Link href={'https://www.open.gov.sg/products/overview'} isExternal>
              <Button
                variant="link"
                mt="2.5rem"
                rightIcon={<BiRightArrowAlt />}
              >
                Full list of OGP products
              </Button>
            </Link>
          </Flex>
          <Image src={OgpSuiteSvg} />
        </Stack>
      </LandingSection>
      <AppFooter />
    </Flex>
  )
}
