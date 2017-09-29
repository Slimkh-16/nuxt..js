import * as types from './mutationTypes'
import axios from 'axios'
import {createRouter} from '../../.nuxt/router'
import ConfigHelper from '../../helpers/ConfigHelper'

const API_URL = ConfigHelper.get('apiUrl')
const HOME_STONE_URL = API_URL + '/gems'
const CATEGORIES_BY_STONE_URL = (stone) => API_URL + `/gems/${stone}/categories`

const router = createRouter()

const state = {
  stone: null,
  stone_categories: null
}

const getters = {
  stone: (state) => state.stone,
  stone_categories: (state) => state.stone_categories
}

const actions = {
  getStone ({commit}) {
    return new Promise((resolve, reject) => {
      axios
        .get(HOME_STONE_URL)
        .then((resp) => {
          commit(types.HOME_STONE_FETCH_SUCCESS, resp.data.data)
          resolve(resp.data.data)
        })
        .catch((error) => {
          console.log(`ERROR FROM FETCH HOME: `, error)
          reject(error)
        })
    })
  },
  getCategoriesByStone ({commit}) {
    return new Promise((resolve, reject) => {
      axios
        .get(CATEGORIES_BY_STONE_URL(router.currentRoute.params.alias))
        .then((resp) => {
          commit(types.STONE_CATEGORIES_FETCH_SUCCESS, resp.data)
          resolve(resp.data)
        })
        .catch((error) => {
          console.log(`ERROR FROM FETCH HOME: `, error)
          reject(error)
        })
    })
  }
}

const mutations = {
  [types.HOME_STONE_FETCH_SUCCESS] (state, data) {
    state.stone = data
    return state
  },
  [types.STONE_CATEGORIES_FETCH_SUCCESS] (state, data) {
    state.stone_categories = data
    return state
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
