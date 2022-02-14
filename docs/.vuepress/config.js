module.exports = {
  lang: 'zh-CN',
  title: '前端算法',
  description: '算法（Algorithm）是指用来操作数据、解决程序问题的一组方法。对于同一个问题，使用不同的算法，也许最终得到的结果是一样的，但在过程中消耗的资源和时间却会有很大的区别。',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/images/logo.png' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  dest: './docs/.vuepress/dist',
  evergreen: true,
  base: '/FE_algorithms/', // 这是部署到github相关的配置
  markdown: {
    extractHeaders: ['h2','h3','h4','h5','h6'],
    lineNumbers: false, // 代码块显示行号
  },
  themeConfig: {
    logo: '/images/logo.png',
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
      },
      {
        title: '堆',
        collapsable: true,
        children: [
          { title: '什么是堆', path: "/Heap/" },
          { title: '力扣', path: "/Heap/LeetCode/" }
        ]
      },
      {
        title: '并查集',
        collapsable: true,
        children: [
          { title: '什么并查集', path: "/UnionFind/" },
          { title: '力扣', path: "/UnionFind/LeetCode/" }
        ]
      },
      {
        title: '快速排序',
        collapsable: true,
        children: [
          { title: '什么排序', path: "/QuickSort/" },
          { title: '力扣', path: "/QuickSort/LeetCode/" }
        ]
      }
    ]
  }
}