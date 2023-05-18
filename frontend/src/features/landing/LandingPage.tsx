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

import { AppFooter } from '~/app/AppFooter'
import ELettersSvg from '~/assets/ELetters.svg'
import CostSavingsSvg from '~/assets/landing/CostSavings.svg'
import LegitmacySvg from '~/assets/landing/Legitimacy.svg'
import OgpSuiteSvg from '~/assets/landing/OgpSuite.svg'
import SaveTimeSvg from '~/assets/landing/SaveTime.svg'
import { useIsDesktop } from '~/hooks/useIsDesktop'
import { BETA_SIGNUP } from '~shared/constants/links'

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
          spacing={{ base: '1.5rem', md: '3.125rem', lg: '4.125rem' }}
        >
          <Flex flexDir="column" flex={1}>
            <Text
              textStyle={{
                base: 'responsive-display.heavy',
                md: 'responsive-display.heavy-480',
                lg: 'responsive-display.heavy-480',
              }}
              pt="2rem"
              pb="2rem"
            >
              Trusted e-letters from the Singapore Government
            </Text>
            <Text>
              {`An a e-letter platform for Singapore Government agencies to easily create, issue and track the issuance of letters. Also enables citizens to easily receive Government issued letters.`}
            </Text>
            <Link href={BETA_SIGNUP} isExternal>
              <Button
                w={isDesktop ? 'unset' : 'full'}
                mt="2.5rem"
                rightIcon={<BiRightArrowAlt />}
              >
                Sign up for our beta
              </Button>
            </Link>
          </Flex>
          <Image src={ELettersSvg} />
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
            image={LegitmacySvg}
            title="Ensures legitimacy"
            description="E-letters are designed to be authentic and only be accessible on a .gov.sg link."
          />
          <FeatureGridItem
            image={SaveTimeSvg}
            title="Helps you save time"
            description="Reusable templates enable you to generate and send thousands of letters in one go. "
          />
          <FeatureGridItem
            image={CostSavingsSvg}
            title="Enables cost-savings"
            description="Cut down on printing and postage expenses by switching from paper letters to e-letters."
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
