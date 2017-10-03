import axios from 'axios'
import ConfigHelper from '../../helpers/ConfigHelper'

const API_URL = ConfigHelper.get('apiUrl')
const GET_META_URL = API_URL + `/seo?url=${ConfigHelper.get('frontUrl')}`

const state = {
  meta: null
}

const getters = {
  meta: (state) => state.meta
}

const actions = {
  getMeta ({commit}, url) {
    return new Promise((resolve, reject) => {
      axios.get(`${GET_META_URL}${url}`)
        .then((res) => {
          let response = res.data.data instanceof Array ? undefined : res.data.data
          resolve(response)
          commit('setMeta', response)
        })
        .catch(() => {
          resolve(undefined)
        })
    })
  }
}

const mutations = {
  setMeta (state, data) {
    state.meta = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
