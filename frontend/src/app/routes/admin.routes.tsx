import { Navigate, RouteObject } from 'react-router-dom'

import { routes } from '~/constants/routes'
import { AdminLayout } from '~/layouts/AdminLayout'
import { AdminProtectedRoute } from '~features/auth/context/AdminProtectedRoute'
import { LoginPage } from '~features/auth/LoginPage'
import { DashboardPage } from '~features/dashboard/DashboardPage'
import { BulkIssuePage } from '~features/templates/BulkIssuePage'

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
        element: <DashboardPage />,
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
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: `${routes.admin.templates}/:templateId/issue`,
    element: (
      <AdminProtectedRoute>
        <BulkIssuePage />
      </AdminProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to={routes.admin.templates} />,
  },
]
