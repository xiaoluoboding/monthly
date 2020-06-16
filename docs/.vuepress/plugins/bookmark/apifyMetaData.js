const ApifyClient = require('apify-client')

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const apifyMetaData = async (apify = {}, urls = []) => {
  const { userId, token, actId } = apify

  const apifyClient = new ApifyClient({
    userId,
    token
  })

  // const keyValueStores = apifyClient.keyValueStores
  const datasets = apifyClient.datasets
  const dataset = await datasets.getOrCreateDataset({ datasetName: 'metainfo' })
  apifyClient.setOptions({ datasetId: dataset.id })

  const { items, total } = await datasets.getItems()
  console.log(`Old Bookmarks: ${total}`)

  const requestUrls = urls.filter(item => {
    return !items.map(v => v.alias).includes(item.alias)
  })

  console.log(requestUrls)

  let metadata = []
  // Awaited promise
  if (requestUrls && requestUrls.length > 0) {
    try {
      await apifyClient.acts.runAct({
        actId,
        token,
        body: JSON.stringify({ urls }),
        contentType: 'application/json; charset=utf-8'
      })
      // console.log(actors)
      console.log('run actors successfully')

      console.log('sleep 2s')

      await sleep(2000)

      console.log('fetch new data')
      // Awaited promise
      try {
        // const store = await keyValueStores.getOrCreateStore({ storeName: 'metainfo' })
        // apifyClient.setOptions({ storeId: store.id })
        // const res = await keyValueStores.getRecord({ key: 'meta' })

        // Get dataset with name 'my-dataset' and set it as default
        // to be used in following commands.
        const dataset = await datasets.getOrCreateDataset({ datasetName: 'metainfo' })
        apifyClient.setOptions({ datasetId: dataset.id })
        const res = await datasets.getItems()
        // console.log(res)
        metadata = res.items
        // Do something record ...
      } catch (err) {
        console.log(err)
        // Do something with error ...
      }
      // Do something actors list ...
    } catch (err) {
      console.log(err)
      // Do something with error ...
    }
  } else {
    metadata = items
  }
  return metadata
}

module.exports = apifyMetaData
