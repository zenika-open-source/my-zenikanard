import { useState, useEffect } from 'react'
import queryString from 'query-string'
import layers, { DEFAULT_ASSETS, SelectedAssets, Asset, Layer } from './data'

const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max))

export default () => {
  const [assets, setAssets] = useState<SelectedAssets>()

  useEffect(() => {
    const defaultAssets = queryParamsToSelectedAssets()
    setAssets(defaultAssets)
  }, [])

  const addAsset = (layer: Layer, asset: Asset | undefined) => {
    const newAssets = { ...assets, [layer.id]: asset }
    pushQueryParams(newAssets)
    setAssets(newAssets)
  }

  const randomize = () => {
    const randomAssets: SelectedAssets = {}
    layers.forEach(layer => {
      const index = getRandomInt(layer.assets.length + 1)
      if (index === layer.assets.length) {
        randomAssets[layer.id] = undefined
      } else {
        randomAssets[layer.id] = layer.assets[index]
      }
    })
    pushQueryParams(randomAssets)
    setAssets(randomAssets)
  }

  const reset = () => {
    window.history.pushState({}, '', '/')
    setAssets(DEFAULT_ASSETS)
  }

  return { assets, addAsset, randomize, reset }
}

const pushQueryParams = (assets: SelectedAssets) => {
  const queryParams = encodeURI(
    Object.entries(assets)
      .filter(([_, asset]) => asset)
      .map(([layerId, asset]) => `${layerId}=${asset?.name}`)
      .join('&')
  )
  window.history.pushState({}, '', `?${queryParams}`)
}

const queryParamsToSelectedAssets = () => {
  if (!window.location.search) return DEFAULT_ASSETS
  const params = queryString.parse(window.location.search)

  const selectedAssets: SelectedAssets = {}
  Object.entries(params).forEach(([key, value]) => {
    const layer = layers.find(l => l.id === key)
    if (!layer) return
    const asset = layer.assets.find(a => a.name === value)
    if (!asset) return
    selectedAssets[layer.id] = asset
  })
  return selectedAssets
}
