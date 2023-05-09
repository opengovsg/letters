import { Navigate, RouteObject } from 'react-router-dom'

import { PublicLayout } from '~/layouts/PublicLayout'
import { routes } from '~constants/routes'
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
    path: '*',
    element: <Navigate to={routes.index} />, // TODO: add 404 page
  },
]
