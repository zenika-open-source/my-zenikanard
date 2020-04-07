import { assetNames } from './assets'
import layersData from './assets/layers.json'

export type SelectedAssets = {
  [key: string]: string | undefined
}

export type Layer = {
  id: string
  name?: string
  categoryOrder?: number
}

export const DEFAULT_ASSETS: SelectedAssets = {
  'body-tatoo': 'body-tatoo-1',
  eye: 'eye-1',
  mouth: 'mouth-1',
  hair: 'hair-1',
}

export const getCategoryLayers = () => {
  return layers
    .filter((layer) => !!layer.name)
    .sort((a, b) => {
      return (a?.categoryOrder ?? 0) - (b?.categoryOrder ?? 0)
    })
}

export const getDefaultLayer = () => {
  return getCategoryLayers()[0]
}

export const getLayerAssets = (layerId: string) => {
  const layerAssets: string[] = []
  assetNames.forEach((name) => {
    if (name.startsWith(layerId)) {
      layerAssets.push(name)
    }
  })
  return layerAssets
}

export const layers = layersData as Layer[]
