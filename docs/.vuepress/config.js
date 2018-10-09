// .vuepress/config.js
module.exports = {
  title: 'Hyoj blog',
  description: 'hyoj :: Today I Learned',
  ga: 'UA-127141472-1',
  serviceWorker: true,
  themeConfig: {
    logo: '/pint.svg',
    repo: 'hyoj/hyoj.github.io',
    repoLabel: 'Github!',
    docsRepo: 'hyoj/hyoj.github.io',
    docsDir: 'docs',
    docsBranch: 'develop',
    editLinkText: 'Edit this page on GitHub',
    nav: [
      {text: 'Home', link: '/blog/all/'},
      {text: 'Java', link: '/blog/java/'},
      {text: 'tips', link: '/blog/tips/'},
    ],
    sidebar: {
      '/blog/all/': ['/blog/all/categories/', '/blog/all/tags/'],
      '/blog/java/': ['/blog/java/basis/', '/blog/java/spring/'],
      '/blog/tips/': ['/blog/tips/intellij/intellij-plugins/'],
      // fallback
      "/": []
    }
  }
}