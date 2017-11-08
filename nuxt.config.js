let ProductListPage = 'components/_category_alias/index.vue'
let ContentPage = 'components/ContentPage/ContentPage.vue'
let ProductPage = 'components/ProductItemPage/ProductItemPage.vue'
let ContactsPage = 'components/Contacts/ContactsPage.vue'
let SearchPage = 'components/SearchPage/SearchPage.vue'
let Cart = 'components/Cart/Cart.vue'
let Checkout = 'components/Checkout/Checkout.vue'
let Order = 'components/Order/Checkout.vue'
let Reviews = 'components/Reviews/Reviews.vue'
let Component = 'components/Component.vue'
let notFound = 'components/notFound.vue'

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Eurogold',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'keywords', name: 'keywords', content: '' },
      { hid: 'robots', name: 'robots', content: 'index, follow' }
    ],
    link: [
      { rel: 'canonical', href: '' }
    ]
  },
  router: {
    cache: false,
    middleware: ['redirectUrls', 'checkUrlOnSlash'],
    extendRoutes (routes, resolve) {
      routes.push(
        /**
         * pages with static url
        */
        {
          path: '/notFound',
          name: 'notFound',
          component: notFound
        },
        {
          path: '/contacts',
          name: 'ContactsPage',
          component: ContactsPage
        },
        {
          path: '/cart',
          name: 'Cart',
          component: Cart
        },
        /* {
          path: '/stones/:alias',
          name: 'StonePage',
          component: StonePage,
          beforeEnter (to, from, next) {
            checkUrlOnSlash(to, next)
          }
        },
        {
          path: '/stores/:id',
          name: 'StoreOne',
          component: StoreOne,
          beforeEnter (to, from, next) {
            checkUrlOnSlash(to, next)
          }
        }, */
        {
          path: '/reviews',
          name: 'Reviews',
          component: Reviews
        },
        {
          path: '/checkout',
          name: 'Checkout',
          component: Checkout
        },
        {
          path: '/order/:hash',
          name: 'Order',
          component: Order
        },
        {
          path: '/search_page',
          name: 'SearchPage',
          component: SearchPage
        },
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
          path: '/:component',
          name: 'Component',
          component: Component
        },
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
  ** plugins
  */
  // plugins: ['~/plugins/jquery.maskedinput.min.js'],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== 'UglifyJsPlugin')
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
