import wretch from 'wretch'

import { UNAUTHORIZED_EVENT } from '~constants/events'

/**
 * Default API client pointing to backend.
 * Automatically catches 403 errors and invalidates authentication state.
 */
export const api = wretch('/api/v1')
  .catcher(403, (err) => {
    window.dispatchEvent(new Event(UNAUTHORIZED_EVENT))
    throw err
  })
  .errorType('json')

//Leaving this here since our endpoints are currently not prefixed with 'api/v1/'
export const unversionedApi = wretch('').catcher(403, (err) => {
  window.dispatchEvent(new Event(UNAUTHORIZED_EVENT))
  throw err
})
