import * as types from './mutationTypes'
import axios from 'axios'
import ConfigHelper from '../../helpers/ConfigHelper'
import qs from 'qs'

const API_URL = ConfigHelper.get('apiUrl')
const POSTS_LIST_URL = API_URL + '/posts'
const LATEST_POSTS_LIST_URL = POSTS_LIST_URL + '/latest'

const state = {
  posts: null,
  post: {},
  postsLimit: 10,
  postsCurrentPage: 1,
  postsTotal: 1,
  latestPosts: null
}

const getters = {
  posts: (state) => state.posts,
  post: (state) => state.post,
  postsLimit: (state) => state.postsLimit,
  postsCurrentPage: (state) => state.postsCurrentPage,
  postsTotal: (state) => state.postsTotal,
  latestPosts: (state) => state.latestPosts
}

const actions = {
  fetchPosts ({commit}, f) {
    return new Promise((resolve, reject) => {
      let filter = f ? `?&${qs.stringify(f)}` : ''
      axios
        .get(POSTS_LIST_URL + filter)
        .then((resp) => {
          commit(types.POSTS_FETCH_SUCCESS, resp.data)
          resolve(state.posts)
        })
        .catch((error) => {
          console.log(`ERROR FROM FETCH POSTS: `, error)
          reject(error)
        })
    })
  },
  fetchOnePost ({commit}, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(POSTS_LIST_URL + `/${id}`)
        .then((resp) => {
          commit(types.POST_FETCH_SUCCESS, resp.data.data)
          resolve(state.post)
        })
        .catch((error) => {
          console.log(`ERROR FROM FETCH POST: `, error)
          reject(error)
        })
    })
  },
  fetchLatestPosts ({commit}) {
    return new Promise((resolve, reject) => {
      axios
        .get(LATEST_POSTS_LIST_URL)
        .then((resp) => {
          commit(types.LATEST_POSTS_FETCH_SUCCESS, resp.data.data)
          resolve(state.latestPosts)
        })
        .catch((error) => {
          console.log(`ERROR FROM FETCH LATEST POSTS: `, error)
          reject(error)
        })
    })
  }
}

const mutations = {
  [types.POSTS_FETCH_SUCCESS] (state, data) {
    state.posts = data.data
    state.postsCurrentPage = data.meta.current_page
    state.postsLimit = data.meta.per_page
    state.postsTotal = data.meta.total
    return state
  },
  [types.POST_FETCH_SUCCESS] (state, data) {
    state.post = data
    return state
  },
  [types.LATEST_POSTS_FETCH_SUCCESS] (state, data) {
    state.latestPosts = data
    return state
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
