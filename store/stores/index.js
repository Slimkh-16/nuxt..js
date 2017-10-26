import * as types from './mutationTypes'
import axios from 'axios'
import ConfigHelper from '../../helpers/ConfigHelper'
import accentuateAffiliatesByCity from '../../helpers/StoreHelper'

const API_URL = ConfigHelper.get('apiUrl')
const AFFILIATES_LIST_URL = API_URL + '/affiliates'

const state = {
  affiliates: null,
  stores: null
}

const getters = {
  affiliates: (state) => state.affiliates,
  stores: (state) => state.stores
}

const actions = {
  fetchAffiliates ({commit, state}) {
    return new Promise((resolve, reject) => {
      axios
        .get(AFFILIATES_LIST_URL)
        .then((resp) => {
          commit(types.AFFILIATES_FETCH_SUCCESS, resp.data.data)
          resolve(state.affiliates)
        })
        .catch((error) => {
          console.log(`ERROR FROM FETCH AFFILIATES: `, error)
          reject(error)
        })
    })
  }
}

const mutations = {
  [types.AFFILIATES_FETCH_SUCCESS] (state, data) {
    accentuateAffiliatesByCity(data)
    state.stores = data
    state.affiliates = accentuateAffiliatesByCity(data)
    return state
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
