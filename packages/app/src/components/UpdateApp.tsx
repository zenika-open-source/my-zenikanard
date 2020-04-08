import React from 'react'

import { useServiceWorker } from '../useServiceWorker'
import Notification from './Notification'

const UpdateApp = () => {
  const { isRegisterSucceed, isUpdateAvailable, update } = useServiceWorker()

  return (
    <>
      {isRegisterSucceed && (
        <Notification>"Pimp my duck" works offline!</Notification>
      )}
      {isUpdateAvailable && (
        <Notification actionLabel="Update" onActionClick={update}>
          A new version of "Pimp my duck" is available!
        </Notification>
      )}
    </>
  )
}

export default UpdateApp
