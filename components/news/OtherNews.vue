<template>
  <div class="other-news">
    <div class="other-news__head">Другие новости:</div>
    <div v-for="post in (latestPosts && latestPosts.slice(0, 3))" :key="post.id" class="other-news-item">
      <router-link :to="{ name: 'news-alias', params: { alias: post.alias }}">
        <span class="other-news__img">
          <img :src="getImgSrc(post)" :alt="post.locale.title">
        </span>
        <span class="other-news__txt">{{post.locale.title}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import ImageHelper from '../../helpers/ImageHelper'

  export default {
    mixins: [ImageHelper],
    computed: {
      ...mapGetters(['latestPosts'])
    },
    methods: {
      ...mapActions(['fetchLatestPosts']),
      imgUrl (postId, imgName) {
        return this.url() + `/assets/images/posts/${postId}/${imgName}`
      },
      getImgSrc (post) {
        let cover = this.coverImg(post)
        return cover
      }
    },
    mounted () {
      this.fetchLatestPosts()
    }
  }
</script>
