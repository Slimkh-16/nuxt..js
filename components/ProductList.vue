<template>
  <div class="product-list">
    <transition name="isProducts">
    <div v-if="productList.length"  class="row">
      <div v-for="product in productList" class="col l4 m6 s6" :key="product.alias">
        <router-link :to="{ name: 'Product page', params: { alias: product.alias }}" class="product-item">
          <div class="product-item__img">
            <div :class="productStatusClass(product)">{{productStatusName(product)}}</div>
            <div v-if="product.video" class="product-with-video span icon-video"></div>
            <img :src="getImgSrc(product)" alt="">
          </div>
          <div class="product-item__txt">
            <div class="prod-txt" v-if="product.locale.name">{{ product.locale.name}}</div>
            <div class="prod-price"><b>{{product.total_price.toFixed(2)}}</b>&nbsp;грн.</div>
          </div>
          <div class="product-item__hover-box">
            <table>
              <tbody>
                <tr v-for="f in productFeature(product)" :key="f.id">
                  <td>{{f.filter && f.filter.locale.name}}:</td>
                  <td>{{filterName(f)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </router-link>
      </div>
    </div>
    </transition>
    <transition name="notProducts">
      <div v-if="!productTotal && loaded" class="row">
        <div class="delivery-head prodNotFound">
          Товаров с данными  параметрами фильтрации не существует
        </div>
      </div>
    </transition>
    <div class="bottom-pagintaion clearfix">
      <div class="catalog-body-filter__right">
        <pagination :current-page="productListPage" :total-items="productTotal" :itemsPerPage="limit" @page-changed="pageChanged"></pagination>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from './Pagination.vue'
import ImageHelper from '../helpers/ImageHelper'
import ProductHelper from '../helpers/ProductHelper'

export default {
  props: ['loaded', 'productList', 'productListPage', 'productTotal', 'limit'],
  mixins: [ImageHelper, ProductHelper],
  methods: {
    imgUrl (productId, imgName) {
      return this.url() + `/assets/images/products/${productId}/${imgName}`
    },
    getImgSrc (product) {
      let cover = this.coverImg(product)
      return cover
    },
    pageChanged (page) {
      this.$emit('pageChanged', page)
    }
  },
  components: {
    'pagination': Pagination
  },
  mounted () {
    window.$('.prod-txt').liTextLength({
      length: 70,
      afterLength: '...',
      fullText: false
    })
  }
}
</script>

<style>
  .product-list {
    position: relative;
  }

  .product-list .bottom-pagintaion {
    position: absolute;
    bottom: -30px;
    right: 0;
  }

  .product-status--sale {
    font-size: 11px;
  }

  .product-status--hit, .product-status--action {
    color: #fff;
  }
  .product-status--hit:before {
    color: #777cce;
  }
  .product-status--action:before {
    color: rgb(232, 122, 0);
  }
  .prodNotFound {
    padding: 35px 25px;
    text-align: center;
    font-size: 28px;
  }
  .notProducts-enter-active{
    transition: opacity .5s
  }
  .notProducts-enter, .notProducts-leave-to {
    opacity: 0
  }
  .isProducts-enter-active {
    transition: opacity .5s
  }
  .isProducts-enter, .isProducts-leave-to {
    opacity: 0
  }
  .product-item__hover-box table td {
    width: 50%;
  }
  .product-item__hover-box td {
    vertical-align: bottom;
  }
</style>
