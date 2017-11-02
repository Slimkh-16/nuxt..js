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
    <div id="cartIsEmptyIndex" class="modal">
      <div class="modal-content"><span class="modal-action modal-close modal-close--top icon-cancel"></span>
        <div class="modal-head">Ваша козина пуста.</div>
        <div class="modal-foot clearfix">
          <span class="waves-effect waves-light modal-close" @click="redirectToMainPage()"><span class="icon-16-arrow-link"></span>Ок</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '~/components/Header1.vue'
import AppFooter from '~/components/Footer.vue'
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
    }
  },
  mixins: [Cart],
  components: {
    AppHeader,
    AppFooter
  },
  async asyncData ({store}) {
    return {
      menu: await store.dispatch('fetchMenu')
    }
  },
  beforeCreate () {
    this.$store.dispatch('fetchMenu')
    this.$store.dispatch('fetchSettings')
    this.$store.dispatch('fetchContentPage')
    this.$store.dispatch('fetchRedirects')
    this.$store.dispatch('getStone')
  },
  mounted () {
    /* this.fetchMenu() */
    this.getCart()
    /* this.fetchSettings() */
    /* this.fetchContentPage() */
    /* this.fetchRedirects() */
    /* this.getStone() */
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
  }
}
</script>

<style>

</style>
