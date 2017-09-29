import * as types from './mutationTypes'
import axios from 'axios'
import ConfigHelper from '../../helpers/ConfigHelper'

const API_URL = ConfigHelper.get('apiUrl')
const SETTINGS_LIST_URL = API_URL + '/settings'

const state = {
  settings: null
}

const getters = {
  settings: (state) => state.settings
}

const actions = {
  fetchSettings ({commit}) {
    return new Promise((resolve, reject) => {
      axios
        .get(SETTINGS_LIST_URL)
        .then((resp) => {
          commit(types.SETTINGS_FETCH_SUCCESS, resp.data)
          resolve(state.settings)
        })
        .catch((error) => {
          console.log(`ERROR FROM FETCH settings: `, error)
          reject(error)
        })
    })
  }
}

const mutations = {
  [types.SETTINGS_FETCH_SUCCESS] (state, data) {
    state.settings = data.data
    return state
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
