<template>
  <section v-show="viewedProducts.length" class="you-view popular-product">
    <div class="heading-section align-center"><span>Вы смотрели</span></div>

    <div class="container">
      <div class="you-view-product-slider">
        <div class="swiper-container">
          <div class="swiper-wrapper" :style="alignCenter">
            <router-link v-for="product in viewedProducts" :to="'/' + product.alias" class="new-product-item swiper-slide" key="product.id">
              <div class="new-product-item__img">
                <img :src="imgUrl(product.id, product.cover ? product.cover.name : product.images.length ? product.images[0].name : '')" alt="">
                <div class="view-prod">смотреть<span class="icon-right"></span></div>
              </div>
              <div class="new-product-item__txt">
                <div class="prod-txt">{{product.locale.name}}</div>
                <div class="prod-price"><b>{{product.price}}</b>&nbsp;грн.</div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="swiper-button-prev"><span class="icon-left-big"></span></div>
        <div class="swiper-button-next"><span class="icon-right-big"></span></div>
      </div>
    </div>
  </section>
</template>

<script>
  import ImageHelper from '../../helpers/ImageHelper'
  /* import Swiper from 'swiper' */

  export default {
    props: ['viewedProducts'],
    mixins: [ImageHelper],
    data () {
      return {
        alignCenter: ''
      }
    },
    methods: {
      imgUrl (productId, imgName) {
        return this.url() + `/assets/images/products/${productId}/${imgName}`
      },
      swiperSliders () {
        let isLoop = this.viewedProducts && this.viewedProducts.length > 8
        isLoop ? this.alignCenter = '' : this.alignCenter = 'justify-content: center;'
        this.swiperView = new window.Swiper('.you-view-product-slider .swiper-container', {
          loop: isLoop,
          speed: 1000,
          slidesPerView: 8,
          spaceBetween: 0,
          nextButton: '.you-view-product-slider .swiper-button-next',
          prevButton: '.you-view-product-slider .swiper-button-prev',
          breakpoints: {
            992: {
              slidesPerView: 5
            },
            767: {
              slidesPerView: 3
            },
            500: {
              slidesPerView: 1
            }
          }
        })
        return [this.swiperView]
      }
    },
    mounted () {
      window.$('.prod-txt').liTextLength({
        length: 70,
        afterLength: '...',
        fullText: false
      })
      this.swiperSliders()
      console.log('swiperSliders')
    }
    /* watch: {
      viewedProducts () {
        setTimeout(() => {
          this.swiperView && this.swiperView.classNames.length && this.swiperView.destroy(true, true)
          this.swiperSliders()
        }, 500)
      }
    } */
  }
</script>

<style>
  .you-view-product-slider {
    position: relative;
  }
</style>
