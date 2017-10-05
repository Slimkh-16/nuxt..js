const checkUrlOnSlash = ({ redirect, store, route, app }) => {
  let redir = route.path.slice(-1) === '/' ? route.path.slice(0, route.path.length - 1) : false
  redir && redirect(301, redir)
  /* console.log('*************', route.path)
  if (route.path === '/news') {
    console.log('checkUrlOnSlash', route.path)
    app.router.push({name: 'ContactsPage', path: 'news'})
    return false
  } */
}

export default checkUrlOnSlash
