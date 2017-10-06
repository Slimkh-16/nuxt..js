<template>
  <section class="check-out page-with-breadcrumbs">
    <div class="container">
      <div class="check-out-container">
        <br>
        <div class="heading-big">Заказ</div>
        <p class="orderStatus">Статус заказа:  <span class="bold">{{orderObj && orderObj.status && orderObj.status.name}}</span></p>
        <div class="row">
          <!-- order -->
          <order></order>
          <div class="col l8 m6 s12">
            <div class="check-out-box">
              <!-- user-info -->
              <user-info
                :locale="locale"
              ></user-info>
              <!-- delivery -->
              <delivery
                :locale="locale"
              ></delivery>
              <!-- pay-way -->
              <pay-way></pay-way>
              
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
import {mapGetters} from 'vuex'
import SeoHelper from '../../helpers/SeoHelper'

export default {
  components: {
    'order': Order,
    'user-info': UserInfo,
    'delivery': Delivery,
    'pay-way': PayWay
  },
  data () {
    return {
      locale: 'ru'
    }
  },
  mixins: [SeoHelper],
  computed: {
    ...mapGetters(['orderObj'])
  },
  mounted () {
    this.setMetaIntoPage({})
  }
}
</script>

<style>
  .orderStatus {
    font-size: 20px;
  }

  .orderStatus .bold {
    font-weight: bold;
  }
</style>

