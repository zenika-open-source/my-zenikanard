import assets from './assets-generated'

export type Asset = {
  name: string
  asset: React.ElementType
  icon: React.ElementType
}

export type SelectedAssets = {
  [key: string]: Asset | undefined
}

export type Category = {
  id: string
  name: string
  assets: Asset[]
}

export const getAsset = (name: string) => {
  return assets.find((a: Asset) => a.name === name)?.asset
}

export const DEFAULT_ASSETS: SelectedAssets = {
  'body-tatoo': assets.find((a: Asset) => a.name === 'body-tatoo-1'),
  eye: assets.find((a: Asset) => a.name === 'eye-1'),
  mouth: assets.find((a: Asset) => a.name === 'mouth-1'),
  hair: assets.find((a: Asset) => a.name === 'hair-1'),
}

const emptyCategories: Category[] = [
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

export const categories = emptyCategories.map(category => {
  assets.forEach((asset: Asset) => {
    if (asset.name.startsWith(category.id)) {
      category.assets.push(asset)
    }
  })
  return category
})


