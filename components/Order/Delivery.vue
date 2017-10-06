<template>
  <div class="way-delivery">
    <div class="order-head">Способ доставки</div>
    <div class="user-info-row">
      <p class="fz18">{{orderObj.order_payment_method && orderObj.order_delivery_method.name}}</p>
    </div>

    <!-- delivery-way -->
    <delivery-way
      :delivery_data="orderObj.delivery_data"
      :order_delivery_method="orderObj.order_delivery_method"
    ></delivery-way>

  </div>
</template>
<script>
import DeliveryWay from './DeliveryWay'
import { mapGetters } from 'vuex'

export default {
  components: {
    'delivery-way': DeliveryWay
  },
  computed: {
    ...mapGetters(['orderObj'])
  }
}
</script>

<style>
  .fz18 {
    font-size: 18px;
  }
</style>
