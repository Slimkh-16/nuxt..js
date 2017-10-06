<template>
  <div class="pay-container">
    <div data-pay-way="3" class="pay-place" :class="{ 'active': payMethod === '3' }">
      <div class="rassrochka">
        <img src="./../../assets/images/ras.png" alt="">
        <em>Рассрочка 0%</em>
        <span>Укажите срок кредитования и вы получите расчет количества платежей и сумму ежемесячного платежа.</span>
      </div>
      <div class="bank-pay-datail">
        <div class="bank-pay-col"><span class="label-field">Месяцев</span>
          <app-select name="month" v-model="month" @change="calcPayment()">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="3">4</option>
          </app-select>
        </div>
        <div class="bank-pay-col"><span class="label-field">Платежей</span>
          <div class="input-field">
            <input type="text" v-model="payments" required>
          </div>
        </div>
        <div class="bank-pay-col"><span class="label-field">Ежемесячный платеж, руб.</span>
          <div class="bank-total">3928.48</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Select from '../../components/Select.vue'

export default {
  props: ['payMethod'],
  components: {
    'app-select': Select
  },
  data () {
    return {
      month: '1',
      payments: 7
    }
  },
  methods: {
    calcPayment () {
      console.log('calcPayment')
    }
  }
}
</script>
