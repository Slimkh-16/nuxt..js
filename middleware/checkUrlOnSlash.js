const checkUrlOnSlash = ({ redirect, store, route, app, next }) => {
  let redir = route.path.slice(-1) === '/' ? route.path.slice(0, route.path.length - 1) : false
  redir && redirect(301, redir)
}

export default checkUrlOnSlash
