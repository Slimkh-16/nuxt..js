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
    ...mapActions(['fetchAffiliates', 'getMeta', 'meta'])
  },
  async asyncData ({store, route}) {
    let res = []
    res = await Promise.all([
      store.dispatch('getMeta', route.fullPath),
      store.dispatch('fetchAffiliates', route.path)
    ])
    // seo module
    if (res[0] && res[0].locale) {
      let r = res[0]
      return {
        seo_title: r.locale.title,
        seo_keywords: r.locale.keywords,
        seo_description: r.locale.description,
        seo_canonical: r.locale.canonical,
        seo_robots: r.locale.srobots,
        seoTitle: r.locale.title,
        seoContent: r.locale.content
      }
      // seo from category
    } else {
      return {
        seo_title: 'Eurogold',
        seo_keywords: null,
        seo_description: null,
        seo_canonical: null,
        seo_robots: 'index, follow',
        seoTitle: '',
        seoContent: ''
      }
    }
  },
  head () {
    return {
      title: this.seo_title && this.seo_title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.seo_description && this.seo_description
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.seo_keywords && this.seo_keywords
        },
        {
          hid: 'robots',
          name: 'robots',
          content: this.seo_robots && this.seo_robots
        }
      ],
      link: [
        { rel: 'canonical', href: this.seo_canonical && this.seo_canonical }
      ]
    }
  },
  mounted () {
    this.fetchAffiliates()
  }
}
</script>
