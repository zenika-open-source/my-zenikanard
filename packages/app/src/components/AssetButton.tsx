import React, { FC, Suspense } from 'react'
import cn from 'classnames'
import { Layer } from '../duck'
import { getIcon } from '../assets'

import { ReactComponent as Ban } from '../icons/ban.svg'
import styles from './AssetButton.module.css'

type AssetButtonProps = {
  assetName?: string
  layer: Layer
  onClick: (layer: Layer, assetName: string | undefined) => void
  selected: boolean
}

const AssetButton: FC<AssetButtonProps> = ({
  layer,
  assetName,
  onClick,
  selected,
}) => {
  const Icon = getIcon(assetName)
  return (
    <button
      className={cn(styles.button, { [styles.selected]: selected })}
      onClick={() => onClick(layer, assetName)}
      aria-label={assetName || 'None'}
    >
      {Icon ? (
        <Suspense fallback="...">
          <Icon className={styles.icon} />
        </Suspense>
      ) : (
        <Ban className={styles.icon} style={{ color: '#b51432' }} />
      )}
    </button>
  )
}

export default AssetButton
