export default {
  methods: {
    getTopCategories (catArr) {
      return catArr && catArr.length ? catArr.filter((c) => !c.parent) : []
    },
    parseByParentFromTopCategories (catsArr) {
      let catArr = JSON.parse(JSON.stringify(catsArr))
      let topCategories = this.getTopCategories(catArr)
      catArr.forEach((category, i) => {
        topCategories.forEach((topCategory, a) => {
          if (topCategory.id === this.deepOfCategory(category, category)) {
            topCategory.childrenCategories ? topCategory.childrenCategories.push(category) : topCategory.childrenCategories = [category]
          }
        })
      })
      return topCategories
    },
    deepOfCategory (obj, cat) {
      let url = `/${obj.alias}`
      cat.path ? cat.path.indexOf(url) < 0 && cat.path.unshift(url) : cat.path = [url]
      if (obj.parent) {
        return this.deepOfCategory(obj.parent, cat)
      } else {
        return obj.id
      }
    }
  }
}
