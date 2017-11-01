<template>
  <div class="col l4 m6 s12 right">
    <div class="you-order">
      <div class="you-order__head">Ваш заказ</div>
      <no-ssr>
        <table>
          <tbody>
            <tr v-for="c in cart" :data-product-id="c.id" v-bind:key="c.alias">
              <td class="img_holder align-center">
                <img :src="getImgSrc(c)" :alt="c.locale.name">
              </td>
              <td>
                <router-link :to="`/${c.alias}`">
                  {{c.locale.name}}
                  <span v-if="c.size">Размер: {{c.size}}</span>
                  <span v-if="c.npp.length">Артикул: {{c.npp}}</span>
                  <span>Кол-во: {{c.qty}}</span>
                  <span v-if="c.grave.text">Гравировка: {{c.grave.text}}</span>
                  <span v-if="c.grave.style_id">Стиль гравировки: {{graveStyleList[+c.grave.style_id - 1]}}</span>
                  <span v-if="c.qty" class="price-order"><b>{{c.totalPrice || c.computedPrice}}</b> грн.</span>
                </router-link>
              </td>
            </tr>
            <tr class="box-order-row">
              <td class="align-center"><img src="/static/images/box.jpg" alt=""></td>
              <td>Подарочная упаковка<span class="price-order"><b>0</b> грн.</span></td>
            </tr>
            <tr class="order-total-price">
              <td v-if="subtotal" colspan="2"><span class="price-order">Итого:<b> {{ subtotal }} </b> грн. </span></td>
            </tr>
          </tbody>
        </table>
      </no-ssr>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ImageHelper from '../../helpers/ImageHelper'
import { graveStyleList } from '../../enum'

export default {
  data () {
    return {
      graveStyleList: graveStyleList
    }
  },
  mixins: [ImageHelper],
  computed: {
    ...mapGetters(['cart', 'subtotal'])
  },
  methods: {
    imgUrl (productId, imgName) {
      return this.url() + `/assets/images/products/${productId}/${imgName}`
    },
    getImgSrc (product) {
      let cover = this.coverImg(product)
      return cover
    }
  },
  watch: {
    cart (products) {
      !products.length && this.$router.push('/')
    }
  }
}
</script>

<style>
  .img_holder {
    width: 80px;
    height: auto;
  }
</style>
