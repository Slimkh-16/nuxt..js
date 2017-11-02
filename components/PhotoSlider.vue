<template>
  <!-- SLIDER -->
    <div :class="`product-slider ${className}`">
      <div v-if="productStatusName && productStatusClass" class="" :class="productStatusClass">{{productStatusName}}</div>
      <div class="product-big-images">
        <span v-if="video" data-target="modal-video" class="modal-trigger video-view icon-video">Видео обзор</span>
        <img
          class="zoomImg"
          :src="currImg()"
          :data-zoom-image="currImg()"
          alt="">
      </div>
      <div :id="galleryClassName" class="product-slider-nav" v-if="object.images">
        <a
          v-for="(img, key) in object.images"
          v-bind:key="index"
          href="#" :style="object && `background:url('${img.image_url}') no-repeat`"
          :data-image="object && img.image_url"
          :data-zoom-image="object && img.image_url" class="elevatezoom-gallery"></a>
      </div>
    </div>
</template>

<script>
import ImageHelper from '../helpers/ImageHelper'

export default {
  props: ['className', 'object', 'pathOfImgUrl', 'productStatusClass', 'productStatusName', 'video', 'galleryClassName'],
  mixins: [ImageHelper],
  methods: {
    imgUrl (postId, imgName) {
      return this.url() + `/assets/images/${this.pathOfImgUrl}/${postId}/${imgName}`
    },
    currImg (product) {
      if (this.object) {
        let cover = this.coverImg(this.object)
        return cover
      }
    }
  }
}
</script>

