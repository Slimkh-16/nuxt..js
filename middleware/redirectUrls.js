import { redirectsList } from '../helpers/RedirectsHelper'
import ConfigHelper from '../helpers/ConfigHelper'

const URL = ConfigHelper.get('frontUrl')
let count = 0

async function redirectionFunction ({ redirect, store, route }) {
  if (redirectsList && Object.keys(redirectsList).length) {
    let goodUrl = redirectsList[`${URL}${route.path}`]
    if (goodUrl) {
      let url = goodUrl.good_url
      let code = goodUrl.status_code
      url = url.slice(url.indexOf('/', 8), url.length)
      redirect(code, url)
    }
  } else if (count < 5) {
    count++
    await store.dispatch('fetchRedirects')
    redirectionFunction({ redirect, store, route })
  }
}

export default redirectionFunction
