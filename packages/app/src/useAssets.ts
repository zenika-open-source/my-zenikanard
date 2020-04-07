import { useState, useEffect } from 'react'
import queryString from 'query-string'
import { DEFAULT_ASSETS, SelectedAssets, getLayerAssets, Layer, getCategoryLayers } from './duck'

const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max))

export default () => {
  const [selectedAssets, setSelectedAssets] = useState<SelectedAssets>(DEFAULT_ASSETS)

  useEffect(() => {
    const defaultAssets = queryParamsToSelectedAssets()
    setSelectedAssets(defaultAssets)
  }, [])

  const addAsset = (layer: Layer, asset: string | undefined) => {
    const newAssets = { ...selectedAssets, [layer.id]: asset }
    pushQueryParams(newAssets)
    setSelectedAssets(newAssets)
  }

  const randomize = () => {
    const randomAssets: SelectedAssets = {}
    getCategoryLayers().forEach(layer => {
      const assets = getLayerAssets(layer.id)
      const index = getRandomInt(assets.length + 1)
      if (index === assets.length) {
        randomAssets[layer.id] = undefined
      } else {
        randomAssets[layer.id] = assets[index]
      }
    })
    pushQueryParams(randomAssets)
    setSelectedAssets(randomAssets)
  }

  const reset = () => {
    window.history.pushState({}, '', '/')
    setSelectedAssets(DEFAULT_ASSETS)
  }

  return { selectedAssets, addAsset, randomize, reset }
}

const pushQueryParams = (assets: SelectedAssets) => {
  const queryParams = encodeURI(
    Object.entries(assets)
      .filter(([_, asset]) => asset)
      .map(([layerId, asset]) => `${layerId}=${asset}`)
      .join('&')
  )
  window.history.pushState({}, '', `?${queryParams}`)
}

const queryParamsToSelectedAssets = () => {
  if (!window.location.search) return DEFAULT_ASSETS
  const params = queryString.parse(window.location.search)

  const selectedAssets: SelectedAssets = {}
  Object.entries(params).forEach(([key, value]) => {
    if (!value) return
    selectedAssets[key] = String(value)
  })
  return selectedAssets
}
