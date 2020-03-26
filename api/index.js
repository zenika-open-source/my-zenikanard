const fs = require('fs')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const layersOrder = require('../src/assets/layersOrder')

app.get('/', function(req, res) {
  const { query } = req
  let zenikanard = ''
  layersOrder.forEach(layer => {
    if (layer === 'body') {
      const asset = fs.readFileSync(`../src/assets/shapes/body.svg`, 'utf8')
      zenikanard += asset
    } else if (layer === 'head') {
      const asset = fs.readFileSync(`../src/assets/shapes/head.svg`, 'utf8')
      zenikanard += asset
    } else if (query[layer]) {
      const asset = fs.readFileSync(
        `../src/assets/shapes/${query[layer]}.svg`,
        'utf8'
      )
      zenikanard += asset
    }
  })

  const svg = `<?xml version="1.0" standalone="yes"?>
  <svg viewBox="0 0 2000 2000" width="2000" height="2000" xmlns="http://www.w3.org/2000/svg">
  ${zenikanard}
  </svg>`

  // downloadable svg file
  const download = Buffer.from(svg, 'utf8')
  res.set('Content-disposition', 'attachment; filename=zenikanard.svg')
  res.set('Content-Type', 'image/svg+xml')
  res.end(download)
})

app.listen(3001, function() {
  console.log('Zenikanard generator listening on port 3001')
})
