<template>
  <!--store section-->
  <section class="store-page">
    <div class="container">
      <div class="big-heading">Наши магазины</div>
      <div class="row">
        <div class="col s12">
          <div class="stores-cont">
            <div class="stores-list">
              <div class="stores-list__head">Адреса ювелирных магазинов сети Eurogold</div>
              <p>Смотрите подробную информацию о расположении наших ювелирных магазинов в Украине. Там же вы найдете подробное описание услуг каждого магазина телефоны и карту проезда.</p>
              <ul v-if="affiliates">
                <li v-for="(value, key) in affiliates" class="icon-ico-dostavka-page-02" v-bind:key="key">
                  <router-link :to="{ name: 'stores-alias', params: { alias: value.alias }}">
                    Ювелирный магазин в городе {{value.name}}
                    <i class="icon-arrow-right"></i>
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="stores-map"><img src="../../assets/images/store-map.png" alt=""></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters(['affiliates'])
  },
  methods: {
    ...mapActions(['fetchAffiliates'])
  },
  head () {
    return {
      title: this.meta && this.meta.locale.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: (this.meta && this.meta.locale.description) || (this.postsMeta && this.postsMeta.locale.description)
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: (this.meta && this.meta.locale.keywords) || (this.postsMeta && this.postsMeta.locale.keywords)
        },
        {
          hid: 'robots',
          name: 'robots',
          content: (this.meta && this.meta.locale.robots) || (this.postsMeta && this.postsMeta.locale.robots)
        }
      ]
    }
  },
  mounted () {
    this.fetchAffiliates()
  }
}
</script>
