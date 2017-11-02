<template>
  <div>
     <!--general-slider-->
    <general-slider
      :slider="slider"
    />

    <!--big nav-->
    <big-nav
      :topCats="top_cats"
    />

    <!--catalog-tab-->
    <catalog-tab
      :silverCats="silver_cats"
      :goldCats="gold_cats"
    />

    <!--new product-->
    <products-slider
      :title="'Новинки ювелирного магазина'"
      :products="new_products"
      :id="'newProductsId'"
    />

    <!--testimonials section-->
    <section v-if="last_reviews && last_reviews.length" class="testimonials-section">
      <div class="container">
        <div class="heading-section"><span>Отзывы наших покупателей</span></div>
        <reviews-box
          :reviews="last_reviews"
          :lang="'ru'"
          :isMain="true"
        />
        <div class="align-center"><router-link :to="{ name: 'Reviews' }" class="all-testi big-nav__det">Читать все отзывы</router-link></div>
      </div>
    </section>

    <!--popular product-->
    <products-slider
      :title="'Популярные ювелирные изделия'"
      :products="top_products"
      :id="'topProductsId'"
    />

    <!--news section-->
    <section v-if="latest_news && latest_news.length" class="news-section">
      <div class="container">
        <div class="heading-section align-center"><span>Новости и статьи</span></div>
        <news-box
          :posts="latest_news"
          :routeName="'news-alias'"
        />
        <div class="align-center"><router-link :to="{ name: 'news' }" class="all-testi big-nav__det">Еще новости</router-link></div>
      </div>
    </section>

    <!--social-section-->
    <section class="social-section">
      <div class="container">
        <div class="row">
          <div class="col m6 s12"><img src="../assets/images/soc1.jpg" alt=""></div>
          <div class="col m6 s12"><img src="../assets/images/soc2.jpg" alt=""></div>
        </div>
      </div>
    </section>

    <!--sec section-->
    <seo-section
      :seoContent="seo_content"
      :seoTitle="seo_title"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import GeneralSlider from '../components/home/GeneralSlider.vue'
import BigNav from '../components/home/BigNav.vue'
import CatalogTab from '../components/home/CatalogTab.vue'
import ProductsSlider from '../components/ProductsSlider.vue'
import ReviewsBox from '../components/ReviewsBox.vue'
import NewsBox from '../components/NewsBox.vue'
import SeoSection from '../components/SeoSection.vue'
import SeoHelper from '../helpers/SeoHelper'

export default {
  data () {
    return {
      seo_content: '',
      seo_title: ''
    }
  },
  components: {
    'general-slider': GeneralSlider,
    'big-nav': BigNav,
    'catalog-tab': CatalogTab,
    'products-slider': ProductsSlider,
    'reviews-box': ReviewsBox,
    'news-box': NewsBox,
    'seo-section': SeoSection
  },
  mixins: [SeoHelper],
  /* computed: {
    ...mapGetters(['top_products', 'new_products', 'latest_news', 'seo', 'last_reviews', 'slider', 'top_cats', 'silver_cats', 'gold_cats'])
  }, */
  methods: {
    ...mapActions(['getHome']),
    masonry () {
      let $grid = window.$('.grid').masonry({
        itemSelector: '.grid-item',
        gutter: 30
      })
      setTimeout(() => {
        $grid.masonry('layout')
      }, 500)
    }
  },
  beforeCreate () {
    this.$store.dispatch('getHome')
  },
  async asyncData ({store}) {
    let data = await store.dispatch('getHome')
    return {
      top_products: data.top_products,
      new_products: data.new_products,
      latest_news: data.latest_news,
      seo: data.seo,
      last_reviews: data.last_reviews,
      slider: data.slider,
      top_cats: data.top_cats,
      silver_cats: data.silver_cats,
      gold_cats: data.gold_cats
    }
  },
  head () {
    return {
      title: this.seo ? this.seo.locale.title : 'EUROGOLD',
      meta: [
        { hid: 'description', name: 'description', content: this.seo && this.seo.locale.description },
        { hid: 'keywords', name: 'keywords', content: this.seo && this.seo.locale.keywords },
        { hid: 'robots', name: 'robots', content: (this.seo && this.seo.locale.robots) || 'index, follow' }
      ]
    }
  },
  mounted () {
    /**
     * remove 'inner-page' class from body for navigation styles
    */
    window.$('body').removeClass('inner-page')
  },
  beforeDestroy () {
    /**
     * add 'inner-page' class to body for other page navigation styles
    */
    window.$('body').addClass('inner-page')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
