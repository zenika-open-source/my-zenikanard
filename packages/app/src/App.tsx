import React, { useState, useRef } from 'react'
import cn from 'classnames'
import svgExport from 'save-svg-as-png'
import { layers, getAsset, categories, Asset, Category, Layer } from './categories'

import { ReactComponent as Random } from './icons/random.svg'
import { ReactComponent as Trash } from './icons/trash.svg'
import { ReactComponent as Download } from './icons/download.svg'
import { ReactComponent as ByZenika } from './icons/byzenika.svg'
import { ReactComponent as Netlify } from './icons/netlify.svg'

import AssetButton from './components/AssetButton'
import useAssets from './useAssets'
import styles from './App.module.css'

const Body = getAsset('body')
const Head = getAsset('head')
const Floor = getAsset('floor')

function App() {
  const svgElement = useRef<SVGSVGElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0]
  )
  const { assets, addAsset, randomize, reset } = useAssets()

  const isAssetsSelected = (currentAsset?: Asset) => {
    if (!assets) return false
    const id = selectedCategory.id
    if (!currentAsset) return !assets[id]
    return assets[id]?.name === currentAsset.name
  }

  const download = () =>
    svgExport.saveSvgAsPng(svgElement?.current, 'zenikanard.png')

  const renderLayerAsset = (layer: Layer) => {
    if (layer.id === 'body') {
      return Body ? <Body key={layer.id} /> : undefined
    } else if (layer.id === 'head') {
      return Head ? <Head key={layer.id} /> : undefined
    }
    if (!assets) return undefined
    const Asset = assets[layer.id]?.asset
    if (!Asset) return undefined
    return <Asset key={layer.id} />
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
            {Floor && <Floor />}
            {layers.map(renderLayerAsset)}
          </svg>
        </div>
        <div className={cn(styles.categories, styles.categoriesLeft)}>
          <div className={styles.categoriesInner}>
            {categories.map((category, index) => {
              if (!category.assets) return undefined
              return (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={cn({
                    [styles.selected]: category.id === selectedCategory.id,
                  })}
                >
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>
        <div className={cn(styles.categories, styles.categoriesRight)}>
          <div className={styles.categoriesInner}>
            <AssetButton
              onClick={addAsset}
              category={selectedCategory}
              selected={isAssetsSelected(undefined)}
            />
            {selectedCategory.assets?.map((asset, index) => (
              <AssetButton
                key={index}
                asset={asset}
                onClick={addAsset}
                category={selectedCategory}
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
