import React, { useState, useRef } from 'react'
import cn from 'classnames'
import svgExport from 'save-svg-as-png'

import { ReactComponent as Body } from './assets/shapes/body.svg'
import { ReactComponent as Head } from './assets/shapes/head.svg'
import { ReactComponent as Floor } from './assets/shapes/floor.svg'
import { ReactComponent as Random } from './icons/random.svg'
import { ReactComponent as Trash } from './icons/trash.svg'
import { ReactComponent as Download } from './icons/download.svg'
import { ReactComponent as ByZenika } from './icons/byzenika.svg'
import { ReactComponent as Netlify } from './icons/netlify.svg'

import layersOrder from './assets/layersOrder'
import AssetButton from './components/AssetButton'
import useAssets from './useAssets'
import layers, { Asset, Layer } from './data'
import styles from './App.module.css'

function App() {
  const svgElement = useRef<SVGSVGElement>(null)
  const [selectedLayer, setSelectedLayer] = useState<Layer>(layers[0])
  const { assets, addAsset, randomize, reset } = useAssets()

  const isAssetsSelected = (currentAsset?: Asset) => {
    if (!assets) return false
    const layerId = selectedLayer.id
    if (!currentAsset) return !assets[layerId]
    return assets[layerId]?.name === currentAsset.name
  }

  const download = () =>
    svgExport.saveSvgAsPng(svgElement?.current, 'zenikanard.png')

  const renderLayerAsset = (layerId: string) => {
    if (layerId === 'body') {
      return <Body />
    } else if (layerId === 'head') {
      return <Head />
    }
    if (!assets) return undefined
    const Asset = assets[layerId]?.asset
    if (!Asset) return undefined
    return <Asset />
  }

  return (
    <div className={styles.app}>
      <Netlify className={styles.netlify} />
      <div className={styles.background} />
      <div className={styles.header}>
        <div className={styles.title}>
          My Zeni<span className={styles.titleInner}>kanard</span>
          <ByZenika className={styles.byZenika} />
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.canvas}>
          <svg
            ref={svgElement}
            width="2000"
            height="2000"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2000 2000"
          >
            <Floor />
            {layersOrder.map(renderLayerAsset)}
          </svg>
        </div>
        <div className={cn(styles.categories, styles.categoriesLeft)}>
          <div className={styles.categoriesInner}>
            {layers.map((layer, index) => {
              if (!layer.assets) return undefined
              return (
                <button
                  key={index}
                  onClick={() => setSelectedLayer(layer)}
                  className={cn({
                    [styles.selected]: layer.id === selectedLayer.id,
                  })}
                >
                  {layer.name}
                </button>
              )
            })}
          </div>
        </div>
        <div className={cn(styles.categories, styles.categoriesRight)}>
          <div className={styles.categoriesInner}>
            <AssetButton
              onClick={addAsset}
              layer={selectedLayer}
              selected={isAssetsSelected(undefined)}
            />
            {selectedLayer.assets?.map((asset, index) => (
              <AssetButton
                key={index}
                asset={asset}
                onClick={addAsset}
                layer={selectedLayer}
                selected={isAssetsSelected(asset)}
              />
            ))}
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.circle} onClick={reset}>
            <Trash height="24px" width="24px" />
          </button>
          <button className={styles.circle} onClick={randomize}>
            <Random height="24px" width="24px" />
          </button>
          <button className={styles.circle} onClick={download}>
            <Download height="24px" width="24px" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
