<template>
  <!--store section-->
  <section v-if="oneStore" class="store-one-page">
    <div class="container">
      <breadcrumbs :breadcrumbs="{way: [{name: 'Наши магазины', template: 'stores'}, {name: `Ювелирный магазин в городе ${oneStore.name}`}]}"></breadcrumbs>
      <div class="big-heading">Ювелирный магазин в городе {{oneStore.name}}</div>
    </div>
    <div class="store-one-map">
      <div id="map-store" data-coords="33, 35"></div>
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
                <br><a href="#">Как заказать?</a></div>
              <div class="store-one-map-info-item store-one-map-info-item--with-icon">
                <i class="icon-shema"></i>
                <a data-fancybox :href="store.photo">
                  Смотреть схему помещения
                </a>
              </div>
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
    ...mapActions(['fetchAffiliates']),
    mapFunctionStore () {
      var coords = window.$('#map-store').data('coords').split(',')
      var bounds = new window.google.maps.LatLngBounds()
      var myCenter = new window.google.maps.LatLng(coords[0], coords[1])
      var mapOptions = {
        zoom: 11,
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
      map.fitBounds(bounds)
      map.panToBounds(bounds)
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
  head () {
    return {
      title: this.affiliates ? this.affiliates.seo_title : this.postMeta && this.postMeta.seo_title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.affiliates ? this.affiliates.seo_title && this.affiliates.seo_title.replace(/<\/?p>/g, '') : this.postMeta && this.postMeta.seo_description && this.postMeta.seo_description.replace(/<\/?p>/g, '')
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.affiliates ? this.affiliates.seo_title : this.postMeta && this.postMeta.seo_keywords
        },
        {
          hid: 'robots',
          name: 'robots',
          content: this.affiliates ? this.affiliates.seo_title : this.postMeta && this.postMeta.seo_robots
        }
      ],
      link: [
        { rel: 'canonical', href: `${this.postMeta && this.postMeta.seo_canonical}` }
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
