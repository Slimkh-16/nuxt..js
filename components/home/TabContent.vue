<template>
  <div class="tab-content">
    <div v-show="activeTab === '1'" class="tab-pane">
      <div class="row" v-if="goldCats">
        <router-link v-for="goldCat in goldCats" :key="goldCat.id" :to="goldCat.alias" class="col l3 m4 s6 catalog-item">
          <span class="catalog-item__img">
            <img :src="getImgSrc(goldCat)" :alt="goldCat.locale.name">
          </span>
          <span>{{goldCat.locale.name}}</span>
        </router-link>
      </div>
    </div>
    <div v-show="activeTab === '2'" class="tab-pane">
      <div class="row" v-if="silverCats">
        <router-link v-for="silverCat in silverCats" :key="silverCat.id" :to="silverCat.alias" class="col l3 m4 s6 catalog-item">
          <span class="catalog-item__img">
            <img :src="getImgSrc(silverCat)" :alt="silverCat.locale.name">
          </span>
          <span>{{silverCat.locale.name}}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ImageHelper from '../../helpers/ImageHelper'
export default {
  props: ['activeTab', 'silverCats', 'goldCats'],
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

