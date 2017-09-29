let urlList = {}
const contentPagesList = {}

const makeObj = (obj, category, subCategory, subCategoryChild) => {
  if (subCategoryChild) {
    obj[`/${category.alias}/${subCategory.alias}/${subCategoryChild.alias}`] = subCategoryChild.id
  }
  if (subCategory) {
    obj[`/${category.alias}/${subCategory.alias}`] = subCategory.id
  }
  if (category) {
    obj[`/${category.alias}`] = category.id
  }
}

const urlListFunc = (data) => {
  data.forEach((el) => {
    makeObj(urlList, el)
    if (el.children.length) {
      el.children.forEach((c) => {
        makeObj(urlList, el, c)
        if (c.children.length) {
          c.children.forEach((s) => {
            makeObj(urlList, el, c, s)
          })
        }
      })
    }
  })
}

const contentPagesListFunc = (data) => {
  if (!data.length) {
    return
  }
  data.forEach((el) => {
    makeObj(contentPagesList, el)
  })
}

export default {
  urlList,
  makeObj,
  urlListFunc,
  contentPagesList,
  contentPagesListFunc
}
