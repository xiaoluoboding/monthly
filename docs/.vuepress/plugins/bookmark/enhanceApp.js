import { META_DATA } from '@dynamic/constants'
import Bookmark from './Bookmark.vue'

export default ({ Vue }) => {
  // use bookmark component
  Vue.component('Bookmark', Bookmark)
  // inject dynamic computed properties
  Vue.mixin({
    computed: {
      $bookmarks: () => META_DATA
    }
  })
}
