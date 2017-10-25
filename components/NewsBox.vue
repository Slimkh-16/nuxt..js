<template>
  <div class="grid">
    <div v-for="post in posts" class="grid-item news-item" :key="post.id">
      <div class="news-item__img">
        <router-link :to="{ name: routeName, params: { alias: post.alias }}">
          <img :src="getImgSrc(post)" :alt="post.locale.title">
        </router-link>
      </div>
      <div class="news-item__txt"><span class="news-item__title">{{post.locale.title}}</span>
        <div class="over-txt" v-html="post.locale.body"></div>
        <br>
        <router-link :to="{ name: routeName, params: { alias: post.alias }}">
          читать далее <i class="icon-right"></i>
        </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import ImageHelper from '../helpers/ImageHelper'
export default {
  props: ['posts', 'routeName'],
  mixins: [ImageHelper],
  methods: {
    imgUrl (postId, imgName) {
      return this.url() + `/assets/images/posts/${postId}/${imgName}`
    },
    getImgSrc (post) {
      let cover = this.coverImg(post)
      return cover
    }
  },
  watch: {
    posts () {
      this.$nextTick(() => {
        setTimeout(() => {
          window.$('.over-txt').liTextLength({
            length: 140,
            afterLength: '...',
            fullText: false
          })
          window.$('.news-item__title').liTextLength({
            length: 100,
            afterLength: '...',
            fullText: false
          })
        }, 1000)
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.$('.over-txt').liTextLength({
        length: 140,
        afterLength: '...',
        fullText: false
      })
      window.$('.news-item__title').liTextLength({
        length: 100,
        afterLength: '...',
        fullText: false
      })
    })
  },
  beforeDestroy () {
    window.$('.grid').masonry('destroy')
  }
}
</script>

