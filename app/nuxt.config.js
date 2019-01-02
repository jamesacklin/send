const pkg = require('./package')

module.exports = {
  mode: 'universal',
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'language', content: 'en-us' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://www.dirtragmag.com/',
        crossorigin: true
      }
    ]
  },
  loading: { color: '#FF0000' },
  css: ['~/static/global.css'],
  plugins: [
    { src: '~/plugins/vue-dfp.js', ssr: false },
    { src: '~/plugins/vue-lazy.js', ssr: false }
  ],
  router: {
    // scrollBehavior: function(to, from, savedPosition) {
    //   return savedPosition
    // }
  },
  modules: ['@nuxtjs/pwa', '@nuxtjs/axios'],
  axios: {
    baseURL: 'https://www.dirtragmag.com/wp-json/wp/v2/',
    https: true,
    progress: true
  },
  render: {
    compressor: {
      level: 6
    }
  },
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    cache: true,
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    }
  },
  manifest: {
    name: 'Dirt Rag',
    short_name: 'Dirt Rag',
    description: 'Mountain Bike News Since 1989',
    lang: 'en-us',
    dir: 'ltr',
    background_color: '#fff',
    theme_color: '#FF0000',
    display: 'standalone',
    orientation: 'portrait-primary'
  }
}
