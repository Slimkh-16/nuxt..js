import { redirectsList } from '../helpers/RedirectsHelper'
import ConfigHelper from '../helpers/ConfigHelper'

const URL = ConfigHelper.get('frontUrl')
let count = 0

function redirectionFunction ({ redirect, store, route }) {
  console.log('redirects middelware')
  if (redirectsList && Object.keys(redirectsList).length) {
    let goodUrl = redirectsList[`${URL}${route.path}`]
    if (goodUrl) {
      redirect(302, goodUrl.slice(goodUrl.indexOf('/', 8), goodUrl.length))
    }
  } else if (count < 5) {
    count++
    store.dispatch('fetchRedirects')
    redirectionFunction({ redirect, store, route })
  }
}

export default redirectionFunction
