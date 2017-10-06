<template>
  <div v-if="orderObj.client" class="user-info">
    <div class="user-info-row">
      <span>Мобильный телефон:</span>
      <div>
        {{orderObj.client.phone}}
      </div>
    </div>
    <div class="user-info-row">
      <span>Имя получателя:</span>
      <div>
        {{orderObj.client.first_name}}
      </div>
    </div>
    <div class="user-info-row">
      <span>Email:</span>
      <div>
        {{orderObj.client.email}}
      </div>
    </div>
    <span v-if="orderObj.recipient" class="other-peop">Получатель заказа:</span>
    <br>
    <div v-if="orderObj.recipient" class="active">
      <div class="user-info-row">
        <span>Мобильный телефон:</span>
        <div>
          {{orderObj.recipient && orderObj.recipient.phone}}
        </div>
      </div>
      <div class="user-info-row">
        <span>Имя получателя:</span>
        <div>
          {{orderObj.recipient && orderObj.recipient.first_name}}
        </div>
      </div>
      <div class="user-info-row">
        <span>Email:</span>
        <div>
          {{orderObj.recipient && orderObj.recipient.email}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['orderObj'])
  }
}
</script>
