# E2E Testing

Our E2E test framework is [Playwright](https://playwright.dev), mainly for speed and parallel-by-default reasons.

To run E2E tests, follow these steps:

```bash
npm install
npm run e2e  # or npm run e2e-headed
```

## Writing tests

E2E tests are located in the [tests](./tests) folder.

To generate locators more easily, insert [`await page.pause()`](https://playwright.dev/docs/api/class-page#page-pause) into your test, then run `npm run e2e-headed`.

## Test artifacts

Test artifacts from Playwright, such as screenshots, videos, and traces, will be stored in the `test-results/` directory. Screenshots and videos will only be generated for failing tests.

These artifacts are also available for download on GitHub actions.
