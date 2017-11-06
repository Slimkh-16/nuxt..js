<template>
  <!--article section-->
  <section class="news-page news-page--articles">
    <div class="container">
      <div class="big-heading">Статьи и обзоры</div>
      <div class="clearfix">
        <div class="catalog-body-filter__right">
          <pagination :current-page="articlesCurrentPage" :total-items="articlesTotal" :itemsPerPage="articlesLimit" @page-changed="pageChanged"></pagination>
          <br>
        </div>
      </div>
      <article-box
        :posts="articles"
        :routeName="'articles-alias'"
      ></article-box>
      <div class="clearfix">
        <div class="catalog-body-filter__right">
          <pagination :current-page="articlesCurrentPage" :total-items="articlesTotal" :itemsPerPage="articlesLimit" @page-changed="pageChanged"></pagination>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ImageHelper from '../../helpers/ImageHelper'
import Pagination from '../../components/Pagination.vue'
import ArticleBox from '../../components/NewsBox.vue'

export default {
  mixins: [ImageHelper],
  components: {
    'pagination': Pagination,
    'article-box': ArticleBox
  },
  computed: {
    ...mapGetters(['articles', 'articlesCurrentPage', 'articlesLimit', 'articlesTotal', 'meta'])
  },
  methods: {
    ...mapActions(['fetchArticles']),
    masonry () {
      let $grid = window.$('.grid').masonry({
        itemSelector: '.grid-item',
        gutter: 30
      })
      setTimeout(() => {
        $grid.masonry('layout')
      }, 100)
    },
    pageChanged (page) {
      this.fetchPosts({page}).then((res) => {
        window.$('.grid').masonry('destroy')
        this.masonry()
      })
    }
  },
  beforeCreate () {
    this.$store.dispatch('fetchArticles')
    this.$store.dispatch('getMeta', this.$route.fullPath)
  },
  async asyncData ({store, route}) {
    await store.dispatch('fetchArticles')
    return {
      postsMeta: await store.dispatch('getMeta', route.fullPath)
    }
  },
  head () {
    return {
      title: (this.meta && this.meta.locale.title) || (this.postsMeta && this.postsMeta.locale.title) || 'Eurogold',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: (this.meta && this.meta.locale.description) || (this.postsMeta && this.postsMeta.locale.description)
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: (this.meta && this.meta.locale.keywords) || (this.postsMeta && this.postsMeta.locale.keywords)
        },
        {
          hid: 'robots',
          name: 'robots',
          content: (this.meta && this.meta.locale.robots) || (this.postsMeta && this.postsMeta.locale.robots)
        }
      ]
    }
  },
  mounted () {
    this.masonry()
  }
}
</script>

<style>
  .news-item__img img {
    width: 100%;
  }
  .grid-item.news-item {
    display: inline-block;
    vertical-align: top;
  }
</style>
