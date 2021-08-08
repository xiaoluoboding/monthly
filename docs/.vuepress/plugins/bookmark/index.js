const path = require('path')

const flatten = (arr, depth = 1) =>
  arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), [])

module.exports = ({ apiPrefix = '', palette = {}}, { pages }) => ({
  name: 'bookmark',

  enhanceAppFiles: [
    path.resolve(__dirname, 'enhanceApp.js')
  ],

  async clientDynamicModules () {
    // console.log(pages)
    const bookmarks = flatten(pages.map(page => page.frontmatter)
      .filter(fm => fm.bookmarks && fm.bookmarks.length > 0)
      .map(fm => fm.bookmarks))
    // console.log(bookmarks)
    // console.log(palette)
    // console.log(apiHost)

    return {
      name: 'constants.js',
      content: `
        export const BOOKMARKS = ${JSON.stringify(bookmarks)}
        export const PALETTE = ${JSON.stringify(palette)}
        export const API_PREFIX = ${JSON.stringify(apiPrefix)}
      `
    }
  }
})
