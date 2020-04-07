import React, { useState, useRef, Suspense } from 'react'
import cn from 'classnames'
import svgExport from 'save-svg-as-png'
import { getAsset } from './assets'
import {
  layers,
  Layer,
  getLayerAssets,
  getCategoryLayers,
  getDefaultLayer,
} from './duck'

import { ReactComponent as Random } from './icons/random.svg'
import { ReactComponent as Trash } from './icons/trash.svg'
import { ReactComponent as Download } from './icons/download.svg'

import AssetButton from './components/AssetButton'
import useAssets from './useAssets'
import styles from './App.module.css'

function App() {
  const svgElement = useRef<SVGSVGElement>(null)
  const [selectedLayer, setSelectedLayer] = useState<Layer>(getDefaultLayer())
  const { selectedAssets, addAsset, randomize, reset } = useAssets()

  const isAssetsSelected = (assetName?: string) => {
    if (!selectedLayer) return false
    const selectedAsset = selectedAssets[selectedLayer.id]
    if (!assetName) return !selectedAsset
    return selectedAsset === assetName
  }

  const download = () => {
    svgExport.saveSvgAsPng(svgElement?.current, 'zenikanard.png')
  }

  return (
    <div className={styles.main}>
      <div className={styles.canvas}>
        <Suspense fallback={<div className={styles.loading}>Loading</div>}>
          <svg
            ref={svgElement}
            width="2000"
            height="2000"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2000 2000"
          >
            {layers.map((layer: Layer) => {
              let Asset
              if (!layer.name) {
                Asset = getAsset(layer.id)
              } else {
                Asset = getAsset(selectedAssets[layer.id])
              }
              return Asset && <Asset key={layer.id} />
            })}
          </svg>
        </Suspense>
      </div>
      <div className={cn(styles.categories, styles.categoriesLeft)}>
        <div className={styles.categoriesInner}>
          {getCategoryLayers().map((layer) => {
            if (!selectedLayer) return undefined
            return (
              <button
                key={layer.id}
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
          {getLayerAssets(selectedLayer?.id).map((assetName, index) => (
            <AssetButton
              key={index}
              assetName={assetName}
              onClick={addAsset}
              layer={selectedLayer}
              selected={isAssetsSelected(assetName)}
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
  )
}

export default App
