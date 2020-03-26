import { ReactComponent as Bodytatoo1 } from './assets/shapes/body-tatoo-1.svg'
import { ReactComponent as Eye1 } from './assets/shapes/eye-1.svg'
import { ReactComponent as Mouth1 } from './assets/shapes/mouth-1.svg'
import { ReactComponent as Hair1 } from './assets/shapes/hair-1.svg'

import assets from './assets'

export type Asset = {
  name: string
  asset: React.ElementType
  icon: React.ElementType
}

export type SelectedAssets = {
  [key: string]: React.ElementType | undefined
}

export type Layer = {
  id: string
  name: string
  assets: Asset[]
}

export const DEFAULT_ASSETS: SelectedAssets = {
  'body-tatoo': Bodytatoo1,
  eye: Eye1,
  mouth: Mouth1,
  hair: Hair1,
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
