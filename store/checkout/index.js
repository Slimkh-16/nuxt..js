import axios from 'axios'
import * as types from './mutationTypes'
import ConfigHelper from '../../helpers/ConfigHelper'

const API_URL = ConfigHelper.get('apiUrl')
const NOVA_POSHTA_URL = API_URL + '/nova_poshta'
const REGIONS_OF_NOVA_POSHTA_URL = NOVA_POSHTA_URL + '/regions'
const CITIES_OF_NOVA_POSHTA_URL = NOVA_POSHTA_URL + '/cities'
const WAREHOUSES_OF_NOVA_POSHTA_URL = NOVA_POSHTA_URL + '/warehouses'
const CONFIRM_ORDER_URL = API_URL + '/orders'

const state = {
  fetchError: null,
  checkoutObj: {},
  nova_poshta_regions: null,
  nova_poshta_cities: null,
  nova_poshta_warehouses: null,
  hash: null,
  liqpay: false
}

const getters = {
  checkoutObj: (state) => state.checkoutObj,
  nova_poshta_regions: (state) => state.nova_poshta_regions,
  nova_poshta_cities: (state) => state.nova_poshta_cities,
  nova_poshta_warehouses: (state) => state.nova_poshta_warehouses,
  hash: (state) => state.hash
}

const actions = {
  fetchNovaPoshta_Regions ({commit}) {
    return new Promise((resolve, reject) => {
      axios
        .get(REGIONS_OF_NOVA_POSHTA_URL)
        .then(res => {
          commit(types.FETCH_OF_NOVA_POSHTA_REGIONS_SUCCESS, res.data.data)
          commit(types.FETCH_OF_NOVA_POSHTA_CITIES_SUCCESS, null)
          commit(types.FETCH_OF_NOVA_POSHTA_WAREHOUSES_SUCCESS, null)
          resolve(state.nova_poshta_regions)
        })
        .catch(error => {
          commit(types.FETCH_OF_NOVA_POSHTA_REGIONS_ERROR, error)
          reject(error)
        })
    })
  },
  fetchNovaPoshta_Cities ({commit}, ref) {
    return new Promise((resolve, reject) => {
      axios
        .get(CITIES_OF_NOVA_POSHTA_URL + `/${ref}`)
        .then(res => {
          commit(types.FETCH_OF_NOVA_POSHTA_CITIES_SUCCESS, res.data.data)
          commit(types.FETCH_OF_NOVA_POSHTA_WAREHOUSES_SUCCESS, null)
          resolve(state.nova_poshta_cities)
        })
        .catch(error => {
          commit(types.FETCH_OF_NOVA_POSHTA_CITIES_ERROR, error)
          reject(error)
        })
    })
  },
  fetchNovaPoshta_Warehouses ({commit}, ref) {
    return new Promise((resolve, reject) => {
      axios
        .get(WAREHOUSES_OF_NOVA_POSHTA_URL + `/${ref}`)
        .then(res => {
          commit(types.FETCH_OF_NOVA_POSHTA_WAREHOUSES_SUCCESS, res.data.data)
          resolve(state.nova_poshta_cities)
        })
        .catch(error => {
          commit(types.FETCH_OF_NOVA_POSHTA_WAREHOUSES_ERROR, error)
          reject(error)
        })
    })
  },
  setCheckoutProps ({commit}, data) {
    commit(types.SET_CHECKOUT_INFO, data)
  },
  confirmOrder ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIRM_ORDER_URL, data)
        .then(res => {
          state.liqpay = data.order_payment_method_id === '1'
          commit(types.SET_HASH_FOR_ORDER, res.data.hash)
          resolve(res.data.hash)
        })
        .catch(error => reject(error))
    })
  }
}

const mutations = {
  /**
   * REGIONS
  */
  [types.FETCH_OF_NOVA_POSHTA_REGIONS_SUCCESS] (state, data) {
    state.nova_poshta_regions = data
    return state
  },
  [types.FETCH_OF_NOVA_POSHTA_REGIONS_ERROR] (state, error) {
    state.fetchError = error
    return state
  },
  /**
   * CITIES
  */
  [types.FETCH_OF_NOVA_POSHTA_CITIES_SUCCESS] (state, data) {
    state.nova_poshta_cities = data
    return state
  },
  [types.FETCH_OF_NOVA_POSHTA_CITIES_ERROR] (state, error) {
    state.fetchError = error
    return state
  },
  /**
   * WAREHOUSES
  */
  [types.FETCH_OF_NOVA_POSHTA_WAREHOUSES_SUCCESS] (state, data) {
    state.nova_poshta_warehouses = data
    return state
  },
  [types.FETCH_OF_NOVA_POSHTA_WAREHOUSES_ERROR] (state, error) {
    state.fetchError = error
    return state
  },
  /**
   * CHECKOUT_INFO
  */
  [types.SET_CHECKOUT_INFO] (state, data) {
    for (let key in data) {
      state.checkoutObj[key] = data[key]
    }
    return state
  },
  [types.SET_HASH_FOR_ORDER] (state, hash) {
    state.hash = hash
    return state
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
