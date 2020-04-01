import { useState, useEffect } from 'react'
import queryString from 'query-string'
import { categories, DEFAULT_ASSETS, SelectedAssets, Category, Asset } from '@pimpmyduck/assets/dist/assets'

const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max))

export default () => {
  const [assets, setAssets] = useState<SelectedAssets>()

  useEffect(() => {
    const defaultAssets = queryParamsToSelectedAssets()
    setAssets(defaultAssets)
  }, [])

  const addAsset = (category: Category, asset: Asset | undefined) => {
    const newAssets = { ...assets, [category.id]: asset }
    pushQueryParams(newAssets)
    setAssets(newAssets)
  }

  const randomize = () => {
    const randomAssets: SelectedAssets = {}
    categories.forEach(category => {
      const index = getRandomInt(category.assets.length + 1)
      if (index === category.assets.length) {
        randomAssets[category.id] = undefined
      } else {
        randomAssets[category.id] = category.assets[index]
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
    const category = categories.find(c => c.id === key)
    if (!category) return
    const asset = category.assets.find(a => a.name === value)
    if (!asset) return
    selectedAssets[category.id] = asset
  })
  return selectedAssets
}
