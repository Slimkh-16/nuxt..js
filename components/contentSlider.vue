<template>
  <!-- SLIDER -->
    <div class="content-slider" v-if="object">
      <div class="swiper-container gallery-top">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="l in object.images">
            <img :src="imgUrl(object.id, l.name)" :alt="l.alt">
          </div>
        </div>
      </div>
      <div class="swiper-container gallery-thumbs">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="b in object.images"  :style="object && `background:url('${imgUrl(object.id, b.name)}') no-repeat`">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import ImageHelper from '../helpers/ImageHelper'

export default {
  props: ['object', 'pathOfImgUrl'],
  mixins: [ImageHelper],
  data () {
    return {
      galleryThumbs: undefined,
      galleryTop: undefined
    }
  },
  methods: {
    imgUrl (postId, imgName) {
      return this.url() + `/assets/images/${this.pathOfImgUrl}/${postId}/${imgName}`
    },
    currImg () {
      let cover = this.coverImg(this.object)
      return cover ? this.imgUrl(this.object.id, cover.name) : ''
    },
    initSlider () {
      this.galleryTop = new window.Swiper('.gallery-top', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 10
      })
      this.galleryThumbs = new window.Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
      })
      this.galleryTop.params.control = this.galleryThumbs
      this.galleryThumbs.params.control = this.galleryTop
    }
  },
  mounted () {
    this.initSlider()
  }
}
</script>
<style>
  .content-slider {
    height: 500px;
  }
  .gallery-top {
    height: 85%;
    width: 100%;
  }
  .gallery-top .swiper-slide img {
    margin: 0 auto;}
  .gallery-thumbs {
    height: 15%;
    box-sizing: border-box;
    padding: 10px 0;
  }
  .gallery-thumbs .swiper-slide {
    width: 150px;
    height: 100%;
    opacity: 0.4;
    background-size:cover !important;
    background-position: 50% 50% !important;
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
</style>
