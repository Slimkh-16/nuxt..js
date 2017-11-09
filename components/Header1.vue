<template>
  <div>
    <header class="header clearfix">
      <div class="header-top clearfix">
        <div class="container">
          <div class="header-top__left">
            <ul>
              <li v-for="page in contentPages"  v-if="page.is_header">
                <router-link :to="{ name: 'Content page' , params : {alias : page.alias}}">{{page && page.locale.title}}</router-link>
              </li>
            </ul>
          </div>
          <div class="header-top__right">
            <a :href="`tel:${getObjectByKey('support_phone') && getObjectByKey('support_phone').value}`">{{getObjectByKey('support_phone') && getObjectByKey('support_phone').value}}</a></div>
        </div>
      </div>
      <div class="header-middle clearfix">
        <div class="container">
          <div data-activates="slide-out" class="menu-button-general"><span></span><span></span><span></span></div>
          <div class="header-search">
            <form @submit.prevent="searchFunction()">
              <button type="submit"><span class="icon-search"></span></button>
              <input type="text" value="" v-model="subString" placeholder="Что вы ищете?" @focus="searchFocus()" @input="inputSearch()">
            </form>
            <div v-show="subString.length > 2" class="fast-search">
              <ul>
                <li v-for="fastSearch in searchProductList">
                  <router-link :to="{ name: 'Product page', params: { alias: fastSearch.alias }}">
                    <span class="fast-search__img">
                        <img :src="getImgSrc(fastSearch)" :alt="fastSearch.alias">
                    </span>
                    <span class="fast-search__body">
                        {{fastSearch.locale.name}} <br>
                      <span class="old-price">{{fastSearch.price_old}} грн</span>
                      <b class="price">{{fastSearch.price}} грн</b>
                    </span>
                  </router-link>
                </li>
              </ul>
              <div v-if="searchProductList && searchProductList.length" class="all-results" @click.prevent="searchFunction()">Все результаты</div>
              <div v-else class="empty-result">Ничего не найдено</div>
            </div>
          </div>
          <div class="header-logo">
            <router-link to="/">
              <img src="../assets/images/EuroGold-Logo.svg" alt="">
            </router-link>
          </div>
          <div class="header-middle__right">
            <a href="#" class="cart-button js_cart" @click.prevent="checkCart()">
              <span class="icon-cart"></span> Ваш заказ
              <span v-if="count" class="count-cart">{{count}}</span>
            </a>
          </div>
        </div>
      </div>
      <div class="header-bottom">
        <div class="container">
          <div class="navigation-catalog">
            <ul>
              <li v-for="link in menu">
                <router-link :to="{ name: 'category_alias', params: { 'category_alias' : link.alias } }" :data-activates="`drop-catalog-${link.id}`" class="dropdown-head-nav">
                  <i>{{link.locale.name}}</i>
                </router-link>
                <ul :id="`drop-catalog-${link.id}`" class="dropdown-content">
                  <li v-for="subLink in link.children">
                    <router-link :to="{ name: 'category_alias-subcategory_alias', params: { 'subcategory_alias' : subLink.alias, 'category_alias': link.alias } }" :data-activates="`drop-catalog-sublevel-${subLink.id}`" class="dropdown-head-nav">{{subLink.locale.name}}</router-link>
                    <ul v-if="subLink.children.length" :id="`drop-catalog-sublevel-${subLink.id}`" class="dropdown-content dropdown-content--sublevel">
                      <li v-for="subLinkChild in subLink.children">
                        <router-link :to="{ name: 'category_alias-subCategoryChild', params: { 'subcategory_alias' : subLink.alias, 'category_alias': link.alias, 'subCategoryChild': subLinkChild.alias } }">
                          {{subLinkChild.locale.name}}
                        </router-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <header class="header-mobile">
      <div data-activates="slide-out" class="menu-button-general"><span></span><span></span><span></span></div>
      <div class="header-mobile-logo">
        <router-link :to="{ name: 'index'}">
          <img src="../assets/images/Euro-Gold-Logo-WH.svg" alt="">
        </router-link>
      </div>
    </header>
    <!-- menu for mobile -->
    <div id="slide-out" class="left-fixed-nav side-nav">
      <div class="left-fixed-nav__head"><img src="../assets/images/EuroGold-Logo.svg" alt=""></div>
      <div class="left-fixed-nav__body">
        <div class="header-search">
          <form @submit.prevent="searchFunction()">
            <button type="submit"><span class="icon-search"></span></button>
            <input type="text" value="" v-model="subString" placeholder="Что вы ищете?" @input="inputSearch()">
          </form>
        </div>
        <div class="header-middle__right">
          <a href="#" class="cart-button js_cart" @click.prevent="checkCart()">
            <span class="icon-cart"></span> Ваш заказ
            <span v-if="count" class="count-cart">{{count}}</span>
          </a>
        </div>
        <div class="left-fixed-nav__over">
          <ul>
            <li v-for="link in menu" :class="{ 'with-menu': link.children }">
              <router-link :to="{ name: 'category_alias', params: { 'category_alias' : link.alias } }" :class="{ 'with-menu-lnk': link.children.length }">
                {{link.locale.name}}
              </router-link>
              <span v-if="link.children.length" class="drop-nav icon-bottom"></span>
              <ul>
                <li v-for="subLink in link.children" class="with-menu" :class="{ 'with-menu': subLink.children.length }">
                  <router-link :to="{ name: 'category_alias-subcategory_alias', params: { 'subcategory_alias' : subLink.alias, 'category_alias': link.alias } }" :class="{ 'with-menu-lnk': subLink.children.length }">
                    {{subLink.locale.name}}
                  </router-link>
                  <span v-if="subLink.children.length" class="drop-nav icon-bottom"></span>
                  <ul>
                    <li v-for="subLinkChild in subLink.children">
                      <router-link :to="{ name: 'category_alias-subCategoryChild', params: { 'subcategory_alias' : subLink.alias, 'category_alias': link.alias, 'subCategoryChild': subLinkChild.alias } }">
                        {{subLinkChild.locale.name}}
                      </router-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SocialHelper from '../helpers/SocialHelper'
