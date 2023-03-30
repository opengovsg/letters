import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import {
  BUILDER_ROUTE,
  DASHBOARD_ROUTE,
  ISSUE_MEMO_LANDING_ROUTE,
  ISSUE_MEMO_SAMPLE_CSV_ROUTE,
  ISSUE_MEMO_SINGLE_ROUTE,
  ISSUE_MEMO_SINGLE_SUCCESS_ROUTE,
  LOGIN_ROUTE,
  ROOT_ROUTE,
  VIEWER_ROUTE,
} from '~constants/routes'

import { Builder } from '~pages/builder/Builder'
import { Dashboard } from '~pages/dashboard/Dashboard'
import { IssueMemoChooseModePage } from '~pages/issue/IssueMemoChooseModePage'
import { IssueMemoSampleCsvPage } from '~pages/issue/IssueMemoSampleCsvPage'
import { IssueSingleMemoPage } from '~pages/issue/IssueSingleMemoPage'
import { IssueSingleMemoSuccessPage } from '~pages/issue/IssueSingleMemoSuccessPage'
import { LoginPage } from '~pages/login/LoginPage'
import { Viewer } from '~pages/viewer/Viewer'

import { PrivateElement } from './PrivateElement'
import { PublicElement } from './PublicElement'

export const AppRouter = (): JSX.Element => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={ROOT_ROUTE} element={<Navigate to={DASHBOARD_ROUTE} />} />

        <Route
          path={LOGIN_ROUTE}
          element={<PublicElement strict element={<LoginPage />} />}
        />

        <Route
          path={DASHBOARD_ROUTE}
          element={<PrivateElement element={<Dashboard />} />}
        />

        <Route
          path={BUILDER_ROUTE}
          element={<PrivateElement element={<Builder />} />}
        ></Route>

        <Route
          path={`${BUILDER_ROUTE}/:templateId`}
          element={<PrivateElement element={<Builder />} />}
        ></Route>

        <Route
          path={VIEWER_ROUTE}
          element={<PublicElement element={<Viewer />} />}
        />

        {/* TODO abstract routes related to issuing memos into separate router */}
        <Route
          path={ISSUE_MEMO_SINGLE_SUCCESS_ROUTE}
          element={<PrivateElement element={<IssueSingleMemoSuccessPage />} />}
        />

        <Route
          path={ISSUE_MEMO_LANDING_ROUTE}
          element={<PrivateElement element={<IssueMemoChooseModePage />} />}
        />

        <Route
          path={ISSUE_MEMO_SAMPLE_CSV_ROUTE}
          element={<PrivateElement element={<IssueMemoSampleCsvPage />} />}
        />

        <Route
          path={ISSUE_MEMO_SINGLE_ROUTE}
          element={<PrivateElement element={<IssueSingleMemoPage />} />}
        />

        {/* HERE: Issue bulk memo page */}

        <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
      </Routes>
    </Suspense>
  )
}
