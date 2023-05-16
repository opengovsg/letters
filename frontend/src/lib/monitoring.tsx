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
    // TODO: connect RUM and traces after datadog tracing is set up
    // https://docs.datadoghq.com/real_user_monitoring/connect_rum_and_traces/?tab=browserrum
    // allowedTracingUrls: [
    //   'https://api.example.com',
    //   /https:\/\/.*\.my-api-domain\.com/,
    //   (url) => url.startsWith('https://api.example.com'),
    // ],
  })
  datadogRum.startSessionReplayRecording()
}
