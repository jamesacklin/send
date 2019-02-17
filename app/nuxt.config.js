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
        href: 'http://68.183.116.134',
        crossorigin: true
      }
    ]
  },
  loading: { color: '#eb181d' },
  css: ['~/static/global.css'],
  plugins: [
    { src: '~/plugins/fontawesome.js', ssr: true },
    { src: '~/plugins/vue-dfp.js', ssr: false },
    { src: '~/plugins/vue-disqus.js', ssr: false },
    { src: '~/plugins/vue-lazy.js', ssr: false },
    { src: '~/plugins/vue-socialsharing.js', ssr: false }
  ],
  router: {
    extendRoutes(routes, resolve) {
      return [
        {
          path: '/',
          component: resolve(__dirname, 'pages/index.vue'),
          name: 'index'
        },
        {
          path: '/page/:page',
          component: resolve(__dirname, 'pages/index.vue'),
          name: 'index-page'
        },
        {
          path: '/:slug',
          component: resolve(__dirname, 'pages/page.vue'),
          name: 'page'
        },
        {
          path: '/articles/:slug',
          component: resolve(__dirname, 'pages/article.vue'),
          name: 'article'
        },
        {
          path: '/category/:slug',
          component: resolve(__dirname, 'pages/category-index.vue'),
          name: 'category-index'
        },
        {
          path: '/category/:slug/page/:page',
          component: resolve(__dirname, 'pages/category-index.vue'),
          name: 'category-index-page'
        }
      ]
    }
    // scrollBehavior: function(to, from, savedPosition) {
    //   return savedPosition
    // }
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    ['@nuxtjs/google-analytics', { 
      id: 'UA-474542-4'
    }],
    ['nuxt-device-detect', { 
      defaultUserAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Mobile Safari/537.36'
    }]
  ],
  axios: {
    baseURL: 'http://104.248.113.148/wp-json/wp/v2/',
    https: false,
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
