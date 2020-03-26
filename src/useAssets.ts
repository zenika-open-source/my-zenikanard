import { useState, useMemo, useCallback } from 'react'
import data, { DEFAULT_ASSETS, SelectedAssets, Asset, Layer } from './data'

const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max))

export default () => {
  const [assets, setAssets] = useState<SelectedAssets>(DEFAULT_ASSETS)

  const addAsset = useCallback(
    (layer: Layer, asset: Asset | undefined) => {
      setAssets({
        ...assets,
        [layer.id]: asset?.asset,
      })
    },
    [assets]
  )

  const randomize = useCallback(() => {
    const randomAssets: SelectedAssets = {}
    data.forEach(layer => {
      const index = getRandomInt(layer.assets.length + 1)
      if (index === layer.assets.length) {
        randomAssets[layer.id] = undefined
      } else {
        randomAssets[layer.id] = layer.assets[index].asset
      }
    })
    setAssets(randomAssets)
  }, [])

  const reset = useCallback(() => setAssets(DEFAULT_ASSETS), [])

  return useMemo(() => ({ assets, addAsset, randomize, reset }), [
    assets,
    addAsset,
    randomize,
    reset,
  ])
}
