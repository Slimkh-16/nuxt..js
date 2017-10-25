<template>
  <!--contact section-->
  <section class="contact-page">
    <div class="container">
      <!-- <div class="big-heading">Контакты</div> -->
    </div>
    <div class="map-section">
      <div id="map" :data-coords="`${central_shop_lat}, ${central_shop_lng}`"></div>
      <div class="container">
        <div class="map-section-contact">
          <div class="map-section-contact__head">Центральный магазин</div>
          <ul>
            <li><span>Адрес:</span>{{central_shop_address}}</li>
            <li><span>Телефон:</span><a :href="`tel:${phoneForHtml(central_shop_phone)}`">{{central_shop_phone}}</a></li>
            <li class="sep"></li>
            <li><span>Режим работы:</span>{{central_office_time}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="list-stores">
        <div class="head-contact">Телефоны магазинов Eurogold</div>
        <table>
          <thead>
            <tr>
              <th>Магазин</th>
              <th>Телефон</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="store in stores">
              <td>
                <router-link :to="{ name: 'stores-alias', params: { alias: store.city.alias}}">
                  <b>{{store.city.locale.name}}, </b>
                  магазин на {{store.address}}</router-link>
              </td>
              <td><a :href="`tel:${phoneForHtml(store.phonenumber)}`">{{store.phonenumber}}</a></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="ways-of-communication">
        <div class="head-contact">Способы связи<span>Для получения консультаций или заказа ювелирных украшений нашего магазина вы можете воспользоваться следующими способами связи с сотрудниками магазина:</span></div>
        <div class="row">
          <div v-if="hot_line_phone" class="col l3 m6 s12">
            <div class="ways-of-communication-item">
              <div class="ways-of-communication-item__icon"><span class="icon-mobile-phone"></span></div>
              <div class="ways-of-communication-item__txt">{{hot_line_phone.description}}
                <a :href="`tel:${phoneForHtml(hot_line_phone.value)}`" class="big">{{hot_line_phone.value}}</a>
                <span class="warn">Звонки бесплатныe со всех стационарных и мобильных телефонов по Украине</span>
              </div>
            </div>
          </div>
          <div v-if="direct_phone" class="col l3 m6 s12">
            <div class="ways-of-communication-item">
              <div class="ways-of-communication-item__icon"><span class="icon-phone-big"></span></div>
              <div class="ways-of-communication-item__txt">{{direct_phone.description}}
                <a :href="`tel:${phoneForHtml(direct_phone.value)}`" class="big">{{direct_phone.value}}</a>
              </div>
            </div>
          </div>
          <div v-if="partner_email" class="col l3 m6 s12">
            <div class="ways-of-communication-item">
              <div class="ways-of-communication-item__icon"><span class="icon-hands"></span></div>
              <div class="ways-of-communication-item__txt">{{partner_email.description}}
                <a :href="`mailto:${partner_email.value}`">{{partner_email.value}}</a>
              </div>
            </div>
          </div>
          <div v-if="office_email" class="col l3 m6 s12">
            <div class="ways-of-communication-item">
              <div class="ways-of-communication-item__icon"><span class="icon-mail"></span></div>
              <div class="ways-of-communication-item__txt">{{office_email.description}}
                <a :href="`mailto:${office_email.value}`">{{office_email.value}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="social-big-list">
        <social-list></social-list>
      </div>
      <review-form
        :title="'Связаться с нами'"
        :subTitle="'Заполните поля ниже и наш менеджер свяжется с Вами в течение 15 минут'"
        :sendReview="send_ContactForm"
        :showPhone="true"
      ></review-form>
      <div class="contact-form-sect__bottom">Все материалы, представленные на сайте, являются собственностью "ФЛП Кузьмина М. Ю. код: 3156912303". Любое использование этих материалов на других сайтах, в социальных сетях, в электронном или печатном виде запрещено законодательством Украины.</div>
    </div>

    <div id="modal-thank" class="modal">
      <div class="modal-content"><span class="modal-action modal-close modal-close--top"><span class="icon-25-plus-tovar"></span></span>
        <div class="container align-center">
          <div class="modal-head">Спасибо, Ваша заявка отправлена!</div>
          <div class="modal-body">
            <p>Наш менеджер свяжется с Вами в течение 15 минут.</p>
            <div class="modal-foot clearfix"><span class="waves-effect waves-light btn modal-close left">Закрыть</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import ReviewForm from '../../components/ReviewForm'
import SocialList from '../../components/SocialList'

export default {
  components: {
    'review-form': ReviewForm,
    'social-list': SocialList
  },
  computed: {
    ...mapGetters(['stores', 'settings']),
    central_shop_lat () {
      return this.settings ? this.settings.filter(o => o.key === 'central_shop_lat')[0].value : ''
    },
    central_shop_lng () {
      return this.settings ? this.settings.filter(o => o.key === 'central_shop_lng')[0].value : ''
    },
    central_shop_address () {
      return this.settings ? this.settings.filter(o => o.key === 'central_shop_address')[0].value : ''
    },
    central_shop_phone () {
      return this.settings ? this.settings.filter(o => o.key === 'central_shop_phone')[0].value : ''
    },
    central_office_time () {
      return this.settings ? this.settings.filter(o => o.key === 'central_office_time')[0].value : ''
    },
    hot_line_phone () {
      return this.settings ? this.settings.filter(o => o.key === 'hot_line_phone')[0] : null
    },
    direct_phone () {
      return this.settings ? this.settings.filter(o => o.key === 'direct_phone')[0] : null
    },
    partner_email () {
      return this.settings ? this.settings.filter(o => o.key === 'partner_email')[0] : null
    },
    office_email () {
      return this.settings ? this.settings.filter(o => o.key === 'office_email')[0] : null
    }
  },
  methods: {
    ...mapActions(['fetchAffiliates', 'sendContactForm']),
    mapFunction () {
      if (window.$('#map').length > 0 && this.central_shop_lat && this.central_shop_lng) {
        var coords = window.$('#map').attr('data-coords').split(',')
        var myLatlng = new window.google.maps.LatLng(coords[0], coords[1])
        var myCenter = new window.google.maps.LatLng(coords[0], coords[1])
        var mapOptions = {
          zoom: 10,
          center: myCenter,
          scrollwheel: false,
          disableDefaultUI: false,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP
        }
        var map = new window.google.maps.Map(document.getElementById('map'), mapOptions)
        var marker = new window.google.maps.Marker({
          position: myLatlng,
          map: map,
          icon: '/images/map.png'
        })
        return marker
      } else {
        setTimeout(() => this.mapFunction(), 1000)
      }
    },
    phoneForHtml (phone) {
      return phone.replace(/[+/.\s()-]/g, '')
    },
    send_ContactForm (data) {
      this.sendContactForm(data)
        .then((res) => {
          res.status === 200 ? window.$('#modal-thank').modal('open') : console.log('ERROR')
        })
        .catch((error) => {
          console.log('[sendReview error]: ', error.response)
        })
    }
  },
  async asyncData ({store}) {
    let res = await store.dispatch('fetchAffiliates')
    console.log(res)
    return {}
  },
  mounted () {
    this.mapFunction()
    this.fetchAffiliates().then(() => console.log(this.stores))
    window.$('input[data-validate="phone"]').mask('+380(99)999 99 99')
    window.$('#modal-thank').modal({
      opacity: 1,
      ready: function (el) {
        window.$('.overlay').fadeIn(500)
      },
      complete: function () {
        window.$('.overlay').fadeOut(500)
      }
    })
  }
}
</script>
