import { statusOfProduct, classNameByStatus } from '../../enum'

const combineMultyFilters = (arr) => {
  let multyFilter = {
    filter_id: null,
    obj: null
  }
  let newArr = []

  arr.forEach((f) => {
    if (f.filter.type !== 4) {
      newArr.push(f)
    } else {
      if (f.filter_id === multyFilter.filter_id) {
        splitObj(f, multyFilter.obj)
      } else {
        multyFilter.obj ? (newArr.push(multyFilter.obj), updateMultyFilter(multyFilter, f)) : updateMultyFilter(multyFilter, f)
      }
    }
  })
  multyFilter.obj && newArr.push(multyFilter.obj)
  return newArr
}

const updateMultyFilter = (multyFilter, f) => {
  multyFilter.obj = JSON.parse(JSON.stringify(f))
  multyFilter.filter_id = f.filter_id
}

const splitObj = (newFilter, savedFilter) => {
  if (savedFilter) {
    let savedFilterName = savedFilter.value.locale.name
    let newFilterName = newFilter.value.locale.name
    savedFilterName instanceof Array ? savedFilter.value.locale.name.push(newFilterName) : savedFilter.value.locale.name = [savedFilterName].concat([newFilterName])
  } else {
    savedFilter = JSON.parse(JSON.stringify(newFilter))
  }
}

export default {
  data () {
    return {
      status: statusOfProduct,
      className: classNameByStatus
    }
  },
  methods: {
    productFeature (product) {
      return product && product.feature && product.feature.length ? combineMultyFilters(product.feature.filter((f) => f.filter && f.filter.type_view !== 1)).slice(0, 5) : []
    },
    productCharacteristic (product) {
      if (product && product.feature && product.feature.length) {
        product.feature.forEach(f => {
          if (f.characteristic) {
            f.filter = f.characteristic
          }
        })
        return combineMultyFilters(product.feature.filter((f) => f.filter && f.filter.type_view !== 1))
      } else {
        return []
      }
    },
    productStatusClass (product) {
      return product.status && `product-status product-status--${this.className[product.status - 1]}`
    },
    productStatusName (product) {
      return product.status ? this.status[product.status - 1] : ''
    },
    isInSession (product) {
      let prodIdArr = this.$ls.get('viewedProductsId')
      if (prodIdArr && prodIdArr.indexOf(product.id) > -1) {
        return true
      } else {
        return false
      }
    },
    setProductIdInSession (product) {
      let prodIdArr = this.$ls.get('viewedProductsId') || []
      let prodObjArr = this.$ls.get('viewedProductsObj') || []
      prodIdArr.push(product.id)
      prodObjArr.push(product)
      this.$ls.set('viewedProductsId', prodIdArr)
      this.$ls.set('viewedProductsObj', prodObjArr)
    },
    filterName (f) {
      let name
      if (!f) {
        return ''
      }
      if (f.value.locale) {
        name = f.value.locale.name instanceof Array ? f.value.locale.name.reduce((p, n) => p + ', ' + n) : f.value.locale.name
        return name
      }
      if (f.filter.type === 2) {
        return 'Есть'
      } else {
        return f.value.num
      }
    }
  }
}
