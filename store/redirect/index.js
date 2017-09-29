import * as types from './mutationTypes'
import axios from 'axios'
import ConfigHelper from '../../helpers/ConfigHelper'
import { makeRedirectsList } from '../../helpers/RedirectsHelper'

const API_URL = ConfigHelper.get('apiUrl')
const REDIRECT_LIST_URL = API_URL + '/redirects'

const state = {
  redirects: null
}

const getters = {
  redirects: (state) => state.redirects
}

const actions = {
  fetchRedirects ({commit}) {
    return new Promise((resolve, reject) => {
      axios
        .get(REDIRECT_LIST_URL)
        .then((resp) => {
          commit(types.REDIRECTS_FETCH_SUCCESS, resp.data)
          resolve(state.redirects)
        })
        .catch((error) => {
          console.log(`ERROR FROM FETCH REDIRECTS: `, error)
          reject(error)
        })
    })
  }
}

const mutations = {
  [types.REDIRECTS_FETCH_SUCCESS] (state, data) {
    makeRedirectsList(data.data)
    state.redirects = data.data
    return state
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
