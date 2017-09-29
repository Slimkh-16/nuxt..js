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
      <div :id="galleryClassName" class="product-slider-nav" v-if="object && object.images.length > 1">
        <a
          v-for="(img, index) in object.images"
          v-bind:key="index"
          href="#" :style="object && `background:url('${imgUrl(object.id, img.name)}') no-repeat`"
          :data-image="object && imgUrl(object.id, img.name)"
          :data-zoom-image="object && imgUrl(object.id, img.name)" class="elevatezoom-gallery"></a>
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
    currImg () {
      let cover = this.coverImg(this.object)
      return cover ? this.imgUrl(this.object.id, cover.name) : ''
    }
  }
}
</script>

