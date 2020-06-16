/**
 * yarn add got metascraper metascraper-description metascraper-image metascraper-logo metascraper-title -D
 */
const fetchMetaData = async (urls = []) => {
  const got = require('got')

  const metascraper = require('metascraper')([
    require('metascraper-author')(),
    // require('metascraper-date')(),
    require('metascraper-description')(),
    require('metascraper-image')(),
    require('metascraper-logo')(),
    // require('metascraper-clearbit')(),
    // require('metascraper-publisher')(),
    require('metascraper-title')()
    // require('metascraper-url')()
  ])

  if (urls && urls.length > 0) {
    const promises = urls.map(async item => {
      const request = got(item.url, { timeout: 5000 })
      let response = {}
      try {
        response = await request
        const { body: html, url } = response
        const metadata = await metascraper({ html, url })
        return { ...item, ...metadata }
      } catch (error) {
        // request.cancel()
        console.log(error)
        console.log(`[__vuepress-plugin-bookmark__] can't got this url: ${item.url}`)
      }
    })
    const res = await Promise.all(promises)
    const metaDatas = res.filter(v => v !== undefined)
    return metaDatas
  }
  return []
}

module.exports = fetchMetaData
