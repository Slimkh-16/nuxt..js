<template>
  <div class="delivery-container">
    <!-- Самовывоз со склада перевозчика Новая почта -->
    <div class="delivery-place" :class="{ 'active': delWay === '1' }">
      <div class="row">
        <div class="col l6 s12"><span class="label-field">Область:</span>
          <app-select name="areaCarrier" v-model="areaCarrier" :onChange="handleAreaCarrier">
            <option v-for="region in nova_poshta_regions" v-bind:key="region.id" :value="region.ref">{{region.name}}</option>
          </app-select>
        </div>
        <div class="col l6 s12"><span class="label-field">Город:</span>
          <app-select name="cityCarrier" v-model="cityCarrier" :onChange="handleCityCarrier">
            <option v-for="city in nova_poshta_cities" v-bind:key="city.id" :value="city.ref">{{city.name}}</option>
          </app-select>
        </div>
        <div class="col l6 s12"><span class="label-field">Пункт самовывоза:</span>
          <app-select class="js_change_map" name="selfDischargePoint" v-model="selfDischargePoint" :onChange="handleSelfDischargePoint">
            <option
              v-for="warehous in nova_poshta_warehouses"
              v-bind:key="warehous.id"
              :value="warehous.ref"
              :data-ltx="warehous.lat"
              :data-lty="warehous.lng"
            >{{warehous.name}}</option>
          </app-select>
        </div>
        <div class="col l6 s12"><span class="js_change_view_map" @click="toggleShowMap()">{{ showMap ? 'Скрыть карту' : 'Показать на карте' }}</span></div>
      </div>
      <div class="delivery-map">
        <div id="delivery-map" data-coords="55,55"></div>
      </div>
    </div>

    <!-- Курьером на дом -->
    <div class="delivery-place" :class="{ 'active': delWay === '2' }">
      <div class="row">
        <div class="col l6 s12">
          <div :data-error="errorMsg" class="input-field required-field"><span class="label-field">Город*</span>
            <input type="text" required v-model="town" data-name="town">
          </div>
        </div>
        <div class="col l6 s12">
          <div :data-error="errorMsg" class="input-field required-field"><span class="label-field">Адрес*</span>
            <input type="text" required v-model="address" data-name="address">
          </div>
        </div>
        <div class="col l12 s12">
          <div class="input-field"><span class="label-field">Дополнительно</span>
            <textarea class="materialize-textarea" v-model="additionally"  data-name="additionally"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Самовывоз из магазина сети Eurogold -->
    <div v-if="cityStore && pointStore" class="delivery-place" :class="{ 'active': delWay === '3' }">
      <div class="row">
        <div class="col l6 s12"><span class="label-field">Город:</span>
          <app-select name="cityStore" v-model="cityStore" :onChange="handleCityStore">
            <option v-for="(value, key, index) in affiliates" :value="key" v-bind:key="key">{{value.name}}</option>
          </app-select>
        </div>
        <div class="col l6 s12"><span class="label-field">Пункт самовывоза:</span>
          <app-select name="pointStore" v-model="pointStore" :onChange="handlePointStore">
            <option
              v-for="affiliate in affiliates[cityStore].affiliates"
              :value="replaceTags(affiliate.address)"
              v-bind:key="affiliate.id"
            >{{replaceTags(affiliate.address)}}</option>
          </app-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Select from '../../components/Select.vue'
import MsgHelper from '../../helpers/MsgHelper'
import {mapGetters, mapActions} from 'vuex'

