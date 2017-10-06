<template>
  <div class="way-pay">
    <div class="order-head">Способ оплаты</div>
    <div class="radio-group">
      <div class="radio-item">
        <input 
          id="radio4" 
          type="radio" 
          checked 
          name="group2" 
          value="1" 
          v-model="payMethod" 
          class="with-gap"
          @change="() => setCheckoutProps({order_payment_method_id: payMethod})"
        >
        <label for="radio4">Банковской платежной картой (предоплата)</label>
      </div>
      <div class="radio-item">
        <input 
          id="radio5" 
          type="radio" 
          name="group2" 
          value="2" 
          v-model="payMethod" 
          class="with-gap"
          @change="() => setCheckoutProps({order_payment_method_id: payMethod})"
        >
        <label for="radio5">Наличными при получении</label>
      </div>
      <div class="radio-item">
        <input 
          id="radio6" 
          type="radio" 
          name="group2" 
          value="3" 
          v-model="payMethod" 
          class="with-gap"
          @change="() => setCheckoutProps({order_payment_method_id: payMethod})"
        >
        <label for="radio6">В кредит от ПриватБанка</label>
      </div>
    </div>
    <div class="finish-order"><a href="#" class="btn waves-effect waves-light" @click.prevent="validePurchase()">Подтвердить заказ</a>Нажимая кнопку Подтвердить заказ, вы соглашаетесь с условиями <a href="#">публичного договора поручения.</a></div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'

export default {
  props: ['validePurchase'],
  data () {
    return {
      payMethod: '1'
    }
  },
  methods: {
    ...mapActions(['setCheckoutProps'])
  },
  mounted () {
    this.setCheckoutProps({order_payment_method_id: this.payMethod})
  }
}
</script>
