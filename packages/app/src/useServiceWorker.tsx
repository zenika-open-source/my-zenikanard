import React, { FC, useState } from 'react'
import * as serviceWorker from './sw'

type ServiceWorkerContextProps = {
  isRegisterSucceed: boolean
  isUpdateAvailable: boolean
  update: () => void
}

const ServiceWorkerContext = React.createContext<ServiceWorkerContextProps>({
  isRegisterSucceed: false,
  isUpdateAvailable: false,
  update: () => {},
})

export const ServiceWorkerProvider: FC = ({ children }) => {
  const [
    waitingServiceWorker,
    setWaitingServiceWorker,
  ] = useState<ServiceWorker | null>(null)
  const [isRegisterSucceed, setRegisterSucceed] = useState<boolean>(false)
  const [isUpdateAvailable, setUpdateAvailable] = useState<boolean>(false)

  React.useEffect(() => {
    serviceWorker.register({
      onSuccess: () => setRegisterSucceed(true),
      onUpdate: (registration: ServiceWorkerRegistration) => {
        setWaitingServiceWorker(registration.waiting)
        setUpdateAvailable(true)
      },
      onWaiting: (waiting: ServiceWorker) => {
        setWaitingServiceWorker(waiting)
        setUpdateAvailable(true)
      },
    })
  }, [])

  React.useEffect(() => {
    // We setup an event listener to automatically reload the page
    // after the Service Worker has been updated, this will trigger
    // on all the open tabs of our application, so that we don't leave
    // any tab in an incosistent state
    if (!waitingServiceWorker) return

    waitingServiceWorker.addEventListener('statechange', (event: any) => {
      if (event.target.state === 'activated') {
        window.location.reload()
      }
    })
  }, [waitingServiceWorker])

  const value = React.useMemo(
    () => ({
      isRegisterSucceed,
      isUpdateAvailable,
      update: () => {
        if (waitingServiceWorker) {
          // We send the SKIP_WAITING message to tell the Service Worker
          // to update its cache and flush the old one
          waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' })
        }
      },
    }),
    [isRegisterSucceed, isUpdateAvailable, waitingServiceWorker]
  )

  return (
    <ServiceWorkerContext.Provider value={value}>
      {children}
    </ServiceWorkerContext.Provider>
  )
}

export const useServiceWorker = () => {
  return React.useContext(ServiceWorkerContext)
}
