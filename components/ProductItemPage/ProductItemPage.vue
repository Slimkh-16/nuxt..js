<template>
  <div>
    <product :product="this.product"></product>

    <how-buy></how-buy>

    <related-products v-if="product.hasOwnProperty('id')" :product="product"></related-products>

    <you-seen :viewedProducts="viewedProducts"></you-seen>

    <seo-section v-if="product.hasOwnProperty('id')" 
      :seoIntrotext="product.locale.formatted_introtext"
      :seoContent="product.locale.seo_description || product.locale.formatted_description"
      :seoTitle="product.locale.seo_title"
    ></seo-section>


  </div>
</template>

<script>
  import SeoSection from '../../components/SeoSection.vue'
  import { mapActions, mapGetters } from 'vuex'
  import ProductHelper from '../../helpers/ProductHelper.js'
  import SeoHelper from '../../helpers/SeoHelper.js'
  import HowBuy from './HowBuy.vue'
  import YouSeen from './YouSeen.vue'
  import Product from './Product.vue'
  import RelatedProducts from './RelatedProducts.vue'

  export default {
    components: {
      'product': Product,
      'how-buy': HowBuy,
      'related-products': RelatedProducts,
      'you-seen': YouSeen,
      'seo-section': SeoSection
    },
    mixins: [ProductHelper, SeoHelper],
    methods: {
      ...mapActions(['fetchProduct', 'emptyProduct']),
      fetchFromSession (res) {
        !this.isInSession(res) && this.setProductIdInSession(res)
        this.viewedProductsFromSession = this.$ls.get('viewedProductsObj') || []
        this.viewedProducts = this.viewedProductsFromSession ? this.viewedProductsFromSession.filter(p => p.id !== this.product.id) : []
        console.log(this.viewedProducts)
      }
    },
    data () {
      return {
        viewedProducts: []
      }
    },
    computed: {
      ...mapGetters(['product'])
    },
    async asyncData ({store, route}) {
      let res = await store.dispatch('fetchProduct', route.path)
      console.log(res)
      return {res}
    },
    head () {
      // this.fetchFromSession(this.product)
      return {
        title: this.product && this.product.locale.seo_title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.product && this.product.locale.seo_description
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: this.product && this.product.locale.seo_keywords
          },
          {
            hid: 'robots',
            name: 'robots',
            content: this.product && this.product.locale.seo_robots
          }
        ],
        link: [
          { rel: 'canonical', href: this.product && this.product.locale.seo_canonical }
        ]
      }
    },
    beforeMount () {
      this.fetchFromSession(this.product)
      // window.$('ul.tabs').tabs()
    }
    /* beforeDestroy () {
      this.emptyProduct()
    } */
  }
</script>
