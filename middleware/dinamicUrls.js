import urlsList from '../helpers/urlsList'

const someFunction = async ({ redirect, store, route, app }) => {
  if (!Object.keys(urlsList.urlList).length) {
    await store.dispatch('fetchMenu')
    console.log('route.name ==> ', route.name)
    if (urlsList.contentPagesList[route.path]) {
      console.log('content page')
    } else if (urlsList.urlList[route.path]) {
      console.log('category page')
      app.router.push({name: 'category_alias', params: {'category_alias': route.path.slice(1, route.path.length)}})
    } else {
      console.log('product page')
    }
  } else {
    console.log('route.name ==> ', route.name)
    if (urlsList.contentPagesList[route.path]) {
      console.log('content page')
    } else if (urlsList.urlList[route.path] && route.name === 'Content page') {
      app.router.push({name: 'category_alias', params: {'category_alias': route.path.slice(1, route.path.length)}})
      console.log('category page')
    } else {
      console.log('product page')
    }
  }
}

export default someFunction
