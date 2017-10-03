<template>
  <!--.news-page section-->
  <section class="news-page page-with-breadcrumbs">
    <div class="container">
      <breadcrumbs :breadcrumbs="{way: [{name: 'Новости', template: 'news'}, {name: `${post.title}`}]}"></breadcrumbs>
      <div class="news-one-container content">
        <div class="big-heading">{{post.title}}</div>
        <div class="relative-container">
          <img :src="getImgSrc(post)" align="right" class="newImg" :alt="post.title">
          <div v-html="post.body" class="post_body">
          </div>
          <other-news></other-news>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import OtherNews from '../../../components/news/OtherNews.vue'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { mapGetters, mapActions } from 'vuex'
import ImageHelper from '../../../helpers/ImageHelper'
import SeoHelper from '../../../helpers/SeoHelper'

export default {
  mixins: [ImageHelper, SeoHelper],
  computed: {
    ...mapGetters(['post'])
  },
  methods: {
    ...mapActions(['fetchOnePost']),
    imgUrl (postId, imgName) {
      return this.url() + `/assets/images/posts/${postId}/${imgName}`
    },
    getImgSrc (post) {
      let cover = this.coverImg(post)
      return cover ? this.imgUrl(post.id, cover.name) : ''
    },
    delTags (str) {
      return str.replace(/<\/?p>/g, '')
    },
    getPost () {
      this.fetchOnePost(this.$route.params.alias).then((res) => {
        this.setMetaIntoPage({
          title: this.delTags(res.seo_title),
          keywords: this.delTags(res.seo_keywords),
          description: this.delTags(res.seo_description),
          canonical: this.delTags(res.seo_canonical),
          robots: this.delTags(res.seo_robots)
        })
      })
    }
  },
  components: {
    'other-news': OtherNews,
    'breadcrumbs': Breadcrumbs
  },
  async asyncData ({store, route}) {
    return {
      postMeta: await store.dispatch('fetchOnePost', route.params.alias)
    }
  },
  head () {
    return {
      title: this.post ? this.post.seo_title : this.postMeta && this.postMeta.seo_title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post ? this.post.seo_title && this.post.seo_title.replace(/<\/?p>/g, '') : this.postMeta && this.postMeta.seo_description && this.postMeta.seo_description.replace(/<\/?p>/g, '')
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.post ? this.post.seo_title : this.postMeta && this.postMeta.seo_keywords
        },
        {
          hid: 'robots',
          name: 'robots',
          content: this.post ? this.post.seo_title : this.postMeta && this.postMeta.seo_robots
        }
      ],
      link: [
        { rel: 'canonical', href: `${this.postMeta && this.postMeta.seo_canonical}` }
      ]
    }
  },
  watch: {
    '$route' () {
      this.post.alias !== this.$route.params.alias && this.getPost()
    }
  }
}
</script>

<style>
  .newImg {
    max-width: 270px;
    max-height: 270px;
  }
</style>
