import Vue from 'vue'
import Vuex from 'vuex'

import home from './home'
import cart from './cart'
import product from './product'
import contentPages from './contentPages'
import stores from './stores'
import checkout from './checkout'
import order from './order'
import search from './search'
import posts from './posts'
import reviews from './reviews'
import settings from './settings'
import articles from './articles'
import stones from './stones'
import redirect from './redirect'
import meta from './meta'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    modules: {
      home,
      cart,
      contentPages,
      product,
      checkout,
      order,
      search,
      posts,
      reviews,
      settings,
      articles,
      stones,
      stores,
      redirect,
      meta
    }
  })
}

export default createStore
