export let redirectsList = {}

export let makeRedirectsList = (data) => {
  data.forEach(element => {
    redirectsList[`${element.bad_url}`] = {
      good_url: element.good_url,
      status_code: element.status_code
    }
  })
}
