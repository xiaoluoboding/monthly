const path = require('path')
// const fetchMetaData = require('./fetchMetaData')
const apifyMetaData = require('./apifyMetaData')

const flatten = (arr, depth = 1) =>
  arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), [])

module.exports = ({ apify = {}, palette = {}}, { pages }) => ({
  name: 'bookmark',

  enhanceAppFiles: [
    path.resolve(__dirname, 'enhanceApp.js')
  ],

  async clientDynamicModules () {
    // console.log(pages)
    const bookmarkUrls = flatten(pages.map(page => page.frontmatter)
      .filter(fm => fm.bookmarks && fm.bookmarks.length > 0)
      .map(fm => fm.bookmarks))
    // console.log(bookmarkUrls)
    // const metaData = {}
    // const metaData = await fetchMetaData(urls)
    /**
     * {
        author: 'Ghost',
        description: 'Our handlebars theme templating framework works with the Ghost API to build flexible publishing websites. Get all the tools you need to start building your custom theme here!',
        image: 'https://ghost.org/images/meta/Ghost-Docs.jpg',
        logo: 'https://ghost.org/favicon.png',
        title: 'Ghost Handlebars Themes - Building a custom Ghost theme - Docs'
      }
     */
    // console.log(palette)
    const metaData = await apifyMetaData(apify, bookmarkUrls)
    // console.log(metaData)
    console.log(`New bookmarks: ${metaData.length}`)

    return {
      name: 'constants.js',
      content: `
        export const META_DATA = ${JSON.stringify(metaData)}
        export const PALETTE = ${JSON.stringify(palette)}
      `
    }
  }
})
