import { datadogRum } from '@datadog/browser-rum'

export function initDatadog() {
  datadogRum.init({
    applicationId: 'fccfa971-0a5c-4c78-b340-344b104c8b9b',
    clientToken: 'pub5e264a96230b8d2f4ee90bfe8a481f4e',
    site: 'datadoghq.com',
    service: 'letters',
    env: process.env.NODE_ENV,
    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
    allowedTracingUrls: [
      'https://letters-stg.beta.gov.sg', // TODO: remove after migrating out of beta.gov.sg
      'https://letters.beta.gov.sg', // TODO: remove after migrating out of beta.gov.sg
      'https://staging.letters.gov.sg',
      'https://letters.gov.sg',
    ],
  })
  datadogRum.startSessionReplayRecording()
}
