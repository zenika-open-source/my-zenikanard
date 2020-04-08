import React from 'react'

import { useServiceWorker } from '../useServiceWorker'

const UpdateApp = () => {
  const { isRegisterSucceed, isUpdateAvailable, update } = useServiceWorker()

  return (
    <>
      {isRegisterSucceed && (
        <div>
          "Pimp my duck" works offline!
        </div>
      )}
      {isUpdateAvailable && (
        <div>
          A new version of "Pimp my duck" is available!
          <button type="button" onClick={update}>
            Update now
          </button>
        </div>
      )}
    </>
  )
}

export default UpdateApp
