import { mapActions } from 'vuex'
import Vue from 'vue'
import VueLocalStorage from 'vue-ls'
let options = {
  namespace: 'vuejs__'
}
Vue.use(VueLocalStorage, options)

Vue.config.productionTip = false

export default {
  methods: {
    ...mapActions(['updateCart', 'fetchCart']),
    getCart () {
      this.fetchCart([this.$ls.get('cart'), this.$ls.get('cartCount'), this.$ls.get('subtotal')])
    },
    addProductIntoCart (product) {
      let cartArr = this.$ls.get('cart') || []
      if (cartArr.length) {
        let same = cartArr.some((prodInCard) => {
          if (prodInCard.npp === product.npp && !prodInCard.grave.text && !product.grave.text) {
            prodInCard.qty = +prodInCard.qty + +product.qty
            prodInCard.totalPrice = +prodInCard.computedPrice + +product.computedPrice
            return prodInCard
          }
        })
        if (!same) {
          cartArr.push(product)
        }
      } else {
        cartArr.push(product)
      }
      this.updateCart([this.setCart(cartArr), this.setCount(cartArr), this.setSubtotal(cartArr)])
    },
    setCart (cartArr) {
      this.$ls.set('cart', cartArr)
      return cartArr
    },
    setCount (cartArr) {
      let cartCount = 0
      if (cartArr.length > 1) {
        cartArr.forEach((o) => {
          cartCount += +o.qty
        })
      } else {
        if (cartArr.length) {
          cartCount = +cartArr[0].qty
        } else {
          cartCount = 0
        }
      }
      this.$ls.set('cartCount', cartCount)
      return cartCount
    },
    setSubtotal (cartArr) {
      let subtotal = 0
      if (cartArr.length > 1) {
        cartArr.forEach((o) => {
          subtotal += +(o.totalPrice || o.computedPrice)
        })
      } else {
        subtotal = cartArr.length ? (cartArr[0].totalPrice || cartArr[0].computedPrice) : 0
      }
      this.$ls.set('subtotal', subtotal)
      return subtotal
    },
    cangeQtyOfProduct (npp, qty) {
      let cartArr = this.$ls.get('cart') || []
      if (cartArr.length) {
        cartArr.forEach((product) => {
          if (product.npp === npp) {
            product.qty = qty
            product.totalPrice = product.computedPrice * product.qty
          }
        })
        this.updateCart([this.setCart(cartArr), this.setCount(cartArr), this.setSubtotal(cartArr)])
      }
    },
    removeProductFromCart (npp) {
      let cartArr = this.$ls.get('cart') || []
      let index
      if (cartArr.length) {
        cartArr.forEach((product, i) => {
          if (product.npp === npp) {
            index = i
          }
        })
        cartArr.splice(index, 1)
        this.updateCart([this.setCart(cartArr), this.setCount(cartArr), this.setSubtotal(cartArr)])
      }
    },
    resetCart () {
      let cartArr = []
      this.updateCart([this.setCart(cartArr), this.setCount(cartArr), this.setSubtotal(cartArr)])
    }
  }
}
