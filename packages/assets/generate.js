const path = require('path')
const fs = require('fs')
const {capitalize, camelCase} = require('lodash');

const assetsFile = path.join(__dirname, 'src/index.js')
const shapePath = path.join(__dirname, 'src/shapes')
const shapeFiles = fs.readdirSync(shapePath)

const componentsPath = path.join(__dirname, 'src/components')
if (!fs.existsSync(componentsPath)) {
  fs.mkdirSync(componentsPath)
}

function componentTemplate(filepath) {
  return `export { ReactComponent as default } from '${filepath}'`
}

function importTemplate(componentName, filepath) {
  return `const ${componentName} = React.lazy(() => import('${filepath}'))`
}

function getterTemplate(componentName, name) {
  return `if (name === '${name}') return ${componentName}`
}

let names = []
let importAssets = []
let getterAssets = []
let importIcons = []
let getterIcons = []
shapeFiles.forEach((file) => {
  if (file.endsWith('.svg')) {
    const [name] = file.split('.')
    names.push(`'${name}'`)
  
    const componentName = capitalize(camelCase(name))
    const componentPath = path.join(__dirname, `src/components/${componentName}.js`)
    fs.writeFileSync(componentPath, componentTemplate(`../shapes/${name}.svg`), 'utf8')
    importAssets.push(importTemplate(componentName, `./components/${componentName}.js`))
    getterAssets.push(getterTemplate(componentName, name)) 
  
    const iconComponentName = `${componentName}Icon`
    const iconComponentPath = path.join(__dirname, `src/components/${iconComponentName}.js`)
    fs.writeFileSync(iconComponentPath, componentTemplate(`../icons/${name}.svg`), 'utf8')
    importIcons.push(importTemplate(iconComponentName, `./components/${iconComponentName}.js`))
    getterIcons.push(getterTemplate(iconComponentName, name)) 
  }
})

const generatedContent = `
import React from 'react'

${importAssets.join('\n')}

${importIcons.join('\n')}

export const getAsset = (name) => {
${getterAssets.join('\n')}
}

export const getIcon = (name) => {
${getterIcons.join('\n')}
}

export const assetNames = [${names.join(',')}]
`

fs.writeFileSync(assetsFile, generatedContent, 'utf8')
