<template>
  <section v-if="isRelatedProducts" class="related-product popular-product">
    <div class="heading-section align-center"><span>Подобные товары</span></div>
    <div class="container">

      <div class="related-product-slider">
        <div class="swiper-container">
          <div class="swiper-wrapper" :style="alignCenter">
            <div v-for="related in product.relateds" class="swiper-slide">
              <router-link :to="'/' + related.related_product.alias" class="new-product-item">
                <div class="new-product-item__img">
                  <img :src="imgUrl(related.related_product.id, related.related_product.cover ? related.related_product.cover.name : '')" alt="">
                  <div class="view-prod">смотреть<span class="icon-right"></span></div>
                </div>
                <div class="new-product-item__txt">
                  <div class="prod-txt">{{related.related_product.locale.name}}</div>
                  <div class="prod-price"><b>{{related.related_product.price}}</b>&nbsp;грн.</div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="swiper-button-prev"><span class="icon-left-big"></span></div>
        <div class="swiper-button-next"><span class="icon-right-big"></span></div>
      </div>

    </div>
  </section>
</template>

<script>
  import Swiper from 'swiper'
  import ImageHelper from '../../helpers/ImageHelper'
  export default {
    props: {
      product: Object
    },
    mounted () {
      this.swiperSliders()
    },
    data () {
      return {
        alignCenter: ''
      }
    },
    mixins: [ImageHelper],
    methods: {
      imgUrl (productId, imgName) {
        return this.url() + `/assets/images/products/${productId}/${imgName}`
      },
      swiperSliders () {
        let isLoop = this.product.relateds && this.product.relateds.length > 4
        isLoop ? this.alignCenter = '' : this.alignCenter = 'justify-content: center;'
        this.swiperNewNew = new Swiper('.related-product .swiper-container', {
          loop: isLoop,
          speed: 1000,
          slidesPerView: 4,
          spaceBetween: 0,
          nextButton: '.related-product .swiper-button-next',
          prevButton: '.related-product .swiper-button-prev',
          breakpoints: {
            992: {
              slidesPerView: 3
            },
            767: {
              slidesPerView: 2
            },
            500: {
              slidesPerView: 1
            }
          }
        })
        return [this.swiperNewNew]
      }
    },
    computed: {
      isRelatedProducts: function () {
        return this.product.relateds && this.product.relateds.length
      }
    },
    watch: {
      product () {
        setTimeout(() => {
          this.swiperNewNew && this.swiperNewNew.classNames.length && this.swiperNewNew.destroy(true, true)
          this.swiperSliders()
        }, 500)
      }
    }
  }
</script>

<style>
  .related-product-slider 
  {
    position: relative;
  }
</style>
