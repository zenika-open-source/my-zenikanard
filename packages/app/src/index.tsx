import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import { ServiceWorkerProvider } from './useServiceWorker'
import * as serviceWorker from './sw'
import App from './App'

import 'pwacompat'

serviceWorker.unregisterOnUncatchError()

ReactDOM.render(
  <ServiceWorkerProvider>
    <App />
  </ServiceWorkerProvider>,
  document.getElementById('root')
)
