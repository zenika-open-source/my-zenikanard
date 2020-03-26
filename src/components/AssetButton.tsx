import React, {FC} from 'react';
import cn from 'classnames';

import {ReactComponent as Ban} from '../icons/ban.svg';
import styles from './AssetButton.module.css';
import { Asset, Layer } from '../data';

type AssetButtonProps = {
  asset?: Asset;
  layer: Layer,
  onClick: (layer: Layer, asset: Asset | undefined) => void;
  selected: boolean;
}

const AssetButton: FC<AssetButtonProps> = ({layer, asset, onClick, selected }) => {
  const Icon = asset?.icon;
  return (
    <button
      className={cn(styles.button, {[styles.selected]: selected})}
      onClick={() => onClick(layer, asset)}
    >
        {Icon 
          ? <Icon className={styles.icon} />
          : <Ban className={styles.icon} style={{color: "#b51432"}} />
        }
    </button>
  )
}

export default AssetButton;
