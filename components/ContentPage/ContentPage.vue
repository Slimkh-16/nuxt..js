<template>
  <div class="clearfix">
    <div class="container">
      <breadcrumbs :breadcrumbs="{way: [{name: `${currentPage && currentPage.title}`}]}"></breadcrumbs>
      <div class="content">
        <!-- <div class="big-heading">{{currentPage && currentPage.locale.title}}</div> -->
        <div class="body-page" v-html="currentPage && currentPage.locale.body"></div>
      </div>
    </div>
    <content-slider
      :object="currentPage"
      :pathOfImgUrl="'posts'"
    ></content-slider>
  </div>
</template>

<script>
import Breadcrumbs from '../../components/Breadcrumbs'
import SeoHelper from '../../helpers/SeoHelper'
import ImageHelper from '../../helpers/ImageHelper'
import { mapGetters } from 'vuex'
import PhotoSlider from '../../components/contentSlider.vue'

export default {
  components: {
    'breadcrumbs': Breadcrumbs,
    'content-slider': PhotoSlider
  },
  mixins: [SeoHelper, ImageHelper],
  computed: {
    ...mapGetters(['contentPages']),
    currentPage () {
      const currentPage = this.contentPages.length && this.contentPages.filter((obj) => obj.alias === this.$route.path.slice(1, this.$route.path.length))[0]
      console.log('currentPage', currentPage, this.contentPages)
      return currentPage
    }
  },
  /* asyncData ({store}) {
    store.dispatch('fetchContentPage')
    console.log('store.state.contentPages ', store.state.contentPages)
  },
  beforeCreate () {
    console.log('this.contentPages ', this.contentPages)
    console.log('this.currentPage ', this.currentPage)
  }, */
  head () {
    return {
      title: this.currentPage && this.currentPage.locale.seo_title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.currentPage && this.currentPage.locale.seo_description
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.currentPage && this.currentPage.locale.seo_keywords
        },
        {
          hid: 'robots',
          name: 'robots',
          content: this.currentPage && this.currentPage.locale.seo_robots
        }
      ],
      link: [
        { rel: 'canonical', href: this.currentPage && this.currentPage.locale.seo_canonical }
      ]
    }
  },
  methods: {
    imgUrl (postId, imgName) {
      return this.url() + `/assets/images/posts/${postId}/${imgName}`
    },
    currImg () {
      let cover = this.coverImg(this.currentPage)
      return cover ? this.imgUrl(this.currentPage.id, cover.name) : ''
    }
  }
}
</script>

