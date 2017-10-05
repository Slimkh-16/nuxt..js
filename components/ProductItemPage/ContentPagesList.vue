<template>
  <div v-if="pagesList.length" class="product-instruction">
    <ul>
      <li v-for="page in pagesList" :key="page.id">
        <router-link :to="{ name: 'Content page' , params : {alias : page.alias}}">{{page.title}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { pagesUrlList } from '../../enum'

export default {
  data () {
    return {
      pagesUrlList
    }
  },
  computed: {
    ...mapGetters(['contentPages']),
    pagesList () {
      return this.contentPages && this.contentPages.length ? this.contentPages.filter((p) => this.pagesUrlList.some((url) => url === p.alias)) : []
    }
  }
}
</script>
