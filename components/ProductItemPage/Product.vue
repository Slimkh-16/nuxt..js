<template>
  <div class="clearfix">
    <section class="product-section">
      <div class="container">
        <breadcrumbs :breadcrumbs="{name: 'Ювелирные украшения', way: [...breadcrumbs, {locale: product.locale}]}"></breadcrumbs>
        <div class="product-gen-cont">
          <div class="row">
            <div class="col l6 s12">

              <!-- SLIDER -->
              <photo-slider
                :className="'productImages'"
                :object="product"
                :pathOfImgUrl="'products'"
                :video="product.video"
                :productStatusClass="productStatusClass(product)"
                :productStatusName="productStatusName(product)"
                :galleryClassName="'gal-product'"
              ></photo-slider>

            </div>
            <div class="col l6 s12">

              <!-- PRODUCT -->
              <div class="product-info">
                <div class="product-info__name">{{product.locale && product.locale.name}}</div>
                <div v-if="product.available" class="product-one-status green-stat">Есть в наличии</div>
                <div v-else class="product-one-status red-stat">Нет в наличии</div>
                <div class="product-char">
                  <div v-if="product.price_gr" class="product-char-warning">ВЫГОДНАЯ
                    <br>ЦЕНА ЗОЛОТА
                    <br><span>{{product.price_gr}} ГРН.</span>ЗА ГРАММ!
                  </div>
                  <!-- SIZE -->
                  <div v-if="Object.keys(sizes).length" class="product-char-row">
                    <div class="product-char-col"><span> Размеры:</span></div>
                    <div class="product-char-col">
                      <div class="change-size product_s">
                        <span v-for="k in sortedSizes" @click="selectSize($event, sizes[k])">{{k}}</span>
                      </div>
                    </div>
                  </div>
                  <!-- WEIGHT -->
                  <div v-if="Object.keys(selectedSize).length" class="product-char-row">
                    <div class="product-char-col"><span> Вес изделия:</span></div>
                    <div class="product-char-col">
                      <div v-for="w in selectedSize" class="change-size product_w">
                        <span @click="selectWeight($event, w)">{{w.weight}} гр</span>
                      </div>
                    </div>
                  </div>
                  <!-- OTHER CHARECTERISTICS -->
                  <div class="product-char-row" v-for="f in productFeature(product)">
                    <div class="product-char-col"><span>{{f.filter.locale.name}}:</span></div>
                    <div class="product-char-col">{{filterName(f)}}</div>
                  </div>
                  <div class="product-char-row" v-if="product.locale.metal_color">
                    <div class="product-char-col"><span>Цвет металла:</span></div>
                    <div class="product-char-col">{{product.locale.metal_color}}</div>
                  </div>
                  <div class="product-char-row" v-if="product.locale.stone_bracing">
                    <div class="product-char-col"><span>Фиксация камня:</span></div>
                    <div class="product-char-col">{{product.locale.stone_bracing}}</div>
                  </div>
                  <div class="product-char-row" v-if="product.locale.stone_color">
                    <div class="product-char-col"><span>Цвет камня:</span></div>
                    <div class="product-char-col">{{product.locale.stone_color}}</div>
                  </div>
                  <div class="product-char-row" v-if="product.locale.earing_type">
                    <div class="product-char-col"><span>Тип серьги:</span></div>
                    <div class="product-char-col">{{product.locale.earing_type}}</div>
                  </div>
                </div>
                <!-- PRODUCT PRICE -->
                <div class="product-price">
                  <div v-if="product.price_old"  class="old-price"><span>{{product.price_old}}</span>грн.</div>
                  <div class="cur-price">
                    <span v-if="product.variations.length && dynamicProductPrice" class="js_prod_price">{{dynamicProductPrice}} грн. </span>
                    <span v-if="!product.variations.length" class="js_prod_price">{{product.total_price}} грн.</span>
                  </div>
                </div>
                <div class="product-free-delivery"><span class="icon-delivery"></span>БЕСПЛАТНАЯ ДОСТАВКА ДО ДВЕРЕЙ
                </div>
                <a v-if="product.is_engravable" href="#modal-grav" class="product-free-grav modal-trigger">Добавить бесплатную гравировку</a>
                <div class="product-buy">
                  <div class="product-buy-phone">Заказ по телефону<b>{{getObjectByKey('phone_for_order') && getObjectByKey('phone_for_order').value}}</b><span class="tt-upp">БЕСПЛАТНЫЙ НОМЕР</span>
                  </div>
                  <a v-if="product.available && product.total_price || dynamicProductPrice" href="#" class="btn waves-effect waves-light" @click.prevent="addToCart()">Купить</a>
                  <br>
                  <a v-if="pageCredit" href="#" class="all-butt waves-effect waves-light"  @click.prevent="addToCredit()">Купить в кредит</a>
                </div>
                <div class="product-card-list"><span>Мы принимаем к оплате:</span><img src="../../assets/images/foot.png" alt="">
                </div>
                <content-pages-list></content-pages-list>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <div class="product-tab">
                <div class="product-tab-nav">
                  <no-ssr>
                    <ul class="tabs">
                      <li class="tab"><a href="#tab1" @click.prevent="tabFunction($event)">Все</a></li>
                      <li class="tab"><a href="#tab2" @click.prevent="tabFunction($event)">Фото/Видео</a></li>
                      <li class="tab"><a href="#tab3" @click.prevent="tabFunction($event)">Характеристики</a></li>
                      <li class="tab"><a href="#tab4" @click.prevent="tabFunction($event)" class="active">Отзывы</a></li>
                      <li class="tab"><a href="#tab5" @click.prevent="tabFunction($event)">Упаковка</a></li>
                    </ul>
                  </no-ssr>
                </div>
                <div class="product-tab-cont content">
                  <all-tab :product="product"></all-tab>
                  <!-- <photo-video
                    :product="product">
                  </photo-video> -->
                  <characteristics
                    :product="product"
                    >
                    </characteristics>
                  <reviews
                    :reviews="product.comments"
                    :locale="product.locale ? product.locale.locale : ''"
                  ></reviews>
                  <packing></packing>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div id="modal-video" class="modal">
      <div class="modal-content"><span class="modal-action modal-close modal-close--top icon-cancel"></span>
        <div class="modal-head align-center">Видеообзор</div>
        <div class="modal-body">
          <iframe width="100%" height="315" :src="product.video"></iframe>
        </div>
        <div class="modal-foot align-center clearfix">
          <span class="waves-effect waves-light modal-close"><span class="icon-16-arrow-link"></span>Закрыть</span>
        </div>
      </div>
    </div>
    <div id="modal-grav" class="modal">
      <div class="modal-content"><span class="modal-action modal-close modal-close--top icon-cancel"></span>
        <div class="modal-head">Добавить гравировку</div>
        <div class="modal-body">
          <div class="grav-box">
            <div data-text="Максимум 15 символов" class="grav-field">
              <span>Текст для гравировки</span>
              <input type="text" value="Любовь навсегда" v-model="inputGravText" maxlength="15" @input="letterin()">
            </div>
            <div class="grav-change">
              <span @click="gravChangeTextStyle($event, 'gr-tt', 1)" class="gr-tt active">АБ</span>
              <span @click="gravChangeTextStyle($event, 'gr-def', 2)" class="gr-def">Аб</span>
              <span @click="gravChangeTextStyle($event, 'gr-it', 3)" class="gr-it">Аб</span>
              <span @click="gravChangeTextStyle($event, 'gr-cus', 4)" class="gr-cus">Аб</span>
            </div>
            <div class="grav-img-box">
              <div class="text-grav gr-tt">{{inputGravText}}</div>
              <img src="/images/grav.jpg" alt="">
            </div>
            <p>Изделие показано для примера и может отличаться от выбранного вами. Размер надписи на вашем изделии может отличаться от показанного в зависимости от размера изделия.</p>
          </div>
        </div>
        <div class="modal-foot clearfix">
          <span class="waves-effect waves-light modal-close"><span class="icon-16-arrow-link"></span>Отменить</span>
          <a href="#" class="btn waves-effect waves-light" @click.prevent="addGrav()">Добавить</a>
        </div>
      </div>
    </div>
    <div id="addedToCart" class="modal">
      <div class="modal-content"><span class="modal-action modal-close modal-close--top icon-cancel"></span>
        <div class="modal-head">Товар добавлен в корзину</div>
        <div class="modal-foot clearfix">
          <span class="waves-effect waves-light modal-close"><span class="icon-16-arrow-link"></span>Ок</span>
          <span class="btn waves-effect waves-light" @click="redirectToCart()">Перейти в корзину</span>
        </div>
      </div>
    </div>
    <div v-if="pageCredit" id="addedToCredit" class="modal">
      <div class="modal-content"><span class="modal-action modal-close modal-close--top icon-cancel"></span>
        <div class="modal-head">Купить в кредит</div>
        <div class="modal-body" v-html="pageCredit.locale.body"></div>
        <div class="modal-foot text-center clearfix">
          <span class="waves-effect waves-light modal-close"><span class="icon-16-arrow-link"></span>Ок</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Characteristics from './Characteristics.vue'
