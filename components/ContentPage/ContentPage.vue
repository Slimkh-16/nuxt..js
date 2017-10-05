<template>
  <div class="clearfix">
    <div class="container">
      <breadcrumbs :breadcrumbs="{way: [{name: `${currentPage && currentPage.title}`}]}"></breadcrumbs>
      <div class="content">
        <div class="big-heading">{{currentPage && currentPage.title}}</div>
        <div class="body-page" v-html="currentPage && currentPage.body"></div>
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
/* import urlsList from '../../helpers/urlsList' */

export default {
  /* beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter', to, from, next)
    let url = to.path.slice(-1) === '/' ? to.path.slice(0, to.path.length - 1) : to.path
    let redirectUrl = to.path.slice(-1) === '/' ? to.path.slice(0, to.path.length - 1) : false
    if (urlsList.contentPagesList[url]) {
      console.log('is content Page', redirectUrl)
      redirectUrl && next(redirectUrl)
    } else {
      console.log('not content Page')
      next({
        name: 'category_alias',
        params: {'category_alias': to.path}
      })
    }
  }, */
  components: {
    'breadcrumbs': Breadcrumbs,
    'content-slider': PhotoSlider
  },
  /* beforeCreate () {
    this.$router.push('/')
  }, */
  mixins: [SeoHelper, ImageHelper],
  computed: {
    ...mapGetters(['contentPages']),
    currentPage () {
      const currentPage = this.contentPages.length && this.contentPages.filter((obj) => obj.alias === this.$route.params.alias)[0]
      /* currentPage && this.setMetaIntoPage({
        title: currentPage.seo_title,
        keywords: currentPage.seo_keywords,
        description: currentPage.seo_description,
        canonical: currentPage.seo_canonical,
        robots: currentPage.seo_robots
      }) */
      return currentPage
    }
  },
  head () {
    return {
      title: this.currentPage && this.currentPage.seo_title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.currentPage && this.currentPage.seo_description
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.currentPage && this.currentPage.seo_keywords
        },
        {
          hid: 'robots',
          name: 'robots',
          content: this.currentPage && this.currentPage.seo_robots
        }
      ],
      link: [
        { rel: 'canonical', href: this.currentPage && this.currentPage.seo_canonical }
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

