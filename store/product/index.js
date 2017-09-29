import axios from 'axios'
import _ from 'lodash'
import {createRouter} from '../../.nuxt/router'

import ConfigHelper from '../../helpers/ConfigHelper'
import * as types from './mutationTypes'
import qs from 'qs'
import urlsList from '../../helpers/urlsList'
import * as config from '../../config/index'

const API_URL = ConfigHelper.get('apiUrl')
const PRODUCT_LIST_URL = API_URL + '/products'
const FILTERS_LIST_URL = API_URL + '/filters'
const MENU_LIST_URL = API_URL + '/categories'
const GET_META_URL = API_URL + `/seo?url=${config.url}`

const router = createRouter()

const state = {
  isProcessing: false,
  fetchError: null,
  productList: [],
  mainGems: [],
  featureList: [],
  productTotal: 0,
  productListPage: 1,
  limit: 12,
  grade: 'asc',
  cat_id: null,
  category: {},
  freelancerDetails: {},
  freelancerOffers: [],
  productFilters: {},
  price_range: {},
  product: {
    ru_product: {},
    stock: {},
    main_gem: {},
    metall_colour: {},
    variation_products: [],
    images: []
  },
  menu: [],
  breadcrumbs: [],
  review: null
}

const getters = {
  productList (state) {
    return state.productList
  },
  featureList (state) {
    return state.featureList
  },
  mainGems (state) {
    return state.mainGems
  },
  productListPage (state) {
    return state.productListPage
  },
  productTotal (state) {
    return state.productTotal
  },
  limit (state) {
    return state.limit
  },
  grade (state) {
    return state.grade
  },
  cat_id (state) {
    return state.cat_id
  },
  category (state) {
    return state.category
  },
  productFilters (state) {
    return state.productFilters
  },
  price_range (state) {
    return state.price_range
  },
  product (state) {
    return state.product
  },
  menu (state) {
    return state.menu
  },
  breadcrumbs (state) {
    return state.breadcrumbs
  },
  review (state) {
    return state.review
  }
}

