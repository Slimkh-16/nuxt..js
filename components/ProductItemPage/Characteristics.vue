<template>
  <div id="tab3" class="tab-box">
    <div class="product-char">
      <div v-if="prodFeature.length" class="product-char-row" v-for="f in prodFeature">
        <div class="product-char-col"><span>{{f.filter.locale.name}}</span></div>
        <div class="product-char-col">{{filterName(f)}}</div>
      </div>
      <div v-if="prodFeature && prodFeature.length > 8" class="all-char js_all_char">Все характеристики</div>
    </div>
  </div>
</template>

<script>
import ProductHelper from '../../helpers/ProductHelper'

export default {
  mixins: [ProductHelper],
  props: {
    product: Object
  },
  computed: {
    prodFeature () {
      return this.productCharacteristic(this.product)
    }
  }
}
</script>
