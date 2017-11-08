<template>
  <!--store section-->
  <section v-if="oneStore" class="store-one-page">
    <div class="container">
      <breadcrumbs :breadcrumbs="{way: [{name: 'Наши магазины', template: 'stores'}, {name: `Ювелирный магазин в городе ${oneStore.name}`}]}"></breadcrumbs>
      <div class="big-heading">Ювелирный магазин в городе {{oneStore.name}}</div>
    </div>
    <div class="store-one-map">
      <div id="map-store"></div>
    </div>
    <!-- store -->
    <div v-for="store in oneStore.affiliates" v-bind:key="store.id" :data-store="store.id" :data-coord-x="store.lat" :data-coord-y="store.lng" class="store-one clearfix" :id="store.alias">
      <div class="container">
        <div class="row">
          <div class="col l6 s12">
            <div class="store-one-map-info">
              <div class="store-one-map-info__head">{{store.locale.name}}</div>
              <div class="store-one-map-info-item">
                <ul>
                  <li><span>Адрес:</span>{{store.locale.address}}</li>
                  <li><span>Телефон:</span><a :href="`tel:${phoneForHtml(store.phonenumber)}`">{{store.phonenumber}}</a></li>
                  <li>
                    <span>Режим работы:</span>
                    {{store.locale.schedule}}
                    <br>{{store.locale.schedule_weekend}}
                    <br><br>Выходные: {{store.locale.weekend}}
                  </li>

                </ul>
              </div>
              <div class="store-one-map-info-item store-one-map-info-item--with-icon"><i class="icon-ico-dostavka-page-02"></i>Перед визитом в магазин, сделайте заказ понравившегося изделия на сайте. Это гарантирует наличие нужного украшения в магазине в течении 2-5 дней.
                <br><router-link to='/help'>Как заказать?</router-link></div>
              <!--<div v-if="store.photo.length" class="store-one-map-info-item store-one-map-info-item&#45;&#45;with-icon">-->
                <!--<i class="icon-shema"></i>-->
                <!--<a data-fancybox :href="store.photo">-->
                  <!--Смотреть схему помещения-->
                <!--</a>-->
              <!--</div>-->
            </div>
          </div>
          <div class="col l6 s12">
            <div class="store-one-info">
              <div class="store-one-map-info__head">{{store.locale.name}}</div>
              <p v-html="store.locale.description"></p>
              <p>Для удобства клиентов «Eurogold» работает услуга заказа украшений в интернет-магазине <a target="_blank" href="http://www.eurogold.ua">www.eurogold.ua</a>, где представлена полная коллекция ювелирной сети. Выбирайте желаемое украшение в онлайн-каталоге, и мы в кратчайшие сроки доставим заказ в магазин, где можно примерить изделие перед покупкой.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Breadcrumbs from '../../../components/Breadcrumbs'
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      oneStore: null
    }
  },
  computed: {
    ...mapGetters(['affiliates'])
  },
  methods: {
    ...mapActions(['fetchAffiliates', 'getMeta']),
    mapFunctionStore () {
      if (window.$('.store-one').length < 2) {
        var myCenter = new window.google.maps.LatLng(window.$('.store-one').data('coord-x'), window.$('.store-one').data('coord-y'))
      }
      var bounds = new window.google.maps.LatLngBounds()
      var mapOptions = {
        zoom: 10,
        center: myCenter,
        scrollwheel: false,
        disableDefaultUI: false,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP
      }
      var map = new window.google.maps.Map(document.getElementById('map-store'), mapOptions)
      window.$('.store-one').each(function (i, item) {
        this.coordX = parseFloat(window.$(this).data('coord-x'))
        this.coordY = parseFloat(window.$(this).data('coord-y'))
        this.storeId = parseFloat(window.$(this).data('store'))
        var myLatlng = new window.google.maps.LatLng(this.coordX, this.coordY)
        var marker = new window.google.maps.Marker({
          position: myLatlng,
          map: map,
          icon: '/images/map.png',
          dataId: this.storeId
        })
        var loc = new window.google.maps.LatLng(marker.position.lat(), marker.position.lng())
        bounds.extend(loc)
        marker.addListener('click', function () {
          map.setZoom(14)
          map.setCenter(marker.getPosition())
          var idStore = this.dataId
          setTimeout(function () {
            window.$('body, html').animate({ scrollTop: window.$('.store-one[data-store="' + idStore + '"]').offset().top - window.$('.header').height() + 50 }, 500)
          }, 1000)
        })
      })
      if (window.$('.store-one').length > 1) {
        map.fitBounds(bounds)
        map.panToBounds(bounds)
      }
    },
    phoneForHtml (phone) {
      return phone.replace(/[+/.\s()-]/g, '')
    }
  },
  components: {
    'breadcrumbs': Breadcrumbs
  },
  mounted () {
    /**
     * if we came from stores page - set oneStore, else fetch all affiliates
     */
    if (this.affiliates) {
      this.oneStore = this.affiliates[this.$route.params.alias]
    } else {
      this.fetchAffiliates().then(resp => {
        this.oneStore = resp[this.$route.params.alias]
      })
    }
  },
  async asyncData ({store, route}) {
    let res = []
    res = await Promise.all([
      store.dispatch('getMeta', route.path),
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
        seo_title: 'Eurogold | storeone',
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
  watch: {
    oneStore () {
      setTimeout(() => {
        this.oneStore.alias && this.mapFunctionStore()
      }, 500)
    }
  }
}
</script>
