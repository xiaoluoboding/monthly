module.exports = {
  title: '前端技术栈月刊',
  description: '聚焦前端，记录过去一个月发现的值得推荐的前端技术栈、文章以及应用，每月28日更新。',
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
        text: 'GitHub', link: 'https://github.com/xiaoluoboding/monthly'
      }
    ],
    sidebar: [
      {
        title: '2019 年度',
        path: '/2019/',
        collapsable: false,
        sidebarDepth: 2,
        children: Array(12).fill().map((v, i) => {
          let month = i + 1
          let monthNum = month < 10 ? String(month).padStart(2, '0') : month
          return `/2019/2019-${monthNum}`
        })
      },
      {
        title: '2020 年度',
        path: '/2020/',
        collapsable: false,
        sidebarDepth: 2
        // children: Array(1).fill().map((v, i) => {
        //   let month = i + 1
        //   let monthNum = month < 10 ? String(month).padStart(2, '0') : month
        //   return `/2020/2020-${monthNum}`
        // })
      },
    ]
  },
  plugins: ['@vuepress/back-to-top']
}