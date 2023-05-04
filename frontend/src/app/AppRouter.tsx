import { Box } from '@chakra-ui/react'
import { PropsWithChildren, Suspense } from 'react'
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom'

import { AppLayout } from '~/layouts/AppLayout'
import { routes } from '~constants/routes'
import { AdminAuthProvider } from '~features/auth/context/AdminProtectedContext'

import { adminRoutes, publicRoutes } from './routes'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: routes.admin.index,
        element: (
          <AdminAuthProvider>
            <Outlet />
          </AdminAuthProvider>
        ),
        children: adminRoutes,
      },
      {
        path: routes.public.index,
        children: publicRoutes,
      },
      {
        path: '*',
        element: <Navigate to={routes.admin.index} />,
      },
    ],
  },
])

const WithSuspense = ({ children }: PropsWithChildren) => (
  <Suspense fallback={<Box bg="neutral.100" minH="$100vh" w="100vw" />}>
    {children}
  </Suspense>
)

export const AppRouter = (): JSX.Element => {
  return (
    <WithSuspense>
      <RouterProvider router={router} />
    </WithSuspense>
  )
}
