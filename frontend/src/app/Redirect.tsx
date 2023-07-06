// Implementation taken from https://medium.com/@maoznir/redirect-component-for-react-router-v6-c3b4821ecce
// Provides a Redirect component that handles dynamic segments in the router
// Can be used when redirecting with dynamic segments e.g. 'users/:id' to
// 'user/:id' as Navigate does not handle dynamic segments

import React from 'react'
import { Params, useParams } from 'react-router'
import { RelativeRoutingType } from 'react-router/dist/lib/context'
import { Navigate } from 'react-router-dom'

export interface RedirectProps {
  to: string
  state?: any
  relative?: RelativeRoutingType
}

const updateTo = (to: string, params: Readonly<Params<string>>) => {
  const entries = Object.entries(params) as [string, string][]
  let path = `${to}`

  entries.forEach(([key, value]) => {
    path = path.replace(`:${key}`, `${value}`)
  })

  return path
}

/**
 * Wraps the <Navigate> component and replaces "/:<paramName>" with "/<paramValue"
 */
export const Redirect: React.FC<RedirectProps> = ({ to, ...rest }) => {
  const params = useParams()
  return <Navigate to={updateTo(to, params)} {...rest} replace />
}
