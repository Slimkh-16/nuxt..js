<template>
  <!--news section-->
  <section class="news-page">
    <div class="container">
      <!-- <div class="big-heading">Новости</div -->>
      <div class="clearfix">
        <div class="catalog-body-filter__right">
          <pagination :current-page="postsCurrentPage" :total-items="postsTotal" :itemsPerPage="postsLimit" @page-changed="pageChanged"></pagination>
          <br>
        </div>
      </div>
      <news-box
        :posts="posts"
        :routeName="'news-alias'"
      ></news-box>
      <div class="clearfix">
        <div class="catalog-body-filter__right">
          <pagination :current-page="postsCurrentPage" :total-items="postsTotal" :itemsPerPage="postsLimit" @page-changed="pageChanged"></pagination>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ImageHelper from '../../helpers/ImageHelper'
import Pagination from '../../components/Pagination.vue'
import NewsBox from '../../components/NewsBox.vue'

export default {
  mixins: [ImageHelper],
  components: {
    'pagination': Pagination,
    'news-box': NewsBox
  },
  computed: {
    ...mapGetters(['posts', 'postsCurrentPage', 'postsLimit', 'postsTotal', 'meta'])
  },
  methods: {
    ...mapActions(['fetchPosts']),
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
    this.$store.dispatch('fetchPosts')
    this.$store.dispatch('getMeta', this.$route.fullPath)
  },
  async asyncData ({store, route}) {
    return {
      postsMeta: await store.dispatch('getMeta', route.fullPath)
    }
  },
  head () {
    return {
      title: (this.meta && this.meta.locale.title) || (this.postsMeta && this.postsMeta.locale.title),
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
    setTimeout(() => {
      this.masonry()
    }, 1000)
  },
  beforeDestroy () {
    window.$('.grid').masonry('destroy')
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
