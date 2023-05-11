import { Navigate, RouteObject } from 'react-router-dom'

import { PublicLayout } from '~/layouts/PublicLayout'
import { routes } from '~constants/routes'
import { ErrorPage } from '~features/public/ErrorPage'
import { LetterPublicPage } from '~features/public/LetterPublicPage'

export const publicRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={routes.public.letters} />,
  },
  {
    path: `${routes.public.letters}/:letterPublicId`,
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
  {
    path: '*',
    element: <Navigate to={routes.public.error} />, // TODO: Differentiate between invalid letters link and invalid page?
  },
]
