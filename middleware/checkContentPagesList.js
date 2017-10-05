import urlsList from '../helpers/urlsList'

const checkContentPagesList = ({ redirect, store, route }) => {
  if (route.name === 'Content page') {
    Object.keys(urlsList.contentPagesList).length ? isContentPage({ redirect, store, route }) : setTimeout(() => { checkContentPagesList({ redirect, store, route }) }, 0)
  }
}

const isContentPage = ({ redirect, store, route }) => {
  let url = route.path.slice(-1) === '/' ? route.path.slice(0, route.path.length - 1) : route.path
  let redirectUrl = route.path.slice(-1) === '/' ? route.path.slice(0, route.path.length - 1) : false
  if (urlsList.contentPagesList[url]) {
    console.log('is content Page', redirectUrl)
    redirectUrl && redirect(redirectUrl)
  } else {
    console.log('not content Page')
    /* store.app.router.push({name: 'category_alias', params: {'category_alias': route.path.slice(1, route.path.length)}}) */
  }
}

export default checkContentPagesList
