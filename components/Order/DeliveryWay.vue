<template>
  <div class="delivery-container">
    <!-- Самовывоз со склада перевозчика Most-Express -->
    <div class="delivery-place active" v-if="delivery_data">
      <div class="row">
        <div v-if="delivery_data && delivery_data.area" class="col l12 s12">
          <span class="label-field fz18">Область:</span>
          <p>{{delivery_data && delivery_data.area}}</p>
        </div>
        <div v-if="delivery_data && delivery_data.town" class="col l12 s12">
          <span class="label-field fz18">Город:</span>
          <p>{{delivery_data && delivery_data.town}}</p>
        </div>
        <template v-if="order_delivery_method.id !== 2">
          <div v-if="delivery_data && delivery_data.address" class="col l12 s12">
            <span class="label-field fz18">Пункт самовывоза:</span>
            <p v-html="delivery_data && delivery_data.address"></p>
          </div>
        </template>
        <template v-else>
          <div v-if="delivery_data && delivery_data.address" class="col l12 s12">
            <span class="label-field fz18">Адрес доставки:</span>
            <p v-html="delivery_data && delivery_data.address"></p>
          </div>
        </template>
        <div v-if="delivery_data && delivery_data.additionally && delivery_data.additionally.length" class="col l12 s12">
          <span class="label-field fz18">Дополнительно:</span>
          <p>{{delivery_data && delivery_data.additionally}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['delivery_data', 'order_delivery_method']
}
</script>

<style>
  .label-field.fz18 {
    font-weight: 600;
  }

  .fz18 + p {
    font-size: 16px;
  }
</style>
