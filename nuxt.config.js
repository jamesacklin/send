const pkg = require("./package");

module.exports = {
  mode: "universal",

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#FF0000" },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Middleware
  */
  router: {
    middleware: ["https"],
    scrollBehavior: function(to, from, savedPosition) {
      return { x: 0, y: 0 };
    }
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    [
      "@nuxtjs/pwa",
      {
        onesignal: false,
        workbox: false // no service worker during dev
      }
    ],
    "@nuxtjs/axios"
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: "https://www.dirtragmag.com/wp-json/wp/v2/",
    https: true,
    progress: true
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    },
    extractCSS: true,
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

  /*
	* PWA Manifest
	*/
  manifest: {
    name: "Dirt Rag",
    short_name: "Dirt Rag",
    description: "Mountain Bike News Since 1989",
    lang: "en-us",
    dir: "ltr",
    background_color: "#fff",
    theme_color: "#444444",
    display: "standalone",
    orientation: "portrait-primary"
  }
};