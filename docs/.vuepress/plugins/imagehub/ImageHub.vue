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

    const year = dayjs(this.$page.frontmatter.created_at).year()

    let imageCDN = year < 2020 ? this.$themeConfig.imageOldCDN : this.$themeConfig.imageNewCDN

    const src = this.filepath
      ? `${imageCDN}${this.filepath}`
      : `${imageCDN}${date}${this.filename}`
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