export default {
  props: ['delWay', 'locale'],
  components: {
    'app-select': Select
  },
  mixins: [MsgHelper],
  data () {
    return {
      cityCarrier: null,
      areaCarrier: null,
      selfDischargePoint: null,
      cityStore: null,
      pointStore: null,
      showMap: true,
      town: '',
      address: '',
      additionally: '',
      delivery_data: {}
    }
  },
  computed: {
    ...mapGetters(['affiliates', 'nova_poshta_regions', 'nova_poshta_cities', 'nova_poshta_warehouses']),
    errorMsg () {
      return this.locale ? this.localesErrorText[this.locale] : ''
    }
  },
  methods: {
    ...mapActions(['fetchAffiliates', 'setCheckoutProps', 'fetchNovaPoshta_Regions', 'fetchNovaPoshta_Cities', 'fetchNovaPoshta_Warehouses']),
    initMap () {
      let objSel = window.$('.js_change_map')
      let ltx = objSel.find('option:selected').data('ltx')
      let lty = objSel.find('option:selected').data('lty')
      this.checkOutmap(ltx, lty)
    },
    checkOutmap (x, y) {
      let myLatlng = new window.google.maps.LatLng(x, y)
      let myCenter = new window.google.maps.LatLng(x, y)
      let mapOptions = {
        zoom: 13,
        center: myCenter,
        scrollwheel: false,
        disableDefaultUI: false,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP
      }
      let map = new window.google.maps.Map(document.getElementById('delivery-map'), mapOptions)
      let marker = new window.google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: '../static/images/map.png'
      })
      return marker
    },
    toggleShowMap () {
      window.$('.delivery-map').slideToggle('slow', () => {
        if (this.showMap) {
          this.initMap()
        }
      })
      this.showMap = !this.showMap
    },
    handleSelfDischargePoint () {
      let objSel = window.$('.js_change_map')
      let ltx = objSel.find('option:selected').data('ltx')
      let lty = objSel.find('option:selected').data('lty')
      this.checkOutmap(ltx, lty)
      this.setDelivery_data('byNovaPoshta')
    },
    handleAreaCarrier () {
      this.cityCarrier = null
      this.selfDischargePoint = null
      this.fetchNovaPoshta_Cities(this.areaCarrier).then(() => this.setDelivery_data('byNovaPoshta'))
    },
    handleCityCarrier () {
      this.fetchNovaPoshta_Warehouses(this.cityCarrier).then(() => {
        this.selfDischargePoint = this.nova_poshta_warehouses[0].ref
        /* this.setDelivery_data('byNovaPoshta') */
      })
    },
    handleCityStore () {
      this.pointStore = this.affiliates[this.cityStore].affiliates[0].address
      this.setDelivery_data('bySelf')
    },
    handlePointStore () {
      this.setDelivery_data('bySelf')
    },
    checkOnRequired (e) {
      let target = window.$(e.target)
      let str = target.attr('data-name')
      let requiredParent = target.closest('.required-field')
      if (str === 'additionally') {
        this.setDelivery_data('byСourier')
        return false
      }
      if (target.val().length) {
        requiredParent.removeClass('error')
        this.setDelivery_data('byСourier')
      } else {
        requiredParent.addClass('error')
      }
    },
    setDelivery_data (way) {
      switch (way) {
        case 'byСourier':
          this.delivery_data = {
            area: null,
            town: this.town,
            address: this.address,
            additionally: this.additionally
          }
          break
        case 'bySelf':
          this.delivery_data = {
            area: null,
            town: this.affiliates[this.cityStore].name,
            address: this.pointStore,
            additionally: null
          }
          break
        case 'byNovaPoshta':
          this.delivery_data = {
            area: this.nova_poshta_regions && this.areaCarrier ? this.nova_poshta_regions.filter(region => region.ref === this.areaCarrier)[0].name : null,
            town: this.nova_poshta_cities && this.cityCarrier ? this.nova_poshta_cities.filter(city => city.ref === this.cityCarrier)[0].name : null,
            address: this.nova_poshta_warehouses && this.selfDischargePoint ? this.nova_poshta_warehouses.filter(warehouse => warehouse.ref === this.selfDischargePoint)[0].name : null,
            additionally: null
          }
          break
      }
      this.setCheckoutProps({delivery_data: this.delivery_data})
    },
    replaceTags (str) {
      return str.replace(/<\/?p>/g, '')
    }
  },
  mounted () {
    this.fetchAffiliates()
      .then(resp => {
        this.cityStore = Object.keys(resp)[0]
        this.pointStore = this.replaceTags(resp[this.cityStore].affiliates[0].address)
      })
    this.fetchNovaPoshta_Regions()
    this.initMap()
    window.$('.delivery-place .input-field input, .delivery-place .input-field textarea').on('blur', this.checkOnRequired)
  },
  beforeDestroy () {
    window.$('.delivery-place .input-field input, .delivery-place .input-field textarea').off('blur', this.checkOnRequired)
  },
  watch: {
    delWay (value) {
      if (value === '1') {
        this.delivery_data = {
          area: null,
          town: null,
          address: null,
          additionally: null
        }
        this.setCheckoutProps({delivery_data: this.delivery_data})
      } else if (value === '3') {
        this.cityStore = Object.keys(this.affiliates)[0]
        this.pointStore = this.replaceTags(this.affiliates[this.cityStore].affiliates[0].address)
        this.setDelivery_data('bySelf')
      }
    }
  }
}
</script>

<style>
  .select-wrapper input.select-dropdown {
    padding-right: 35px;
  }
</style>

