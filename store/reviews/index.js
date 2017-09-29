import * as types from './mutationTypes'
import axios from 'axios'
import ConfigHelper from '../../helpers/ConfigHelper'
import qs from 'qs'

const API_URL = ConfigHelper.get('apiUrl')
const REVIEWS_LIST_URL = API_URL + '/reviews'
const CONTACT_FORM_URL = API_URL + '/contact_us'

const state = {
  reviews: null,
  totalReviewsForSite: 6,
  currentPageReviewsForSite: 1,
  itemsPerPageReviewsForSite: 6
}

const getters = {
  reviews: (state) => state.reviews,
  itemsPerPageReviewsForSite: (state) => state.itemsPerPageReviewsForSite,
  currentPageReviewsForSite: (state) => state.currentPageReviewsForSite,
  totalReviewsForSite: (state) => state.totalReviewsForSite
}

const actions = {
  fetchReviews ({commit}, f) {
    return new Promise((resolve, reject) => {
      let filter = f ? `?&${qs.stringify(f)}` : ''
      axios
        .get(REVIEWS_LIST_URL + filter)
        .then((resp) => {
          commit(types.REVIEWS_FETCH_SUCCESS, resp.data.data)
          commit(types.REVIEWS_META, resp.data.meta)
          resolve(state.reviews)
        })
        .catch((error) => {
          console.log(`ERROR FROM FETCH REVIEWS: `, error)
          reject(error)
        })
    })
  },
  sendReviewForSite ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(REVIEWS_LIST_URL, data)
        .then((resp) => {
          resolve(resp)
        })
        .catch((error) => {
          console.log(`ERROR FROM FETCH REVIEWS: `, error)
          reject(error)
        })
    })
  },
  sendContactForm ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(CONTACT_FORM_URL, data)
        .then((resp) => {
          resolve(resp)
        })
        .catch((error) => {
          console.log(`ERROR FROM FETCH CONTACT_FORM_URL: `, error)
          reject(error)
        })
    })
  }
}

const mutations = {
  [types.REVIEWS_FETCH_SUCCESS] (state, data) {
    state.reviews = data
    return state
  },
  [types.REVIEWS_META] (state, meta) {
    state.totalReviewsForSite = meta.total
    state.currentPageReviewsForSite = meta.current_page
    state.itemsPerPageReviewsForSite = meta.per_page
    return state
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
