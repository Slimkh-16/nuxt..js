<template>
  <section class="check-out page-with-breadcrumbs">
    <div class="container">
      <breadcrumbs :breadcrumbs="{way: [{name: `Оформление заказа`}]}"></breadcrumbs>
      <div class="check-out-container">
        <div class="heading-big">Оформление заказа</div>
        <div class="row">
          <!-- order -->
          <order></order>
          <div class="col l8 m6 s12">
            <div class="check-out-box">
              <p>После отправки заказа ожидайте звонок нашего менеджера в течение одного часа (в рабочее время нашего магазина).</p>

              <!-- user-info -->
              <user-info
                :locale="locale"
                :userInfoForm="userInfoForm"
                :toggleUserInfoForm="() => userInfoForm = !userInfoForm"
              ></user-info>
              <!-- delivery -->
              <delivery
                :locale="locale"
                :error="deliveryError"
              ></delivery>
              <!-- pay-way -->
              <pay-way
                :validePurchase="validePurchase"
              ></pay-way>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Order from './Order'
import UserInfo from './UserInfo'
import Delivery from './Delivery'
import PayWay from './PayWay'
import {mapGetters, mapActions} from 'vuex'
import Breadcrumbs from '../../components/Breadcrumbs'
import Cart from '../../helpers/Cart'
import SeoHelper from '../../helpers/SeoHelper'

export default {
  components: {
    'order': Order,
    'user-info': UserInfo,
    'delivery': Delivery,
    'pay-way': PayWay,
    'breadcrumbs': Breadcrumbs
  },
  data () {
    return {
      locale: 'ru',
      userInfoForm: false,
      deliveryError: false
    }
  },
  mixins: [Cart, SeoHelper],
  computed: {
    ...mapGetters(['checkoutObj', 'cart', 'subtotal'])
  },
  methods: {
    ...mapActions(['confirmOrder']),
    validePurchase () {
      if (this.userInfoForm) {
        /**
         * verify all fields (customer and recipient)
        */
        window.$('.user-info input').blur()
        if (window.$('.user-info .error').length || window.$('.user-info .recheck').length) {
          window.$('html, body').animate({scrollTop: 0}, 500, 'swing')
        } else {
          this.verifyCheckoutObj()
        }
      } else {
        /**
         * verify only customer data
        */
        window.$('.customer input').blur()
        if (window.$('.customer .error').length || window.$('.customer .recheck').length) {
          window.$('html, body').animate({scrollTop: 0}, 500, 'swing')
        } else {
          this.verifyCheckoutObj()
        }
      }
    },
    verifyCheckoutObj () {
      let checkoutObj = {...this.checkoutObj, cart: this.cart, total: this.subtotal, size: this.size}
      if (checkoutObj.order_delivery_method_id === '2') {
        window.$('.delivery-place .input-field input').blur()
        if (window.$('.delivery-place .input-field .error').length) {
          window.$('html, body').animate({scrollTop: 0}, 500, 'swing')
          return false
        }
      }
      if (!checkoutObj.delivery_data || !checkoutObj.delivery_data.address) {
        this.deliveryError = true
        window.$('html, body').animate({scrollTop: 0}, 500, 'swing')
        return
      } else {
        this.deliveryError = false
      }
      /**
      * send to back
      */
      !this.isBlockButton && this.confirmOrder(checkoutObj)
        .then(res => {
          this.$router.push(`/order/${res}`)
          this.resetCart()
        })
        .catch(error => console.log(error))
      this.isBlockButton = true
    }
  },
  head () {
    return {
      title: 'Оформление заказа',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ''
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: ''
        },
        {
          hid: 'robots',
          name: 'robots',
          content: 'noindex, nofollow'
        }
      ],
      link: [
        { rel: 'canonical', href: '/' }
      ]
    }
  }
}
</script>
