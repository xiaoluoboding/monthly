const Bookmark = require('./plugins/bookmark/index.js')
const ImageHub = require('./plugins/imagehub/index.js')

const getSidebar = (year, month) => {
  let sidebar = []
  sidebar = Array(month).fill().map((v, i) => {
    let month = i + 1
    let monthNum = month < 10 ? String(month).padStart(2, '0') : month
    return `/${year}/${year}-${monthNum}`
  })
  sidebar.unshift(`/${year}/`)
  return sidebar
}

module.exports = {
  title: '前端技术栈月刊',
  description: '聚焦前端，记录过去一个月探索发现的值得推荐的前端技术栈、文章以及应用，每月28日更新',
  base: '/monthly/',
  themeConfig: {
    nav: [
      {
        text: '2019', link: '/2019/',
      },
      {
        text: '2020', link: '/2020/',
      },
      {
        text: '2021', link: '/2021/2021-06',
      },
      {
        text: '🗡️ Knives Out', link: '/knivesout/',
      },
      {
        text: 'GitHub', link: 'https://github.com/xiaoluoboding/monthly'
      }
    ],
    sidebar: [
      {
        title: '2019 年度',
        path: '/2019/',
        sidebarDepth: 2,
        children: getSidebar(2019, 12)
      },
      {
        title: '2020 年度',
        path: '/2020/',
        sidebarDepth: 2,
        children: getSidebar(2020, 12)
      },
      {
        title: '2021 年度',
        path: '/2021/',
        collapsable: false,
        sidebarDepth: 2,
        children: getSidebar(2021, 06)
      },
      {
        title: 'Knives Out',
        path: '/knivesout/',
        children: [
          '/knivesout/chrome-plugins',
          '/knivesout/vscode-plugins',
          '/knivesout/macos-app'
        ]
      }
    ],
    imageOldCDN: 'https://cdn.jsdelivr.net/gh/xiaoluoboding/image-hub-old@latest/images/',
    image2020CDN: 'https://cdn.jsdelivr.net/gh/xiaoluoboding/image-hub@latest/images/',
    image2021CDN: 'https://cdn.jsdelivr.net/gh/xiaoluoboding/image-hub-2021@latest/'
  },
  markdown: {
    lineNumbers: true
  },
  plugins: [
    ['@vuepress/back-to-top'],
    [
      Bookmark,
      {
        apify: {
          userId: 'aBiK4hymWp4K2LiZc',
          token: 'dhMoBHTwdc6J36aifJ77L9E7x',
          actId: '8xlX2NQerxiadEAUl'
        },
        palette: {
          titleColor: '#3eaf7c'
        }
      }
    ],
    [
      ImageHub
    ]
  ]
}