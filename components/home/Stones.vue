<template>
  <div v-if="stone" class="catalog-tab-cont">
    <div class="small-heading">Украшения с камнями</div>
    <router-link :to="{ name: 'StonePage', params: { alias: stoneOne.alias }}" :key="stoneOne.id" v-for="stoneOne in stone" class="catalog-item">
      <span  class="catalog-item__img">
        <img :src="stoneOne.image_url" :alt="stoneOne.locale.name">
      </span>
      <span>{{stoneOne.locale.name}}</span>
    </router-link>
    <div v-if="stone.length > 8" class="clearfix align-center"><a href="#" class="all-butt waves-effect waves-light"> Все камни</a></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['stone'])
  }
}
</script>
