import React from 'react'
import ReactDOM from 'react-dom'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'

import App from './App'
import * as serviceWorker from './serviceWorker'

// Init calendar plugin
dayjs.extend(calendar)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
