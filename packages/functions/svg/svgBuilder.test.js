const fs = require('fs')
const svgBuilder = require('./svgBuilder')

jest.mock('fs')

describe('listFilesInDirectorySync', () => {
  beforeAll(() => {
    fs.__mockFiles = {
      './assets/shapes/body.svg': '<body />',
      './assets/shapes/head.svg': '<head />',
      './assets/shapes/eye-1.svg': '<eye1 />',
      './assets/shapes/body-tatoo-1.svg': '<body-tatoo-1 />',
    }
  })

  it('generate the minimal svg with body and head if no params given', () => {
    const svg = svgBuilder.build()
    expect(svg).toBe(`<?xml version=\"1.0\" standalone=\"yes\"?>
<svg viewBox=\"0 0 2000 2000\" width=\"2000\" height=\"2000\" xmlns=\"http://www.w3.org/2000/svg\">
<body /><head />
</svg>`)
  })

  it('generate the minimal svg with given params', () => {
    const svg = svgBuilder.build({
      'body-tatoo': 'body-tatoo-1',
      eye: 'eye-1',
    })
    expect(svg).toBe(`<?xml version=\"1.0\" standalone=\"yes\"?>
<svg viewBox=\"0 0 2000 2000\" width=\"2000\" height=\"2000\" xmlns=\"http://www.w3.org/2000/svg\">
<body /><body-tatoo-1 /><head /><eye1 />
</svg>`)
  })

  it('generate the minimal svg with given params even if some params does not exist', () => {
    const svg = svgBuilder.build({
      'body-tatoo': 'body-tatoo-1',
      eye: 'eye-3',
      foo: 'foo-1',
      mouth: ['bar-1', 'bar-2'],
    })
    expect(svg).toBe(`<?xml version=\"1.0\" standalone=\"yes\"?>
<svg viewBox=\"0 0 2000 2000\" width=\"2000\" height=\"2000\" xmlns=\"http://www.w3.org/2000/svg\">
<body /><body-tatoo-1 /><head />
</svg>`)
  })
})