import AllTab from './AllTab.vue'
import PhotoVideo from './PhotoVideo.vue'
import Reviews from './Reviews.vue'
import Packing from './Packing.vue'
import ContentPagesList from './ContentPagesList.vue'
import Breadcrumbs from '../../components/Breadcrumbs.vue'
import ImageHelper from '../../helpers/ImageHelper'
import SocialHelper from '../../helpers/SocialHelper'
import ProductHelper from '../../helpers/ProductHelper'
import Cart from '../../helpers/Cart'
import {mapGetters, mapActions} from 'vuex'
import PhotoSlider from '../../components/PhotoSlider.vue'
import {pageCreditUrl} from '../../enum'

export default {
  props: {
    product: Object
  },
  mixins: [ImageHelper, ProductHelper, Cart, SocialHelper],
  components: {
    PhotoVideo,
    AllTab,
    'characteristics': Characteristics,
    'all-tab': AllTab,
    'reviews': Reviews,
    'photo-video': PhotoVideo,
    'breadcrumbs': Breadcrumbs,
    'content-pages-list': ContentPagesList,
    'packing': Packing,
    'photo-slider': PhotoSlider
  },
  methods: {
    ...mapActions(['setCatId', 'fetchBreadcrumbs']),
    tabFunction (e) {
      window.$('.tabs a').removeClass('active')
      window.$('.product-tab-cont.content > div').hide()
      let id = window.$(e.target).addClass('active').attr('href')
      window.$('.product-tab-cont.content' + ` ${id}`).show()
    },
    breadcrumbsWay () {
      console.log('this.cat_id ', this.cat_id)
      if (!this.cat_id && this.product.categories && this.product.categories.length) {
        let catId = this.product.categories[0].alias
        console.log('this.product.categories[0].alias ', this.product.categories[0].alias)
        this.setCatId(catId)
        this.fetchBreadcrumbs()
      } else {
        this.fetchBreadcrumbs()
      }
    },
    addGrav () {
      window.$('.modal').modal('close')
      this.grave = {
        text: this.inputGravText,
        style_id: this.style_id || 1
      }
      console.log(this.grave)
    },
    initZoom () {
      /* window.$('.productImages .product-big-images img').elevateZoom({
        gallery: 'gal-product',
        cursor: 'pointer',
        galleryActiveClass: 'active',
        zoomType: 'lens',
        lensShape: 'round',
        lensSize: 255,
        imageCrossfade: true
      }) */
      this.initZoomJQuery('productImages', 'gal-product')
    },
    gravChangeTextStyle (e, str, id) {
      window.$('.grav-change span').removeClass('active')
      window.$(e.target).addClass('active')
      window.$('.text-grav').attr('class', 'text-grav')
      window.$('.text-grav').addClass(str)
      this.style_id = id
    },
    productFunction () {
      this.initZoom()
      this.letterin()
      window.$('.materialboxed').materialbox()
      window.$('.tab-box .product-char .product-char-row:gt(8)').hide()
      window.$('body').on('click', '.js_all_char', this.toggleChar)
      window.$(`.product-tab-cont.content > div:not('#tab4')`).hide()
    },
    toggleChar (e) {
      if (window.$(e.target).hasClass('active')) {
        window.$(e.target).removeClass('active')
        window.$('.tab-box .product-char .product-char-row:gt(8)').hide('slow')
      } else {
        window.$(e.target).addClass('active')
        window.$('.tab-box .product-char .product-char-row').show('slow')
      }
    },
    letterin () {
      let str = this.inputGravText
      let arrThis = str.match(/(.{1,1})/gim) || ''
      arrThis.forEach(function (item, i) {
        arrThis[i] = '<span class="char' + i + '">' + item + '</span>'
      })
      document.querySelector('.grav-img-box .text-grav').innerHTML = arrThis.join('')
    },
    selectSize (e, v) {
      window.$(e.target).closest('.change-size').find('span').removeClass('active')
      window.$(e.target).addClass('active')
      this.selectedSize = v.sort((p, n) => +p.weight - +n.weight)
      this.currentWeight = v[0]
      console.log(this.selectedSize[0].price)
    },
    selectWeight (e, w) {
      window.$(e.target).closest('.product-char-col').find('span').removeClass('active')
      window.$(e.target).addClass('active')
      this.currentWeight = w
    },
    imgUrl (productId, imgName) {
      return this.url() + `/assets/images/products/${productId}/${imgName}`
    },
    currImg () {
      let cover = this.coverImg(this.product)
      return cover
    },
    addToCart () {
      let computedPrice = this.dynamicProductPrice ? this.dynamicProductPrice : this.product.price
      let npp = this.product.variations[0] ? (this.currentWeight.npp || this.product.variations[0].npp) : this.product.total_price
      this.addProductIntoCart({...this.product, computedPrice, qty: 1, npp, size: this.currentWeight.size, grave: this.grave})
      window.$('#addedToCart').modal('open')
    },
    addToCredit () {
      window.$('#addedToCredit').modal('open')
    },
    redirectToCart () {
      window.$('#addedToCart').modal('close')
      this.$router.push('/cart')
    }
  },
  data () {
    return {
      selectedSize: [],
      currentWeight: {},
      inputGravText: 'Любовь навсегда',
      grave: {
        text: null,
        style_id: null
      }
    }
  },
  computed: {
    ...mapGetters(['breadcrumbs', 'contentPages']),
    sizes () {
      let obj = {}
      this.product.variations && this.product.variations.forEach((v) => {
        if (obj[v.size]) {
          obj[v.size].push(v)
        } else {
          obj[v.size] = [v]
        }
      })
      return obj
    },
    sortedSizes () {
      return Object.keys(this.sizes).sort((p, n) => +p - +n)
    },
    dynamicProductPrice () {
      return this.selectedSize[0] ? this.selectedSize[0].price : null
    },
    pageCredit () {
      const pageCredit = this.contentPages.length && this.contentPages.filter((obj) => obj.alias === pageCreditUrl)[0]
      return pageCredit
    }
  },
  mounted () {
    window.$('#modal-grav, #addedToCart, #addedToCredit, #modal-video').modal({
      opacity: 1,
      ready: function (el) {
        window.$('.overlay').fadeIn(500)
      },
      complete: function () {
        window.$('.overlay').fadeOut(500)
      }
    })
    if (Object.keys(this.sizes).length) {
      this.selectedSize = this.sizes[this.sortedSizes[0]].sort((p, n) => +p.weight - +n.weight)
    }
    this.breadcrumbsWay()
    window.$('.change-size.product_w').find('span').removeClass('active')
    window.$('.change-size.product_w:nth-of-type(1)').find('span').addClass('active')
    window.$('.change-size.product_s').find('span').removeClass('active').end().find('span:nth-of-type(1)').addClass('active')
    window.$('.productImages .zoomImg').data('zoom-image', this.currImg())
    this.productFunction()
  },
  beforeDestroy () {
    window.$('.zoomContainer').remove()
    window.$('body').off('click', '.js_all_char', this.toggleChar)
  },
  watch: {
    product () {
      // window.$('.zoomContainer').remove()
      /* if (Object.keys(this.sizes).length) {
        this.selectedSize = this.sizes[this.sortedSizes[0]].sort((p, n) => +p.weight - +n.weight)
      }
      this.breadcrumbsWay()
      setTimeout(() => {
        window.$('.change-size.product_w').find('span').removeClass('active')
        window.$('.change-size.product_w:nth-of-type(1)').find('span').addClass('active')
        window.$('.change-size.product_s').find('span').removeClass('active').end().find('span:nth-of-type(1)').addClass('active')
        window.$('.productImages .zoomImg').data('zoom-image', this.currImg())
        this.productFunction()
      }, 0) */
    },
    selectedSize () {
      this.currentWeight = this.selectedSize[0]
      window.$('.change-size.product_w').find('span').removeClass('active')
      window.$('.change-size.product_w:nth-of-type(1)').find('span').addClass('active')
    }
  }
}
</script>

<style>
  .product-char-row .product-char-col {
    vertical-align: bottom;
  }
</style>
