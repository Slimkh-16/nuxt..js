<template>
  <!--cart-section-->
  <section class="cart-page">
    <div class="container">
      <breadcrumbs :breadcrumbs="{way: [{locale: {name: 'Корзина'}}]}"></breadcrumbs>
      <div class="cart-page-container cart-cont-parent">
        <div class="heading-cart">Моя корзина</div><span class="cart-close js_close_cart icon-close"></span>
        <div class="cart-body">
          <div class="cart-body-table">
            <table v-if="cart.length">
              <tr v-for="c in cart" :data-product-id="c.product" :key="c.alias">
                <td class="img_holder"><img :src="getImgSrc(c)" :alt="c.locale.name"></td>
                <td>
                  <ul>
                    <li><router-link :to="`/${c.alias}`">{{c.locale.name}}</router-link></li>
                    <li v-if="c.size">Размер: {{c.size}}</li>
                    <li v-if="c.weight">Вес: {{c.weight}}</li>
                    <li v-if="c.npp.length">Артикул: {{c.npp}}</li>
                    <li v-if="c.grave.text">Гравировка: {{c.grave.text}}</li>
                    <li v-if="c.grave.style_id">Стиль гравировки: {{graveStyleList[+c.grave.style_id - 1]}}</li>
                  </ul>
                </td>
                <td><span>{{c.computedPrice}}</span> грн.</td>
                <td>
                  <div class="quantity-wrap">
                    <span class="minus-icon" @click="c.qty > 1 && (c.qty--, checkValue(c))">&#8722;</span>
                    <input type="text" :data-price-product="c.price" v-model="c.qty" @input="checkValue(c)" class="quantity">
                    <span class="plus-icon" @click="c.qty++, checkValue(c)">+</span>
                    <span class="remove-item js_remove" @click="removeProductFromCart(c.npp)">удалить</span>
                  </div>
                </td>
                <td>
                  <span class="js_total_product">{{c.totalPrice && c.totalPrice.toFixed(2) || c.computedPrice && c.computedPrice.toFixed(2)}}</span> грн.
                </td>
              </tr>
            </table>
            <div v-else class="align-center empty-cart">Корзина пуста</div>
          </div>
          <a v-if="cart.length" href="#" class="btn waves-effect waves-light back" @click.prevent="goBack()">Вернуться к покупкам</a>
          <a v-if="cart.length" href="#" class="btn waves-effect waves-light resetCart" @click.prevent="() => resetCart()">Очистить корзину</a>
        </div>
        <div  v-if="cart.length" class="cart-total">
          Итого:
          <b v-if="subtotal" class="js_total">{{subtotal && subtotal.toFixed(2)}}</b> грн.
          <router-link :to="'/checkout'" class="btn waves-effect waves-light">Оформить заказ</router-link>
        </div>
      </div>
    </div>
    <div id="cartIsEmpty" class="modal">
      <div class="modal-content"><span class="modal-action modal-close modal-close--top icon-cancel" @click="redirectToIndex()"></span>
        <div class="modal-head">Ваша козина пуста</div>
        <div class="modal-foot clearfix">
          <span class="waves-effect waves-light modal-close" @click="redirectToIndex()"><span class="icon-16-arrow-link"></span>Ок</span>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import Breadcrumbs from '../../components/Breadcrumbs.vue'
import ImageHelper from '../../helpers/ImageHelper'
import SeoHelper from '../../helpers/SeoHelper'
import Cart from '../../helpers/Cart'
import { graveStyleList } from '../../enum'

export default {
  data () {
    return {
      graveStyleList: graveStyleList
    }
  },
  components: {
    'breadcrumbs': Breadcrumbs
  },
  mixins: [ImageHelper, Cart, SeoHelper],
  computed: {
    ...mapGetters(['cart', 'count', 'subtotal'])
  },
  head () {
    return {
      title: 'Корзина',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ''
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: ''
        },
        {
          hid: 'robots',
          name: 'robots',
          content: 'noindex, nofollow'
        }
      ],
      link: [
        { rel: 'canonical', href: '/' }
      ]
    }
  },
  methods: {
    ...mapActions(['fetchCart', 'removeProduct']),
    imgUrl (productId, imgName) {
      return this.url() + `/assets/images/products/${productId}/${imgName}`
    },
    getImgSrc (product) {
      let cover = this.coverImg(product)
      return cover
    },
    checkValue (c) {
      if (typeof c.qty === 'string') {
        c.qty = c.qty.replace(/^\.|[^\d.]|\.(?=.*\.)|^0+(?=\d)/g, '')
      }
      if ((typeof c.qty === 'string' && !c.qty.length) || c.qty === 0) {
        c.qty = 1
      }
      this.cangeQtyOfProduct(c.npp, c.qty)
    },
    redirectToIndex () {
      this.$router.push('/')
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.getCart()
    window.$('#cartIsEmpty').modal({
      opacity: 1,
      ready: function (el) {
        window.$('.overlay').fadeIn(500)
      },
      complete: function () {
        window.$('.overlay').fadeOut(500)
      }
    })
  },
  watch: {
    cart () {
      this.cart && !this.cart.length && window.$('#cartIsEmpty').modal('open')
    }
  }
}
</script>

<style>
  .img_holder {
    height: auto;
    width: 80px;
  }
  #cartIsEmpty {
    max-width: 400px;
  }
  #cartIsEmpty .modal-foot .modal-close {
    padding: 0 50px;
  }
  #cartIsEmpty .modal-foot {
    text-align: center;
  }
  #cartIsEmpty .modal-head {
    padding: 25px 15px;
    text-align: center;
  }
  .resetCart, .back {
    text-transform: none;
    margin: 0 5px;
  }
  .back {
    background-color: #dcdcdc;
  }
  .back:hover {
    background-color: #ada6a6;
    color: #ffffff;
  }
  .resetCart {
    background-color: rgba(232, 122, 0, 0.51);
  }
  .resetCart:hover {
    background-color: rgb(232, 122, 0, 0.3);
  }
</style>
