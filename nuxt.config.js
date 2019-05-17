// Purge CSS
const purgecss = require('@fullhuman/postcss-purgecss')({

  // Specify the paths to all of the template files in your project
  content: [
    './pages/**/*.html',
    './pages/**/*.vue',
    './pages/**/*.jsx',
    './layouts/**/*.html',
    './layouts/**/*.vue',
    './layouts/**/*.jsx',
    './components/**/*.html',
    './components/**/*.vue',
    './components/**/*.jsx'
  ],
  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
})

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/tailwind.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/repository.js'
  ],
  /*
   ** Watch
   */
  watch: [
    '~/api/**/*.js'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
   ** Server Middleware
   */
  serverMiddleware: [
    '~/api/router-middleware'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  /*
   ** Build configuration
   */
  build: {
    postcss: {
      plugins: [
        require('tailwindcss')('./tailwind.config.js'),
        require('autoprefixer'),
        ...process.env.NODE_ENV === 'production'
        ? [purgecss]
        : []
      ]
    },
    /*
     ** You can extend webpack config here
     */
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
    }
  }
}
