const fs = require('fs')
const layersOrder = require('./layersOrder')

exports.handler = async (event, context) => {
  const { query } = event.queryStringParameters
  let zenikanard = ''
  layersOrder.forEach(layer => {
    if (layer === 'body') {
      const asset = fs.readFileSync(`./shapes/body.svg`, 'utf8')
      zenikanard += asset
    } else if (layer === 'head') {
      const asset = fs.readFileSync(`./shapes/head.svg`, 'utf8')
      zenikanard += asset
    } else if (query[layer]) {
      const asset = fs.readFileSync(
        `./shapes/${query[layer]}.svg`,
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
