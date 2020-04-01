import React, {FC} from 'react';
import cn from 'classnames';
import { Asset, Category } from '../categories';

import {ReactComponent as Ban} from '../icons/ban.svg';
import styles from './AssetButton.module.css';

type AssetButtonProps = {
  asset?: Asset;
  category: Category,
  onClick: (category: Category, asset: Asset | undefined) => void;
  selected: boolean;
}

const AssetButton: FC<AssetButtonProps> = ({category, asset, onClick, selected }) => {
  const Icon = asset?.icon;
  return (
    <button
      className={cn(styles.button, {[styles.selected]: selected})}
      onClick={() => onClick(category, asset)}
    >
        {Icon 
          ? <Icon className={styles.icon} />
          : <Ban className={styles.icon} style={{color: "#b51432"}} />
        }
    </button>
  )
}

export default AssetButton;
