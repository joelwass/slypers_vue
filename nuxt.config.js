module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'SLYPERS XXX',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon_flag.ico' }
    ],
    script: [
      { src: 'js/fullstory.js' },
      { src: 'https://js.stripe.com/v3/'},
      { src: 'https://www.googletagmanager.com/gtag/js?id=UA-129382082-1'},
    ]
  },
  serverMiddleware: [ 'redirect-ssl' ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: [
    { src: '~/plugins/swiper.js', ssr: false },
    { src: '~plugins/ga.js', ssr: false },
  ],
  css: [
    'swiper/dist/css/swiper.css'
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'vue-awesome-swiper'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
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
