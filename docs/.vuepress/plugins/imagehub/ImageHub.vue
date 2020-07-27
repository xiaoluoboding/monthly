<script>
import dayjs from 'dayjs'

export default {
  name: 'ImageHub',
  props: {
    filename: {
      type: String,
      default: ''
    },
    filepath: {
      type: String,
      default: ''
    }
  },
  render (h) {
    const date = dayjs(this.$page.frontmatter.created_at).format('YYYY/MM/')
    const src = this.filepath
      ? `${this.$themeConfig.imageCDN}${this.filepath}`
      : `${this.$themeConfig.imageCDN}${date}${this.filename}`
    return h('p',
      {},
      [
        h('img', {
          attrs: {
            src,
            target: '_blank'
          }
        }, this.$slots.default)
      ]
    )
  }
}
</script>
