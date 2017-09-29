import * as types from './mutationTypes'

const state = {
  cart: [],
  count: null,
  subtotal: null
}

const getters = {
  cart (state) {
    return state.cart
  },
  count (state) {
    return state.count
  },
  subtotal (state) {
    return state.subtotal
  }
}

const actions = {
  fetchCart ({commit}, [data = [], count = 0, subtotal = 0]) {
    commit(types.CART_FETCH_SUCCESS, data)
    commit(types.COUNT_FETCH_SUCCESS, count)
    commit(types.SUBTOTAL_FETCH_SUCCESS, subtotal)
  },
  updateCart ({commit}, [data, count, subtotal]) {
    commit(types.CART_FETCH_SUCCESS, data)
    commit(types.COUNT_FETCH_SUCCESS, count)
    commit(types.SUBTOTAL_FETCH_SUCCESS, subtotal)
  }
}

const mutations = {
  [types.CART_FETCH_SUCCESS] (state, data) {
    state.cart = data
    return state.cart
  },
  [types.COUNT_FETCH_SUCCESS] (state, data) {
    state.count = data
    return state.count
  },
  [types.SUBTOTAL_FETCH_SUCCESS] (state, data) {
    state.subtotal = data
    return state.subtotal
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
