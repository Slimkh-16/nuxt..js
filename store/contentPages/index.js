import * as types from './mutationTypes'
import axios from 'axios'
import ConfigHelper from '../../helpers/ConfigHelper'
import urlsList from '../../helpers/urlsList'

const API_URL = ConfigHelper.get('apiUrl')
const CONTENT_LIST_URL = API_URL + '/content_pages'

const state = {
  contentPages: []
}

const getters = {
  contentPages: (state) => state.contentPages
}

const actions = {
  fetchContentPage ({commit, state}) {
    return new Promise((resolve, reject) => {
      /* Возвращает значение или ошибку */
      axios
        .get(CONTENT_LIST_URL)
        .then((resp) => {
          commit(types.CONTENT_LIST_URL, resp.data.data)
          resolve(state.contentPages)
          urlsList.contentPagesListFunc(state.contentPages)
        })
        .catch((error) => {
          console.log(`ERROR FROM FETCH POST: `, error)
          reject(error)
        })
    })
  }
}

const mutations = {
  [types.CONTENT_LIST_URL] (state, data) {
    state.contentPages = data
    return state
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
