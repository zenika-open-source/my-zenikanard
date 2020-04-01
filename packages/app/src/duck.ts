import assets from './assets'
import layersData from './assets/layers.json'

export type Asset = {
  name: string
  asset: React.ElementType
  icon: React.ElementType
}

export type SelectedAssets = {
  [key: string]: Asset | undefined
}

export type Layer = {
  id: string
  name?: string
  categoryOrder?: number
}

export const getAsset = (name: string) => {
  return assets.find((a: Asset) => a.name === name)
}

export const DEFAULT_ASSETS: SelectedAssets = {
  'body-tatoo': getAsset('body-tatoo-1'),
  eye: getAsset('eye-1'),
  mouth: getAsset('mouth-1'),
  hair: getAsset('hair-1'),
}

export const getCategoryLayers = () => {
  return layers
    .filter(layer => !!layer.name && !!layer.categoryOrder)
    .sort((a, b) => {
      if (!a.categoryOrder) return -1
      if (!b.categoryOrder) return 1
      return a.categoryOrder - b.categoryOrder
    })
}

export const getDefaultLayer = () => {
  return getCategoryLayers()[0]
}

export const getLayerAssets = (layerId: string) => {
  const layerAssets: Asset[] = []
  assets.forEach((asset: Asset) => {
    if (asset.name.startsWith(layerId)) {
      layerAssets.push(asset)
    }
  })
  return layerAssets
}

export const layers = layersData as Layer[]
