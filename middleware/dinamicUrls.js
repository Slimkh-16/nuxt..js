import urlsList from '../helpers/urlsList'

export default function ({ redirect, store, route, app }) {
  console.log('route.name ==> ', route.name)
  if (!Object.keys(urlsList.urlList).length) {
    store.dispatch('fetchMenu').then(() => {
      console.log('route.name ==> ', route.name)
      if (urlsList.contentPagesList[route.path]) {
        console.log('content page')
      } else if (urlsList.urlList[route.path] && route.name === 'Content page') {
        console.log('category page')
        app.router.push({name: 'category_alias', params: {'category_alias': route.path.slice(1, route.path.length)}})
      } else {
        console.log('product page')
      }
    })
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
