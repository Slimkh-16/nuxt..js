<template>
  <section class="result-search">
    <div class="container">
      <div class="big-heading">{{$route.query.search}}</div>
      <div class="search-resuld-nav"><span>Найдено товаров: {{searchProductTotal}}</span>
        <found-in-categories
          :list="searchProductList"
        ></found-in-categories>
      </div>
      <div class="clearfix">
        <div class="catalog-body-filter__right">
          <pagination :current-page="searchProductListPage" :total-items="searchProductTotal" :itemsPerPage="searchProductLimit" @page-changed="pageChanged"></pagination>
        </div>
      </div>
      <div class="search-body">
        <div class="product-list">
          <div class="row">
            <product-list
                :loaded="loaded"
                :productListPage="searchProductListPage"
                :productTotal="searchProductTotal"
                :productList="searchProductList"
                :limit="searchProductLimit"
                @pageChanged="pageChanged"
              ></product-list>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProductList from '../../components/ProductList.vue'
import {mapGetters, mapActions} from 'vuex'
import Pagination from '../../components/Pagination.vue'
import FoundInCategories from '../../components/FoundInCategories.vue'

export default {
  data () {
    return {
      loaded: true
    }
  },
  components: {
    'product-list': ProductList,
    'pagination': Pagination,
    'found-in-categories': FoundInCategories
  },
  computed: {
    ...mapGetters([
      'searchProductListPage',
      'searchProductTotal',
      'searchProductList',
      'searchProductLimit'
    ])
  },
  methods: {
    ...mapActions(['searchByString', 'resetSearch']),
    pageChanged (page) {
      this.searchByString([this.$route.query.search, {page, limit: 12}]).then(() => window.$('html, body').animate({scrollTop: 0}, 500))
    }
  },
  beforeMount () {
    this.searchByString([this.$route.query.search, {page: 1, limit: 12}]).then(() => window.$('html, body').animate({scrollTop: 0}, 500))
  },
  beforeDestroy () {
    this.resetSearch()
  },
  head () {
    return {
      title: 'Страница поиска',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ''
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: ''
        },
        {
          hid: 'robots',
          name: 'robots',
          content: 'noindex, nofollow'
        }
      ],
      link: [
        { rel: 'canonical', href: '/' }
      ]
    }
  },
  watch: {
    '$route' () {
      this.searchByString([this.$route.query.search, {page: 1, limit: 12}]).then(() => window.$('html, body').animate({scrollTop: 0}, 500))
    }
  }
}
</script>

<style>
  .search-body {
    padding-bottom: 65px;
  }
</style>

