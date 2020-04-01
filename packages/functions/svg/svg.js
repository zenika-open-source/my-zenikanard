const fs = require('fs')

const layersJSON = fs.readFileSync("./assets/layers.json");
const layers = JSON.parse(layersJSON);

exports.handler = async (event) => {
  const params = event.queryStringParameters

  let zenikanard = ''
  layers.forEach(layer => {
    if (layer.id === 'body') {
      const asset = fs.readFileSync(`./assets/shapes/body.svg`, 'utf8')
      zenikanard += asset
    } else if (layer.id === 'head') {
      const asset = fs.readFileSync(`./assets/shapes/head.svg`, 'utf8')
      zenikanard += asset
    } else if (params[layer.id]) {
      const asset = fs.readFileSync(
        `./assets/shapes/${params[layer.id]}.svg`,
        'utf8'
      )
      zenikanard += asset
    }
  })

  const svg = `<?xml version="1.0" standalone="yes"?>
  <svg viewBox="0 0 2000 2000" width="2000" height="2000" xmlns="http://www.w3.org/2000/svg">
  ${zenikanard}
  </svg>`

  return {
    statusCode: 200,
    headers: {
      'Content-disposition': 'attachment; filename=zenikanard.svg',
      'Content-Type': 'image/svg+xml',
    },
    body: svg,
  }
}
