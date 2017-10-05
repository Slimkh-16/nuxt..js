import urlsList from './urlsList'
let fetchContentPage = async (to, next, router, store) => {
  await store.dispatch('fetchContentPage')
  isContentPage(to, next, router)
}
let fetchMenu = async (to, next, router, store) => {
  await store.dispatch('fetchMenu')
  isUrlsList(to, next, router)
}

/**
 * functions for content pages
 * this function checks to.path and 
 * if urlsList.contentPagesList not contains content page with url === to.path
 * router redirect to category_alias page
*/
const checkContentPagesList = (to, next, router, store) => {
  console.log('***********************')
  console.log('urlsList.contentPagesList', urlsList.contentPagesList)
  if (Object.keys(urlsList.contentPagesList).length) {
    isContentPage(to, next, router)
  } else {
    fetchContentPage(to, next, router, store)
    /* store.dispatch('fetchContentPage').then(() => {
      checkContentPagesList(to, next, router, store)
    }) */
  }
}

const isContentPage = (to, next, router) => {
  let url = to.path.slice(-1) === '/' ? to.path.slice(0, to.path.length - 1) : to.path
  let redirect = to.path.slice(-1) === '/' ? to.path.slice(0, to.path.length - 1) : false
  if (urlsList.contentPagesList[url]) {
    redirect ? router.push(redirect) : next()
    return false
  } else {
    router.push({name: 'category_alias', params: {'category_alias': to.path.slice(1, to.path.length)}})
  }
}

/**
 * functions for category pages
 * this function checks to.path and 
 * if urlsList.urlList not contains category page with url === to.path
 * router redirect to product_alias page
*/

const checkUrl = (to, next, router, store) => {
  console.log('***********************')
  console.log('urlsList.urlList', urlsList.urlList)
  if (Object.keys(urlsList.urlList).length) {
    isUrlsList(to, next, router)
  } else {
    fetchMenu(to, next, router, store)
    /* store.dispatch('fetchMenu').then(() => {
      checkUrl(to, next, router, store)
    }) */
  }
}

const isUrlsList = (to, next, router) => {
  let url = to.path.indexOf('/f/') > -1 ? to.path.slice(0, to.path.indexOf('/f/')) : to.path
  let redirect = to.path.slice(-1) === '/' ? to.path.slice(0, to.path.length - 1) : false
  /**
   * for single product
   * if this url not belown category - redirect to 'Product page'
   */
  if (!urlsList.urlList[url] && !redirect) {
    router.push({name: 'Product page', params: {'alias': url.slice(1, url.length)}})
    return false
  }
  /**
   * for category page
   * if this url belown category - check on slash in the end of url
  */
  if (urlsList.urlList[url] && !redirect) {
    next()
  } else {
    redirect ? router.push(redirect) : router.push('/notFound')
  }
}

export default function (to, from, next, router, store) {
  Promise.all([
    store.dispatch('fetchContentPage'),
    store.dispatch('fetchMenu')
  ]).then(() => {
    console.log('===================================')
    console.log(to.name)
    console.log('===================================')
    if (to.name === 'Content page') {
      checkContentPagesList(to, next, router, store)
      return true
    } else if (to.name === 'category_alias') {
      checkUrl(to, next, router, store)
      return true
    } else {
      console.log('====== other page =========')
      next()
      return true
    }
  })
}
