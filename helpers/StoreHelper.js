const accentuateAffiliatesByCity = (arr) => {
  if (!arr.length) {
    return
  }
  accentuateAffiliatesByCity.data = {}
  arr.forEach((element) => {
    if (accentuateAffiliatesByCity.data[element.city.alias]) {
      accentuateAffiliatesByCity.data[element.city.alias].affiliates.push(element)
    } else {
      accentuateAffiliatesByCity.data[element.city.alias] = {}
      accentuateAffiliatesByCity.data[element.city.alias].name = element.city.locale.name
      accentuateAffiliatesByCity.data[element.city.alias].id = element.city.id
      accentuateAffiliatesByCity.data[element.city.alias].affiliates = [element]
    }
  })
  return accentuateAffiliatesByCity.data
}
export default accentuateAffiliatesByCity
