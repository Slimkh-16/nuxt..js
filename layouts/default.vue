<template>
  <div class="page-wr">
    <div class="wrapper">
      <!-- navigation -->
      <app-header
        :menu="menu"
        :count="count"
      />
      <!-- /navigation -->

      <!-- displays the page component -->
      <nuxt/>
    </div>
    <!-- footer -->
    <app-footer :menu="menu"></app-footer>
    <empty-cart></empty-cart>
    <div class="go-top" @click="scrollTo"></div>
  </div>
</template>

<script>
import AppHeader from '~/components/Header1.vue'
import AppFooter from '~/components/Footer.vue'
import EmptyCart from '~/components/EmptyCart.vue'
import { mapGetters, mapActions } from 'vuex'
import Cart from '../helpers/Cart'

export default {
  computed: {
    ...mapGetters(['menu', 'count'])
  },
  methods: {
    ...mapActions(['fetchMenu', 'fetchBreadcrumbs', 'fetchSettings', 'fetchContentPage', 'getStone', 'fetchRedirects']),
    redirectToMainPage () {
      this.$route.fullPath === '/checkout' && this.$router.push('/')
    },
    scrollTo () {
      let scrollStep = -window.scrollY / (200 / 15)
      let scrollInterval = setInterval(function () {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep)
        } else clearInterval(scrollInterval)
      }, 15)
    }
  },
  mixins: [Cart],
  components: {
    AppHeader,
    AppFooter,
    'empty-cart': EmptyCart
  },
  async asyncData ({store}) {
    // await store.dispatch('fetchRedirects')
    return {
      menu: await store.dispatch('fetchMenu')
    }
  },
  beforeCreate () {
    this.$store.dispatch('fetchMenu')
    this.$store.dispatch('fetchSettings')
    this.$store.dispatch('fetchContentPage')
    this.$store.dispatch('getStone')
  },
  mounted () {
    this.getCart()
    window.$('.materialboxed').materialbox()
    window.$('#cartIsEmptyIndex').modal({
      opacity: 1,
      ready: function (el) {
        window.$('.overlay').fadeIn(500)
      },
      complete: function () {
        window.$('.overlay').fadeOut(500)
      }
    })
    var scrollTopPosition
    window.addEventListener('scroll', function () {
      scrollTopPosition = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop)
      if (scrollTopPosition > 50) {
        window.$('.go-top').addClass('visible')
      } else {
        window.$('.go-top').removeClass('visible')
      }
    })
  }
}
</script>

<style>

</style>
