import axios from 'axios'
import * as types from './mutationTypes'
import ConfigHelper from '../../helpers/ConfigHelper'

const API_URL = ConfigHelper.get('apiUrl')
const GET_ORDER_BY_HASH = API_URL + '/orders'
const GET_LIQPAY_FORM = API_URL + '/payment'
const SEND_PRIVAT_DATA = API_URL + '/payment/privat_payment'

const state = {
  fetchError: null,
  orderObj: {},
  form: null
}

const getters = {
  orderObj: (state) => state.orderObj,
  form: (state) => state.form
}

const actions = {
  fetchOrderByHash ({commit, state}, hash) {
    return new Promise((resolve, reject) => {
      axios
        .get(GET_ORDER_BY_HASH + `/${hash}`)
        .then(res => {
          /**
           * if order_payment_method is 1 => to a bank card
           * get liqpay form
          */

          if (res.data.data.order_payment_method.id === 1 && (res.data.data.status.id === 1 || res.data.data.status.id === 2)) {
            actions.fetchLiqpayForm({commit, state}, hash)
          }
          /**
           * commit fetched data by hash
          */
          commit(types.FETCH_ORDER_BY_HASH_SUCCESS, res.data.data)
          resolve(state.orderObj)
        })
        .catch(error => {
          commit(types.FETCH_ORDER_BY_HASH_ERROR, error)
          reject(error)
        })
    })
  },
  fetchLiqpayForm ({commit, state}, hash) {
    return new Promise((resolve, reject) => {
      axios
        .get(GET_LIQPAY_FORM + `/${hash}/get_form`)
        .then(res => {
          commit(types.FETCH_LIQPAY_FORM_SUCCESS, res.data.form)
        })
        .catch(error => {
          commit(types.FETCH_LIQPAY_FORM_ERROR, error)
        })
    })
  },
  sendPrivatData ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(SEND_PRIVAT_DATA, data)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

const mutations = {
  /**
   * ORDER
  */
  [types.FETCH_ORDER_BY_HASH_SUCCESS] (state, data) {
    state.orderObj = data
    return state
  },
  [types.FETCH_ORDER_BY_HASH_ERROR] (state, error) {
    state.fetchError = error
    return state
  },
  /**
   * FORM
  */
  [types.FETCH_LIQPAY_FORM_SUCCESS] (state, form) {
    state.form = form
    return state
  },
  [types.FETCH_LIQPAY_FORM_ERROR] (state, error) {
    state.fetchError = error
    return state
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
