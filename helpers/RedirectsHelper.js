export let redirectsList = {}

export let makeRedirectsList = (data) => {
  data.forEach(element => {
    redirectsList[`${element.bad_url}`] = element.good_url
  })
}