import ImageHelper from '../helpers/ImageHelper'

export default {
  name: 'app-header',
  data () {
    return {
      isMobile: false,
      subString: ''
    }
  },
  props: ['menu', 'count'],
  mixins: [SocialHelper, ImageHelper],
  computed: {
    ...mapGetters(['settings', 'searchProductList', 'contentPages'])
  },
  methods: {
    ...mapActions(['fetchBreadcrumbs', 'searchByString']),
    runScroll () {
      let scrollTopPosition
      window.addEventListener('scroll', function () {
        scrollTopPosition = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop)
        if (scrollTopPosition > 50) {
          document.querySelector('.header').classList.add('fix')
        } else {
          document.querySelector('.header').classList.remove('fix')
        }
      })
    },
    dropdown () {
      let browserYou = this.getBrowser()
      if (browserYou.platform === 'mobile') {
        this.isMobile = true
      }
      if (!this.isMobile) {
        window.$('.dropdown-head-nav').dropdown({
          hover: true,
          outDuration: 500
        })
      }
    },
    getBrowser: function () {
      var ua = navigator.userAgent
      var bName = (function () {
        if (ua.search(/Edge/) > -1) return 'edge'
        if (ua.search(/MSIE/) > -1) return 'ie'
        if (ua.search(/Trident/) > -1) return 'ie11'
        if (ua.search(/Firefox/) > -1) return 'firefox'
        if (ua.search(/Opera/) > -1) return 'opera'
        if (ua.search(/OPR/) > -1) return 'operaWebkit'
        if (ua.search(/YaBrowser/) > -1) return 'yabrowser'
        if (ua.search(/Chrome/) > -1) return 'chrome'
        if (ua.search(/Safari/) > -1) return 'safari'
        if (ua.search(/maxHhon/) > -1) return 'maxHhon'
      })()

      var version
      switch (bName) {
        case 'edge':
          version = (ua.split('Edge')[1]).split('/')[1]
          break
        case 'ie':
          version = (ua.split('MSIE ')[1]).split(';')[0]
          break
        case 'ie11':
          bName = 'ie'
          version = (ua.split('; rv:')[1]).split(')')[0]
          break
        case 'firefox':
          version = ua.split('Firefox/')[1]
          break
        case 'opera':
          version = ua.split('Version/')[1]
          break
        case 'operaWebkit':
          bName = 'opera'
          version = ua.split('OPR/')[1]
          break
        case 'yabrowser':
          version = (ua.split('YaBrowser/')[1]).split(' ')[0]
          break
        case 'chrome':
          version = (ua.split('Chrome/')[1]).split(' ')[0]
          break
        case 'safari':
          version = ua.split('Safari/')[1].split('')[0]
          break
        case 'maxHhon':
          version = ua.split('maxHhon/')[1]
          break
      }
      var platform = 'desktop'
      if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) platform = 'mobile'
      var browsrObj
      try {
        browsrObj = {
          platform: platform,
          browser: bName,
          versionFull: version,
          versionShort: version.split('.')[0]
        }
      } catch (err) {
        browsrObj = {
          platform: platform,
          browser: 'unknown',
          versionFull: 'unknown',
          versionShort: 'unknown'
        }
      }
      return browsrObj
    },
    checkCart () {
      if (this.count) {
        this.$router.push('/cart')
      } else {
        window.$('#cartIsEmptyIndex').modal('open')
      }
    },
    searchFunction () {
      if (this.subString.length > 2) {
        this.$router.push({name: 'SearchPage', query: { search: this.subString }})
        window.$('.menu-button-general').sideNav('hide')
        this.subString = ''
      } else {
        alert('Поиск от трёх символов')
      }
    },
    searchFocus () {
      this.subString.length > 2 && this.searchByString([this.subString, {limit: 5}])
      if (this.subString.length > 2) {
        window.$('.fast-search').fadeIn()
      }
    },
    inputSearch () {
      this.subString.length > 2 && this.searchByString([this.subString, {limit: 5}])
    },
    imgUrl (productId, imgName) {
      return this.url() + `/assets/images/products/${productId}/${imgName}`
    },
    getImgSrc (product) {
      let cover = this.coverImg(product)
      return cover
    }
  },
  mounted () {
    this.runScroll()
    window.$('.menu-button-general').sideNav({
      menuWidth: 280,
      edge: 'left',
      closeOnClick: true,
      draggable: true
    })
    window.$(document).on('click', (e) => {
      if (!window.$(e.target).closest('.fast-search, .header-search').length) {
        window.$('.fast-search').fadeOut()
      }
    })
  },
  watch: {
    menu: function () {
      this.$nextTick(() => {
        this.dropdown()
        this.fetchBreadcrumbs()
      })
    }
  }
}
</script>

<style>
.left-fixed-nav__over {
  clear: both;
}
header {
  width: 100% !important;
}

.menu-button-general {
  z-index: 56;
}
</style>
