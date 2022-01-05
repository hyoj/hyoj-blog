// .vuepress/config.js
module.exports = {
  title: 'Hyoj blog',
  description: 'hyoj :: Today I Learned',
  ga: 'UA-127141472-1',
  serviceWorker: true,
  markdown: {
    config: md => {
      md.use(require('markdown-it-mermaid').default)
    }
  },
  themeConfig: {
    logo: '/pint.svg',
    repo: 'hyoj',
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
      '/blog/java/': ['/blog/java/basic/', '/blog/java/spring/'],
      '/blog/tips/': ['/blog/tips/intellij/intellij-plugins/'],
      // fallback
      "/": []
    }
  },
  plugins: [
    [
      "vuepress-plugin-google-adsense",
      {
        adClient: "ca-pub-9199147683694786",
      },
    ],
  ]
}