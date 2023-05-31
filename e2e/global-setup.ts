import { execSync } from 'child_process'

async function globalSetup(): Promise<void> {
  // Run all migrations on CI before running E2E tests
  if (process.env.CI) {
    execSync('../wait-for-it.sh localhost:5432 -t 0 && npm run --prefix ../backend migration:run')
  }
}

export default globalSetup
