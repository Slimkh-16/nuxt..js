<template>
  <div>
    product
    <!-- <product :product="this.product"></product> -->

    <!-- <how-buy></how-buy>

    <related-products v-if="product.hasOwnProperty('id')" :product="product"></related-products>

    <you-seen :viewedProducts="viewedProducts"></you-seen>

    <seo-section v-if="product.hasOwnProperty('id')" 
      :seoIntrotext="product.locale.formatted_introtext"
      :seoContent="product.locale.seo_description || product.locale.formatted_description"
      :seoTitle="product.locale.seo_title"
    ></seo-section> -->


  </div>
</template>

<script>
  /* import { HowBuy, YouSeen, Product, RelatedProducts } from '../ProductItemPage'
  import SeoSection from '../../components/SeoSection.vue' */
  import { mapActions, mapGetters } from 'vuex'
  import ProductHelper from '../../helpers/ProductHelper.js'
  import SeoHelper from '../../helpers/SeoHelper.js'

  export default {
    /* components: {
      'product': Product,
      'how-buy': HowBuy,
      'related-products': RelatedProducts,
      'you-seen': YouSeen,
      'seo-section': SeoSection
    }, */
    mixins: [ProductHelper, SeoHelper],
    methods: {
      ...mapActions(['fetchProduct', 'emptyProduct'])
      /* fetchFromSession (res) {
        !this.isInSession(res) && this.setProductIdInSession(res)
        this.viewedProductsFromSession = this.$ls.get('viewedProductsObj') || []
        this.viewedProducts = this.viewedProductsFromSession ? this.viewedProductsFromSession.filter(p => p.id !== this.product.id) : []
      } */
    },
    data () {
      return {
        viewedProducts: []
      }
    },
    computed: {
      ...mapGetters(['product'])
    },
    mounted () {
      /* this.fetchProduct()
        .then(res => {
          this.fetchFromSession(res)
        })
        .catch((error) => {
          console.log(error)
          this.$router.push('/notFound')
        })
      window.$('ul.tabs').tabs() */
    }
    /* beforeDestroy () {
      this.emptyProduct()
    } */
  }
</script>
