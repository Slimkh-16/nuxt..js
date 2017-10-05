<template>
  <div id="tab2" class="tab-box">
    <div class="images-gallery">
      <img v-for="img in product.images" :src="imgUrl(product.id, img.name)" class="materialboxed"/>
    </div>
    <iframe class="productVideo" v-if="product.video" width="100%" height="500" :src="product.video"></iframe>
  </div>
</template>

<script>
  import ImageHelper from '../../helpers/ImageHelper'
  export default {
    props: {
      product: Object
    },
    mixins: [ImageHelper],
    methods: {
      imgUrl (productId, imgName) {
        return this.url() + `/assets/images/products/${productId}/${imgName}`
      }
    },
    mounted () {
      window.$('.materialboxed').materialbox()
    }
  }
</script>

<style>
  @media only screen and (max-width: 768px) {  
    .productVideo {
      height: 350px;
    }
  }
</style>

