<template>
  <div class="user-info">
    <div class="customer">
      <div class="user-info-row"><span>Мобильный телефон:</span>
        <div :data-error="errorMsg" :data-recheck="recheckMsg" class="input-field required-field">
          <input v-model="сustomer.phone" type="tel" required data-validate="phone" data-name="сustomer.phone">
        </div>
      </div>
      <div class="user-info-row"><span>Имя получателя:</span>
        <div :data-error="errorMsg" :data-recheck="recheckMsg" class="input-field required-field">
          <input v-model="сustomer.name" type="text" required data-name="сustomer.name">
        </div>
      </div>
      <div class="user-info-row"><span>Email:</span>
        <div :data-error="errorMsg" :data-recheck="recheckMsg" class="input-field required-field">
          <input v-model="сustomer.email" type="email" required data-validate="email" data-name="сustomer.email">
        </div>
      </div>
    </div>
    <span class="other-peop" @click="toggleUserInfoForm()">Получатель заказа другой человек?</span>
    <div class="user-info-form" :class="{ 'active': userInfoForm }">
      <div :data-error="errorMsg" :data-recheck="recheckMsg" class="input-field required-field"><span class="label-field">Мобильный телефон</span>
        <input v-model="recipient.phone" type="tel" required data-validate="phone" data-name="recipient.phone">
      </div>
      <div :data-error="errorMsg" :data-recheck="recheckMsg" class="input-field required-field"><span class="label-field">Имя получателя</span>
        <input v-model="recipient.name" type="text" required data-name="recipient.name">
      </div>
      <div :data-error="errorMsg" :data-recheck="recheckMsg" class="input-field required-field"><span class="label-field">Email</span>
        <input v-model="recipient.email" type="email" required data-validate="email" data-name="recipient.email">
      </div>
    </div>
  </div>
</template>
<script>
import MsgHelper from '../../helpers/MsgHelper'
import {mapActions, mapGetters} from 'vuex'

export default {
  props: ['locale', 'userInfoForm', 'toggleUserInfoForm'],
  mixins: [MsgHelper],
  data () {
    return {
      сustomer: {
        phone: null,
        name: null,
        email: null
      },
      recipient: {
        phone: null,
        name: null,
        email: null
      },
      сustomerPhone: '',
      сustomerName: '',
      сustomerEmail: '',
      recipientPhone: '',
      recipientName: '',
      recipientEmail: '',
      customerInfo: {}
    }
  },
  computed: {
    ...mapGetters(['checkoutObj']),
    errorMsg () {
      return this.locale ? this.localesRequiredField[this.locale] : ''
    },
    recheckMsg () {
      return this.locale ? this.localesErrorText[this.locale] : ''
    }
  },
  methods: {
    ...mapActions(['setCheckoutProps']),
    mark (object, expression, isEmpty) {
      if (isEmpty) {
        object.closest('.required-field').removeClass('recheck').addClass('error')
        return false
      } else if (expression) {
        object.closest('.required-field').removeClass('error').addClass('recheck')
        return false
      } else {
        object.closest('.required-field').removeClass('error').removeClass('recheck')
        return true
      }
    },
    checkRequiredField (e) {
      let target = window.$(e.target)
      let str = target.attr('data-name')
      let reg
      let notErrors
      switch (target.attr('data-validate')) {
        case undefined:
          notErrors = target.val().length ? this.mark(target, window.$.trim(target.val()).length === 0) : this.mark(target, false, true)
          break
        case 'phone':
          reg = /[0-9 -()+]{10}$/
          notErrors = target.val().length ? this.mark(target, !reg.test(window.$.trim(target.val()))) : this.mark(target, false, true)
          break
        case 'email':
          reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
          notErrors = target.val().length ? this.mark(target, !reg.test(window.$.trim(target.val()))) : this.mark(target, false, true)
          break
      }
      if (notErrors) {
        let keys = str.split('.')
        this[keys[0]][keys[1]] = target.val()
        this.setCheckoutProps({customer: this.сustomer, recipient: this.recipient})
      }
    }
  },
  mounted () {
    window.$('.user-info .input-field input').on('blur', this.checkRequiredField)
    window.$('input[data-validate="phone"]').mask('+380(99)999 99 99')
  },
  beforeDestroy () {
    window.$('.user-info .input-field').off('blur', this.checkRequiredField)
  }
}
</script>
