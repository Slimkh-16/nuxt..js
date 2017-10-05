let ProductListPage = 'components/_category_alias/index.vue'
let ContentPage = 'components/ContentPage/ContentPage.vue'
let ProductPage = 'components/ProductItemPage/ProductItemPage.vue'

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '%s | Awesome JS SSR Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'keywords', name: 'keywords', content: '' },
      { hid: 'robots', name: 'robots', content: 'index, follow' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/ico-16.png' },
      { rel: 'canonical', href: '' }
    ]
  },
  router: {
    middleware: ['redirectUrls', 'checkUrlOnSlash'],
    extendRoutes (routes, resolve) {
      routes.push(
        /**
         * category with filters
        */
        {
          path: '/:category_alias/f/*',
          name: 'category_alias-filter',
          component: ProductListPage
        },
        {
          path: '/:category_alias/:subcategory_alias/f/*',
          name: 'category_alias-subcategory_alias-filter',
          component: ProductListPage
        },
        {
          path: '/:category_alias/:subcategory_alias/:subCategoryChild/f/*',
          name: 'category_alias-subCategoryChild-filter',
          component: ProductListPage
        },
        /**
         * contentPages
        */
        {
          path: '/:alias',
          name: 'Content page',
          component: ContentPage
        },
        /**
         * categories without filters
        */
        {
          path: '/:category_alias',
          name: 'category_alias',
          component: ProductListPage
        },
        {
          path: '/:category_alias/:subcategory_alias',
          name: 'category_alias-subcategory_alias',
          component: ProductListPage
        },
        {
          path: '/:category_alias/:subcategory_alias/:subCategoryChild',
          name: 'category_alias-subCategoryChild',
          component: ProductListPage
        },
        /**
         * product page
        */
        {
          path: '/:alias',
          name: 'Product page',
          component: ProductPage
        }
      )
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  /**
   * generate dinac routes
  */
  generate: {
    routes (callback) {
      const posts = require('./posts.json')
      let routes = posts.map(post => `/post/${post['id']}`)
      callback(null, routes)
    }
  }
}
