<template>
  <div class="way-pay">
    <div class="order-head">Способ оплаты</div>
      <p class="fz18">{{orderObj.order_payment_method && orderObj.order_payment_method.name}}</p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['orderObj'])
  }
}
</script>
