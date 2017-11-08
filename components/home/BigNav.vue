<template>
  <section v-if="topCats" class="big-nav">
    <div class="container">
      <div class="row">
        <div v-for="cat in topCats" :key="cat.id" class="col l6 s12">
          <div class="big-nav-item">
            <div class="big-nav__txt">
              <router-link :to="cat.alias">
                <span>{{cat.locale.name.slice(0, 25) + (cat.locale.name.length > 25 ? '...' : '')}}</span>
                </router-link>
                <br>
              <div class="big-nav__det">{{cat.locale.formatted_description.slice(0, 25) + '...'}}</div>
            </div>
            <div class="big-nav__img">
              <router-link :to="cat.alias"><img :src="getImgSrc(cat)" :alt="cat.locale.name"></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ImageHelper from '../../helpers/ImageHelper.js'
export default {
  props: ['topCats'],
  mixins: [ImageHelper],
  methods: {
    imgUrl (postId, imgName) {
      return this.url() + `/assets/images/categories/${postId}/${imgName}`
    },
    getImgSrc (post) {
      let cover = this.coverImg(post)
      return cover
    }
  }
}
</script>
