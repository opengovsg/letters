import { Navigate, RouteObject } from 'react-router-dom'

import { PublicLayout } from '~/layouts/PublicLayout'
import { routes } from '~constants/routes'
import { WelcomePage } from '~features/public/WelcomePage'

export const userRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={routes.public.letters} />,
  },
  {
    path: routes.public.letters,
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routes.public.letters} />,
  },
]
