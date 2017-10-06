<template>
  <div class="way-delivery">
    <div class="order-head">
      Способ доставки
      <p v-if="error">Не выбран пункт самовывоза</p>
      </div>
    <div class="radio-group">
      <div class="radio-item">
        <input id="radio1" type="radio" name="group" value="1" v-model="delWay" class="with-gap" @change="() => setCheckoutProps({order_delivery_method_id: delWay})">
        <label for="radio1">Самовывоз со склада перевозчика "Новая почта"</label>
      </div>
      <div class="radio-item">
        <input id="radio2" type="radio" name="group" value="2" v-model="delWay" class="with-gap" @change="() => setCheckoutProps({order_delivery_method_id: delWay})">
        <label for="radio2">Курьером Новой почты на дом</label>
      </div>
      <div class="radio-item">
        <input id="radio3" type="radio" name="group" value="3" v-model="delWay" class="with-gap" @change="() => setCheckoutProps({order_delivery_method_id: delWay})">
        <label for="radio3">Самовывоз из магазина сети Eurogold</label>
      </div>
    </div>

    <!-- delivery-way -->
    <delivery-way
      :delWay="delWay"
      :locale="locale"
    ></delivery-way>

  </div>
</template>
<script>
import DeliveryWay from './DeliveryWay'
import {mapActions} from 'vuex'

export default {
  props: ['locale', 'error'],
  data () {
    return {
      delWay: '1'
    }
  },
  components: {
    'delivery-way': DeliveryWay
  },
  methods: {
    ...mapActions(['setCheckoutProps'])
  },
  mounted () {
    this.setCheckoutProps({order_delivery_method_id: this.delWay})
  }
}
</script>

<style>
  .way-delivery .order-head p {
    font-size: 14px;
    color: #f00;
  }
</style>

