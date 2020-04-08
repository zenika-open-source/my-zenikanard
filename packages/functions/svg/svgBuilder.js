const fs = require('fs')

const layers = require('./assets/layers.json')

function build(params) {
  let svg = ''
  layers.forEach((layer) => {
    // body and head layers
    if (layer.id === 'body' || layer.id === 'head') {
      const asset = fs.readFileSync(`./assets/shapes/${layer.id}.svg`, 'utf8')
      svg += asset
    }
    // user layers
    if (params) {
      const path = `./assets/shapes/${params[layer.id]}.svg`
      if (fs.existsSync(path)) {
        const asset = fs.readFileSync(path, 'utf8')
        svg += asset
      }
    }
  })

  return `<?xml version="1.0" standalone="yes"?>
<svg viewBox="0 0 2000 2000" width="2000" height="2000" xmlns="http://www.w3.org/2000/svg">
${svg}
</svg>`
}

module.exports = { build }
