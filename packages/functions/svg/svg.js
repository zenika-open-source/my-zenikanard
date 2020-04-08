const svgBuilder = require('./svgBuilder')

exports.handler = async (event) => {
  const params = event.queryStringParameters
  return {
    statusCode: 200,
    headers: {
      'Content-disposition': 'attachment; filename=zenikanard.svg',
      'Content-Type': 'image/svg+xml',
    },
    body: svgBuilder.build(params),
  }
}
