// eslint-disable-next-line import/no-unresolved
import http from 'k6/http'
// eslint-disable-next-line import/no-unresolved
import { sleep } from 'k6'

/**
 * This script performs a load test on our servers for roughly 1 minute
 * and displays some relevant performance metrics from the test.
 *
 * Setup:
 * Ensure that `k6` is installed on your local machine, using e.g. `brew install k6` on MacOS.
 * (Note that there is no npm package for k6, as the module is not written in JavaScript.).
 *
 * Instructions:
 * Configure `NUM_VUS` and `URL` accordingly for the load test.
 * The QPS on the given URL will be roughly equal to (but a little smaller than) `NUM_VUS`.
 * Run this script using `k6 run load-test.js`.
 */
// k6 run --env MY_CONFIG_FILE=uat.json view-letter.js
const NUM_VUS = 100
let myOptions = JSON.parse(open(__ENV.MY_CONFIG_FILE))
console.log(myOptions)
export const options = {
    stages: [
        { duration: '30s', target: 200 },
        { duration: '1m30s', target: 200 },
        { duration: '20s', target: 0 },
    ],
}

export default function vu() {
    const res = http.get(myOptions.url + myOptions.publicLetterId, { headers: { "Cookie": myOptions.cookie, "Cache-Control": "no-cache, no-store, must-revalidate" } })
    console.log(res.body)
    console.log(res.error)
    sleep(1)
}
