<template>
  <div id="tab1" class="tab-box">
    <p>{{introtext}}</p>
    <p>{{description}}</p>
  </div>
</template>
<script>
export default {
  props: {
    product: Object
  },
  computed: {
    description () {
      return this.product && this.product.locale ? this.product.locale.formatted_description : ''
    },
    introtext () {
      return this.product && this.product.locale ? this.product.locale.formatted_introtext : ''
    }
  }
}
</script>
