import {ReactComponent as Bodytatoo1} from './assets/shapes/body-tatoo-1.svg';
import {ReactComponent as Eye1} from './assets/shapes/eye-1.svg';
import {ReactComponent as Mouth1} from './assets/shapes/mouth-1.svg';
import {ReactComponent as Hair1} from './assets/shapes/hair-1.svg';

import assets from './assets'

export type Asset = {
  name: string,
  asset: React.ElementType,
  icon: React.ElementType,
}

export type SelectedAssets = {
  [key: string]: React.ElementType | undefined;
}

export type Category = {
  name: string,
  layer: string,
  assets: Asset[],
}

export const DEFAULT_ASSETS: SelectedAssets = {
  'body-tatoo': Bodytatoo1,
  'eye': Eye1,
  'mouth': Mouth1,
  'hair': Hair1,
}

const categories: Category[] = [
  {
    name: "Eyes",
    layer: "eye", 
    assets: []
  },{
    name: "Glasses",
    layer: "glasses", 
    assets: []
  },{
    name: "Hair",
    layer: "hair", 
    assets: []
  },
  {
    name: "Hats",
    layer: "hat", 
    assets: []
  },{
    name: "Mouth",
    layer: "mouth", 
    assets: []
  },{
    name: "Faces",
    layer: "face", 
    assets: []
  },{
    name: "Wears",
    layer: "wear", 
    assets: []
  },{
    name: "Body tatoo",
    layer: "body-tatoo", 
    assets: []
  },{
    name: "Accessories",
    layer: "acc", 
    assets: []
  }];

export default () => {
  return categories.map(category => {
    assets.forEach(asset => {
      if (asset.name.startsWith(category.layer)) {
        category.assets.push(asset)
      }
    })
    return category;
  })
}
