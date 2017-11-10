<template>
  <section v-show="products.length" class="popular-product" :id="id">
    <div class="heading-section align-center"><span>{{title}}</span></div>
    <div class="container">
      <div class="popular-product-slider">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div v-for="product in products" class="swiper-slide" :key="product.id">
              <router-link :to="'/' + product.alias" class="new-product-item">
                <div class="new-product-item__img">
                  <div v-if="product.video" class="product-with-video span icon-video"></div>
                  <!-- <img :src="imgUrl(product.id, product.cover ? product.cover.name : product.images && product.images.length ? product.images[0].name : '')" :alt="product.locale.name"> -->
                  <img :src="getImgSrc(product)" :alt="product.locale.name">
                  <div class="view-prod">смотреть<span class="icon-right"></span></div>
                </div>
                <div class="new-product-item__txt">
                  <div class="prod-txt">{{product.locale.name}}</div>
                  <div class="prod-price"><b>{{product.total_price}}</b>&nbsp; грн.</div>
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
  import ImageHelper from '../helpers/ImageHelper'

  export default {
    props: {
      products: Array,
      title: String,
      id: String
    },
    mixins: [ImageHelper],
    mounted () {
      window.$('.prod-txt').liTextLength({
        length: 70,
        afterLength: '...',
        fullText: false
      })
      if (this.products && this.products.length) {
        this.swiperSliders()
      }
    },
    data () {
      return {
        isProducts: false
      }
    },
    methods: {
      swiperSliders () {
        setTimeout(() => {
          window.$('.popular-product').each(function (i, item) {
            let container = window.$(item).find('.swiper-container')
            let slides = container.find('.swiper-slide')
            let isLoop = slides && slides.length > 4
            //            isLoop ? container.find('.swiper-wrapper').attr('style', '') : container.find('.swiper-wrapper').attr('style', 'justify-content: center;')
            const swiperNewNew = new window.Swiper(container, {
              loop: isLoop,
              speed: 1000,
              slidesPerView: 4,
              spaceBetween: 0,
              nextButton: window.$(item).find('.swiper-button-next'),
              prevButton: window.$(item).find('.swiper-button-prev'),
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
            return [swiperNewNew]
          })
        }, 500)
      },
      imgUrl (productId, imgName) {
        return this.url() + `/assets/images/products/${productId}/${imgName}`
      },
      getImgSrc (product) {
        let cover = this.coverImg(product)
        return cover
      }
    }
    /* watch: {
      products () {
        if (this.products && this.products.length) {
          this.swiperSliders()
        }
      }
    } */
  }
</script>

<style>
  .view-prod {
    background: #fff;
    padding: 3px 5px;
  }
  .view-prod [class*='icon-']:before {
    margin-right: 0px;
  }
</style>

