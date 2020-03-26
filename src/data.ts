import assets from './assets'

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
  name: string
  assets: Asset[]
}

export const DEFAULT_ASSETS: SelectedAssets = {
  'body-tatoo': assets.find(a => a.name === 'body-tatoo-1'),
  eye: assets.find(a => a.name === 'eye-1'),
  mouth: assets.find(a => a.name === 'mouth-1'),
  hair: assets.find(a => a.name === 'hair-1'),
}

const layers: Layer[] = [
  {
    id: 'eye',
    name: 'Eyes',
    assets: [],
  },
  {
    id: 'glasses',
    name: 'Glasses',
    assets: [],
  },
  {
    id: 'hair',
    name: 'Hair',
    assets: [],
  },
  {
    id: 'hat',
    name: 'Hats',
    assets: [],
  },
  {
    id: 'mouth',
    name: 'Mouth',
    assets: [],
  },
  {
    id: 'face',
    name: 'Faces',
    assets: [],
  },
  {
    id: 'wear',
    name: 'Wears',
    assets: [],
  },
  {
    id: 'body-tatoo',
    name: 'Body tatoo',
    assets: [],
  },
  {
    id: 'acc',
    name: 'Accessories',
    assets: [],
  },
]

const data = layers.map(layer => {
  assets.forEach(asset => {
    if (asset.name.startsWith(layer.id)) {
      layer.assets.push(asset)
    }
  })
  return layer
})

export default data
