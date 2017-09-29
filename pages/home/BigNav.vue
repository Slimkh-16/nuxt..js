<template>
  <section v-if="topCats" class="big-nav">
    <div class="container">
      <div class="row">
        <div v-for="cat in topCats" :key="cat.id" class="col l6 s12">
          <div class="big-nav-item">
            <div class="big-nav__txt">
              <nuxt-link :to="cat.alias">
                <span>{{cat.locale.name.slice(0, 25) + (cat.locale.name.length > 25 ? '...' : '')}}</span>
                </nuxt-link>
                <br>
              <div class="big-nav__det">{{cat.locale.formatted_description.slice(0, 25) + '...'}}</div>
            </div>
            <div class="big-nav__img">
              <nuxt-link :to="cat.alias"><img :src="getImgSrc(cat)" :alt="cat.locale.name"></nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ImageHelper from '../../helpers/ImageHelper'
export default {
  props: ['topCats'],
  mixins: [ImageHelper],
  methods: {
    imgUrl (postId, imgName) {
      return this.url() + `/assets/images/categories/${postId}/${imgName}`
    },
    getImgSrc (post) {
      let cover = this.coverImg(post)
      return cover ? this.imgUrl(post.id, cover.name) : ''
    }
  }
}
</script>
