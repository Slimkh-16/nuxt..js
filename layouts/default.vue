<template>
  <div>
    <!-- navigation -->
    <app-header
      :menu="menu"
      :count="count"
    />
    <!-- /navigation -->

    <!-- displays the page component -->
    <nuxt/>

  </div>
</template>

<script>
import AppHeader from '~/components/Header1.vue'
import { mapGetters, mapActions } from 'vuex'
import Cart from '../helpers/Cart'

export default {
  computed: {
    ...mapGetters(['menu', 'count'])
  },
  methods: {
    ...mapActions(['fetchMenu', 'fetchBreadcrumbs', 'fetchSettings', 'fetchContentPage', 'getStone', 'fetchRedirects'])
  },
  mixins: [Cart],
  components: {
    AppHeader
  },
  asyncData () {
    return Promise.all([
      this.fetchMenu(),
      this.fetchSettings(),
      this.fetchContentPage(),
      this.fetchRedirects(),
      this.getStone()
    ]).then(resp => console.log('>>> ', resp))
  },
  mounted () {
    this.fetchMenu()
    this.getCart()
    this.fetchSettings()
    this.fetchContentPage()
    this.fetchRedirects()
    this.getStone()
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
