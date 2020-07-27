const path = require('path')

module.exports = () => ({
  name: 'ImageHub',

  enhanceAppFiles: [
    path.resolve(__dirname, 'enhanceApp.js')
  ]
})
