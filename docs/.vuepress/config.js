// .vuepress/config.js
module.exports = {
  title: 'Hyoj blog',
  description: 'hyoj :: Today I Learned',
  serviceWorker: true,
  themeConfig: {
    repo: 'hyoj/hyoj.github.io',
    repoLabel: 'Github!',
    docsRepo: 'hyoj/hyoj.github.io',
    docsDir: 'docs',
    docsBranch: 'develop',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    nav: [
      {text: 'Home', link: '/'},
      {text: 'Dev tips', link: '/dev-tips/'},
    ],
    /*sidebar: [
      ['/dev-tips/test/', 'dd']
    ]*/
    sidebar: [
      {
        title: 'Dev tips',
        collapsable: false,
        children: [
          ['/dev-tips/test/', 'test :D'],
          ['/dev-tips/im.html', 'yo !']
        ]
      }
    ]
  }
}