const actions = {
  fetchFilters ({commit}) {
    return new Promise((resolve, reject) => {
      commit(types.FILTERS_LIST_FETCH_PROCESSING)
      axios.get(`${FILTERS_LIST_URL}/${state.cat_id}`).then((res) => {
        let filters = res.data.data.filter(f => f.feature_type)
        commit(types.FILTERS_LIST_FETCH_SUCCESS, filters)
        resolve(filters)
      }).catch(error => {
        commit(types.FILTERS_LIST_FETCH_ERROR, error)
        reject(error)
      })
    })
  },
  fetchProductList ({commit}, filters = {}) {
    return new Promise((resolve, reject) => {
      let catId = getters.cat_id(state) ? `category=${getters.cat_id(state)}` : ''
      commit(types.PRODUCT_LIST_FETCH_PROCESSING)
      axios.get(`${PRODUCT_LIST_URL}?${catId}&${qs.stringify(filters)}`)
        .then((res) => {
          commit(types.PRODUCT_LIST_FETCH_SUCCESS, {
            productList: res.data.data,
            productTotal: res.data.meta.total,
            productListPage: filters.page || 1
          })
          commit(types.LIMIT_SET_SUCCESS, res.data.meta.per_page)
          commit(types.SET_PRICE_RANGE, {
            price_from: res.data.meta.price_from,
            price_to: res.data.meta.price_to
          })
          resolve(res)
        })
        .catch(error => {
          commit(types.PRODUCT_LIST_FETCH_ERROR, error)
          reject(error)
        })
    })
  },
  setFilters ({commit}, filters = {}) {
    commit(types.FILTER_LIST_SET_SUCCESS, filters)
  },
  setLimit ({commit}, limit = 12) {
    commit(types.LIMIT_SET_SUCCESS, limit)
  },
  setGrade ({commit}, grade = 'asc') {
    commit(types.GRADE_SET_SUCCESS, grade)
  },
  setCatId ({commit}, catId = null) {
    commit(types.CAT_ID_SET_SUCCESS, catId)
  },
  fetchProduct ({commit}) {
    return new Promise((resolve, reject) => {
      commit(types.PRODUCT_ITEM_FETCH_PROCESSING)
      let url = `${PRODUCT_LIST_URL}/${router.currentRoute.params.alias}`
      axios.get(url).then((res) => {
        commit(types.PRODUCT_ITEM_FETCH_SUCCESS, {
          product: res.data.data
        })
        resolve(res.data.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  emptyProduct ({commit}, emptyProdObj = {
    ru_product: {},
    stock: {},
    main_gem: {},
    metall_colour: {},
    variation_products: [],
    images: []
  }) {
    commit(types.PRODUCT_ITEM_EMPTY, emptyProdObj)
  },
  fetchMenu ({commit}) {
    return new Promise((resolve, reject) => {
      commit(types.MENU_FETCH_PROCESSING)
      let url = `${MENU_LIST_URL}`
      axios.get(url).then((res) => {
        urlsList.urlListFunc(res.data.data)
        commit(types.MENU_FETCH_SUCCESS, res.data.data)
        resolve(res.data.data)
        actions.fetchBreadcrumbs()
      }).catch(error => {
        commit(types.MENU_FETCH_ERROR, error)
        reject(error)
      })
    })
  },
  fetchBreadcrumbs ({commit}, alias) {
    return new Promise((resolve, reject) => {
      let id = state.cat_id || alias
      if (id) {
        var categories = state.menu
        var find = _.find(categories, { 'alias': id })
        if (find) {
          find.categoryName = 'Products alias'
          commit(types.BREADCRUMBS_SET, [find])
          resolve([find])
        } else {
          _.forEach(categories, function (obj) {
            find = _.find(obj.children, { 'alias': id })
            if (find) {
              find.categoryName = 'Products subCategory'
              obj.categoryName = 'Products alias'
              commit(types.BREADCRUMBS_SET, [obj, find])
              resolve([obj, find])
            } else {
              _.forEach(obj.children, function (childObj) {
                find = _.find(childObj.children, { 'alias': id })
                if (find) {
                  obj.categoryName = 'Products alias'
                  childObj.categoryName = 'Products subCategory'
                  find.categoryName = 'Products subCategoryChild'
                  commit(types.BREADCRUMBS_SET, [obj, childObj, find])
                  resolve([obj, childObj, find])
                } else {
                  reject(new Error(`not Breadcrumbs for == ${id} == category`))
                }
              })
            }
          })
        }
      } else {
        reject(new Error('not id category'))
      }
    })
  },
  sendReviewForProduct ({commit}, data) {
    return new Promise((resolve, reject) => {
      commit(types.SEND_REVIEW_PROCESSING)
      let url = `${PRODUCT_LIST_URL}/${router.currentRoute.params.alias}/comment`
      axios
        .post(url, data)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getMeta ({commit}, url) {
    return new Promise((resolve, reject) => {
      axios.get(`${GET_META_URL}${url}`)
        .then((res) => {
          let response = res.data.data instanceof Array ? undefined : res.data.data
          resolve(response)
        })
        .catch(() => {
          resolve(undefined)
        })
    })
  }
}

const mutations = {
  [types.PRODUCT_LIST_FETCH_PROCESSING] (state) {
    state.isProcessing = true
    return state
  },
  [types.PRODUCT_LIST_FETCH_ERROR] (state, error) {
    state.isProcessing = false
    state.fetchError = error
    return state
  },
  [types.PRODUCT_ITEM_FETCH_PROCESSING] (state) {
    state.isProcessing = true
    return state
  },
  [types.PRODUCT_LIST_FETCH_SUCCESS] (state, data) {
    state.isProcessing = false
    state.productList = data.productList
    state.productTotal = data.productTotal
    state.productListPage = data.productListPage
    return state
  },
  [types.PRODUCT_ITEM_FETCH_SUCCESS] (state, data) {
    state.isProcessing = false
    state.product = data.product
    return state
  },
  [types.FILTERS_LIST_FETCH_SUCCESS] (state, data) {
    state.isProcessing = false
    state.featureList = data
    return state
  },
  [types.FILTERS_LIST_FETCH_PROCESSING] (state) {
    state.isProcessing = true
    return state
  },
  [types.FILTERS_LIST_FETCH_ERROR] (state, error) {
    state.isProcessing = false
    state.fetchError = error
    return state
  },
  [types.FILTER_LIST_SET_SUCCESS] (state, data) {
    state.productFilters = data
    Object.keys(data).filter((k) => k !== 'page' && k !== 'limit' && k !== 'grade').length ? window.$('.mobile-filter__butt.js_open_filter').addClass('check-flt') : window.$('.mobile-filter__butt.js_open_filter').removeClass('check-flt')
    return state.productFilters
  },
  [types.SET_PRICE_RANGE] (state, data) {
    if (data.price_from !== data.price_to) {
      state.price_range.price_from = data.price_from
      state.price_range.price_to = data.price_to
    }
    return state.price_range
  },
  [types.LIMIT_SET_SUCCESS] (state, data) {
    state.limit = data
    return state.limit
  },
  [types.GRADE_SET_SUCCESS] (state, data) {
    state.grade = data
    return state.grade
  },
  [types.CAT_ID_SET_SUCCESS] (state, data) {
    state.cat_id = data
    return state.cat_id
  },
  [types.MENU_FETCH_PROCESSING] (state) {
    state.isProcessing = true
    return state
  },
  [types.MENU_FETCH_SUCCESS] (state, data) {
    state.menu = data
    return state.menu
  },
  [types.MENU_FETCH_ERROR] (state, error) {
    state.isProcessing = false
    state.fetchError = error
    return state
  },
  [types.BREADCRUMBS_SET] (state, data) {
    state.breadcrumbs = data
    return state.breadcrumbs
  },
  [types.PRODUCT_ITEM_EMPTY] (state, data) {
    state.product = data
    return state.product
  },
  [types.SEND_REVIEW_PROCESSING] (state, data) {
    state.isProcessing = true
    return state
  },
  [types.SEND_REVIEW_SUCCESS] (state, data) {
    state.isProcessing = false
    state.review = data
    return state.review
  },
  [types.SEND_REVIEW_ERROR] (state, error) {
    state.isProcessing = false
    state.review = error
    return state.review
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
