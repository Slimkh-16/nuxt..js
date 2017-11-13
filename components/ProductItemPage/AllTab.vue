<template>
  <div id="tab1" class="tab-box">
    <div class="row">
      <div class="col l5 m12 s12">
        <characteristics
          :product="product"
        >
        </characteristics>
        <div v-if="review && review.length" class="product-tab-head">Отзывы</div>
        <div v-else class="product-tab-head">Здесть пока нет отзывов</div>
        <div v-if="review && review.length" v-for="rewiew_one in review" class="testi-item">
          <div class="testi-item__txt">
            {{rewiew_one.formatted_body}}
            <div class="testi-author">— {{rewiew_one.name}}<span>{{filterData(rewiew_one.created_at)}}</span></div>
          </div>
        </div>
      </div>
      <div class="col l7 m12 s12">
        <p>{{introtext}}</p>
        <p>{{description}}</p>
        <photo-video :product="product"></photo-video>
      </div>
    </div>
  </div>
</template>
<script>
import Characteristics from './Characteristics.vue'
import PhotoVideo from './PhotoVideo.vue'
import {mapGetters} from 'vuex'
export default {
  props: {
    product: Object
  },
  components: {
    'characteristics': Characteristics,
    'photo-video': PhotoVideo
  },
  computed: {
    ...mapGetters(['review']),
    description () {
      return this.product && this.product.locale ? this.product.locale.formatted_description : ''
    },
    introtext () {
      return this.product && this.product.locale ? this.product.locale.formatted_introtext : ''
    }
  }
}
</script>
