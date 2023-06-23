import { RouteObject } from 'react-router-dom'

import { PublicLayout } from '~/layouts/PublicLayout'
import { routes } from '~constants/routes'
import { LandingPage } from '~features/landing/LandingPage'
import { ErrorPage } from '~features/public/ErrorPage'
import { LetterPublicPage } from '~features/public/LetterPublicPage'

import { Redirect } from '../Redirect'

export const publicRoutes: RouteObject[] = [
  {
    index: true,
    element: <LandingPage />,
  },
  {
    path: `letters/:letterPublicId`,
    element: <Redirect to="/:letterPublicId" />,
  },
  {
    path: `:letterPublicId`,
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <LetterPublicPage />,
      },
    ],
  },
  {
    path: routes.public.error,
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <ErrorPage />,
      },
    ],
  },
]
