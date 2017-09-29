import axios from 'axios'
import * as types from './mutationTypes'
import ConfigHelper from '../../helpers/ConfigHelper'
import qs from 'qs'

const API_URL = ConfigHelper.get('apiUrl')
const PRODUCTS_URL = API_URL + '/products'
const SEARCH_BY_STRING_URL = PRODUCTS_URL + '?search='

const state = {
  fetchError: null,
  searchProductList: [],
  searchProductTotal: null,
  searchProductListPage: 1,
  searchProductLimit: null
}

const getters = {
  searchProductList: (state) => state.searchProductList,
  searchProductTotal: (state) => state.searchProductTotal,
  searchProductListPage: (state) => state.searchProductListPage,
  searchProductLimit: (state) => state.searchProductLimit
}

const actions = {
  searchByString ({commit}, [str, f]) {
    return new Promise((resolve, reject) => {
      let filter = f ? `&${qs.stringify(f)}` : ''
      axios
        .get(SEARCH_BY_STRING_URL + `${str}` + filter)
        .then(res => {
          commit(types.FETCH_SEARCH_BY_STRING_SUCCESS, {
            searchProductList: res.data.data,
            searchProductTotal: res.data.meta.total,
            searchProductListPage: res.data.meta.current_page || 1
          })
          commit(types.LIMIT_SET_SUCCESS, res.data.meta.per_page)
          resolve(state.searchProductList)
          console.log(state.searchProductList)
        })
        .catch(error => {
          commit(types.FETCH_SEARCH_BY_STRING_ERROR, error)
          reject(error)
        })
    })
  },
  resetSearch ({commit}) {
    commit(types.RESET_SEARCH)
  }
}

const mutations = {
  [types.FETCH_SEARCH_BY_STRING_SUCCESS] (state, data) {
    state.searchProductList = data.searchProductList
    state.searchProductTotal = data.searchProductTotal
    state.searchProductListPage = data.searchProductListPage
    return state
  },
  [types.FETCH_SEARCH_BY_STRING_ERROR] (state, error) {
    state.fetchError = error
    return state
  },
  [types.LIMIT_SET_SUCCESS] (state, data) {
    state.searchProductLimit = data
    return state
  },
  [types.RESET_SEARCH] (state) {
    state.searchProductLimit = null
    state.searchProductList = []
    state.searchProductTotal = null
    state.searchProductListPage = 1
    return state
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
