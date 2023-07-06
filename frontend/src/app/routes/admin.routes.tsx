import { Navigate, Outlet, RouteObject } from 'react-router-dom'

import { routes } from '~/constants/routes'
import { AdminLayout } from '~/layouts/AdminLayout'
import { AdminProtectedRoute } from '~features/auth/context/AdminProtectedRoute'
import { LoginPage } from '~features/auth/LoginPage'
import { CreateTemplatePage } from '~features/create/CreateTemplatePage'
import { IssuedLettersPage } from '~features/dashboard/IssuedLettersPage'
import { TemplatesPage } from '~features/dashboard/TemplatesPage'
import { BulkIssueDrawer } from '~features/issue/BulkIssueDrawer'

export const adminRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={routes.admin.templates} />,
  },
  {
    path: routes.admin.login,
    element: <LoginPage />,
  },
  {
    path: routes.admin.templates,
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <TemplatesPage />,
      },
    ],
  },
  {
    path: routes.admin.create,
    element: (
      <AdminProtectedRoute>
        <Outlet />
      </AdminProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <CreateTemplatePage />,
      },
    ],
  },
  {
    path: routes.admin.letters,
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <IssuedLettersPage />,
      },
    ],
  },
  {
    path: `${routes.admin.templates}/:templateId/issue`,
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <>
            <TemplatesPage />
            <BulkIssueDrawer />
          </>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routes.admin.templates} />,
  },
]
