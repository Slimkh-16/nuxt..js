import * as types from './mutationTypes'
import axios from 'axios'
import ConfigHelper from '../../helpers/ConfigHelper'
import qs from 'qs'

const API_URL = ConfigHelper.get('apiUrl')
const ARTICLES_LIST_URL = API_URL + '/articles'

const state = {
  articles: null,
  article: {},
  articlesLimit: 10,
  articlesCurrentPage: 1,
  articlesTotal: 1
}

const getters = {
  articles: (state) => state.articles,
  article: (state) => state.article,
  articlesLimit: (state) => state.articlesLimit,
  articlesCurrentPage: (state) => state.articlesCurrentPage,
  articlesTotal: (state) => state.articlesTotal
}

const actions = {
  fetchArticles ({commit}, f) {
    return new Promise((resolve, reject) => {
      let filter = f ? `?&${qs.stringify(f)}` : ''
      axios
        .get(ARTICLES_LIST_URL + filter)
        .then((resp) => {
          commit(types.ARTICLES_FETCH_SUCCESS, resp.data)
          resolve(state.articles)
        })
        .catch((error) => {
          console.log(`ERROR FROM FETCH POSTS: `, error)
          reject(error)
        })
    })
  },
  fetchOneArticle ({commit}, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(ARTICLES_LIST_URL + `/${id}`)
        .then((resp) => {
          commit(types.ARTICLE_FETCH_SUCCESS, resp.data.data)
          resolve(state.article)
        })
        .catch((error) => {
          console.log(`ERROR FROM FETCH POST: `, error)
          reject(error)
        })
    })
  }
}

const mutations = {
  [types.ARTICLES_FETCH_SUCCESS] (state, data) {
    state.articles = data.data
    state.articlesCurrentPage = data.meta.current_page
    state.articlesLimit = data.meta.per_page
    state.articlesTotal = data.meta.total
    return state
  },
  [types.ARTICLE_FETCH_SUCCESS] (state, data) {
    state.article = data
    return state
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
