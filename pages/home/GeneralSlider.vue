<template>
  <section v-if="slider" class="general-slider">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="slide in sortedSlider" :key="slide.id" :style="`background:${getStylesByKey('background_colour', slide)} url(${getStylesByKey('background_image', slide, true)}) no-repeat 50% 50%; background-size: cover`" class="swiper-slide">
          <div class="container">
            <div data-swiper-parallax="-100" class="general-slider-caption">
              <div class="caption-head" :style="`color:${getStylesByKey('title_colour', slide)}`">{{slide && slide.locale && slide.locale.title}}</div>
              <span v-html="slide && slide.locale && slide.locale.description" :style="`color:${getStylesByKey('description_colour', slide)}`"></span>
              <nuxt-link :to="slide.alias" class="btn waves-effect waves-light">Смотреть каталог</nuxt-link>
            </div>
            <img :src="getStylesByKey('image', slide, true)" alt="" data-swiper-parallax="-300" class="general-slide-img">
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['slider'],
  data () {
    return {
      defaultSliderStyle: {
        background_colour: '#3a2720',
        background_image_url: '',
        description_colour: '#fff',
        title_colour: '#fff'
      }
    }
  },
  computed: {
    sortedSlider () {
      return this.slider.sort((c, n) => c.sort - n.sort)
    }
  },
  methods: {
    initSlider () {
      let swiper = new window.Swiper('.general-slider .swiper-container', {
        loop: true,
        autoplay: 4000,
        speed: 2000,
        pagination: '.general-slider .swiper-pagination',
        paginationClickable: true,
        parallax: true
      })
      return swiper
    },
    getStylesByKey (key, slide, bool) {
      if (bool) {
        return slide[key] && slide[key].length ? slide[`${key}_url`] : this.defaultSliderStyle[`${key}_url`]
      } else {
        return slide[key].length ? slide[key] : this.defaultSliderStyle[key]
      }
    }
  },
  watch: {
    slider () {
      this.$nextTick(() => {
        this.initSlider()
      })
    }
  }
}
</script>

<style>

  .general-slider-caption {
    max-width: 50%;
  }

  .general-slider .swiper-slide {
    height: 530px;
  }

  @media only screen and (max-width: 599px) {
    .general-slider .swiper-slide {
      height: 335px;
    }
    .wrapper {
      padding-top: 64px;
    }
    .general-slider-caption {
      max-width: 100%;
    }
  }

  @media only screen and (max-width: 470px) {
    .wrapper {
      padding-top: 45px;
    }
  }

</style>

