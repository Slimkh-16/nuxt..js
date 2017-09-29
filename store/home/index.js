import * as types from './mutationTypes'
import axios from 'axios'
import ConfigHelper from '../../helpers/ConfigHelper'

const API_URL = ConfigHelper.get('apiUrl')
const HOME_LIST_URL = API_URL + '/home'

const state = {
  top_products: null,
  new_products: null,
  latest_news: null,
  seo: null,
  slider: null,
  top_cats: null,
  silver_cats: null,
  gold_cats: null,
  last_reviews: null
}

const getters = {
  top_products: (state) => state.top_products,
  new_products: (state) => state.new_products,
  latest_news: (state) => state.latest_news,
  seo: (state) => state.seo,
  slider: (state) => state.slider,
  top_cats: (state) => state.top_cats,
  silver_cats: (state) => state.silver_cats,
  gold_cats: (state) => state.gold_cats,
  last_reviews: (state) => state.last_reviews
}

const actions = {
  getHome ({commit}) {
    return new Promise((resolve, reject) => {
      axios
        .get(HOME_LIST_URL)
        .then((resp) => {
          commit(types.HOME_SETTINGS_FETCH_SUCCESS, resp.data)
          resolve(resp.data)
        })
        .catch((error) => {
          console.log(`ERROR FROM FETCH HOME: `, error)
          reject(error)
        })
    })
  }
}

const mutations = {
  [types.HOME_SETTINGS_FETCH_SUCCESS] (state, data) {
    state.top_products = data.top_products
    state.new_products = data.new_products
    state.latest_news = data.latest_news
    state.seo = data.seo
    state.last_reviews = data.last_reviews
    state.slider = data.slider
    state.top_cats = data.top_cats
    state.silver_cats = data.silver_cats
    state.gold_cats = data.gold_cats
    return state
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
