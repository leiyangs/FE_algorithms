module.exports = {
  lang: 'zh-CN',
  title: '前端算法',
  description: '前端算法',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: 'https://vuejs.org/images/logo.png' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  dest: './docs/.vuepress/dist',
  evergreen: true,
  base: '/FE_algorithms/', // 这是部署到github相关的配置
  markdown: {
    extractHeaders: ['h2','h3','h4','h5','h6'],
    lineNumbers: false, // 代码块显示行号
  },
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    nav: [ // 导航栏配置
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      {
        text: 'github',
        link: 'https://github.com/leiyangs',
           target: '_blank'
      }
    ],
    sidebarDepth: 4, // 侧边栏显示2级
    sidebar: [
      {
        title: '链表',
        collapsable: true,
        children: [
          { title: '什么是链表', path: "/LinkedList/" },
          { title: '力扣', path: "/LinkedList/LeetCode/" }
        ]
      },
      {
        title: '队列',
        collapsable: true,
        children: [
          { title: '什么是队列', path: "/Queue/" },
          { title: '力扣', path: "/Queue/LeetCode/" }
        ]
      },
      {
        title: '栈',
        collapsable: true,
        children: [
          { title: '什么是栈', path: "/Stack/" },
          { title: '力扣', path: "/Stack/LeetCode/" }
        ]
      },
      {
        title: '二叉树',
        collapsable: true,
        children: [
          { title: '什么是二叉树', path: "/BinaryTree/" },
          { title: '力扣', path: "/BinaryTree/LeetCode/" }
        ]
      }
      // {
      //   title: 'Nginx',
      //   children: [
          // { title: "一、linux概念", path: "/linkedList/" },
        // ]
      // },
    ]
  }
}