<template>
  <div>
    <!--mobile filter-->
    <div class="mobile-filter">
      <div class="mobile-filter__butt js_open_sort"><span class="icon-sort"></span>Сортировка</div>
      <div class="mobile-filter__butt check-flt js_open_filter"><span class="icon-filter"></span>Фильтр</div>
    </div>
    <section class="catalog-section page-with-breadcrumbs">
      <div class="container">
        <breadcrumbs :breadcrumbs="{name: 'Ювелирные украшения', way: breadcrumbs, template: 'Products'}"></breadcrumbs>
        <div class="catalog-box">
          <div class="heading-big">{{categoryTitle}}</div>
          <div class="row">
            <filters  :filters="productFilters"
                      :featureList="simpleFilters"
                      :radio="radioFilters"
                      :price_range="price_range"
                      :namedFilters="namedFilters"
                      :multiFilters="multiFilters"
                      :productTotal="productTotal"
                      @manualPrice="manualPrice"
                      @clearFilters="clearFilters"
                      @clearNamedFilters="clearNamedFilters"
                      @changeRadioFilterArr="changeRadioFilterArr"
                      @changeFilterArr="changeFilterArr" >
            </filters>
            <div class="col l9 m8 s12 catalog-body">
              <div class="catalog-body-filter">
                <div class="row">
                  <div v-for="filter in featureListLimit" v-bind:key="filter.alias" class="filter-catalog-item col l4 m6 s12 namedWithImg">
                    <input :id="`${filter.id}${filter.alias}`" :value="filter.alias" :checked="!!(productFilters[filter.alias] && productFilters[filter.alias].indexOf(filter.feature[0].value.alias) > -1)" @change="changeFilterArr(filter.alias, filter.feature[0].value.alias)" type="checkbox">
                    <label :for="`${filter.id}${filter.alias}`">
                      <img :src="imgUrl(filter.id, filter.image)" alt="">
                      <span>{{ filter.locale.name }}</span>
                    </label>
                  </div>
                </div>
                <div class="clearfix">
                  <!-- <div class="catalog-body-filter__left"><span class="flt-label">Сортировать</span>
                    <app-select name="grade" v-model="grade" :onChange="handleGrade">
                      <option value="asc">недорогие вначале</option>
                      <option value="desc">недорогие вконце</option>
                    </app-select>
                    <div v-if="productTotal > 12" class="inline">
                      <app-select name="limit" v-model.number="limit" :onChange="handleLimitChange">
                        <option value="12">12</option>
                        <option value="24">24</option>
                        <option value="48">48</option>
                      </app-select>
                      <span class="flt-label">на странице</span>
                    </div>
                  </div> -->
                  <div class="catalog-body-filter__right">
                    <pagination :current-page="productListPage"
                                :total-items="productTotal"
                                :itemsPerPage="limit"
                                @page-changed="pageChanged"></pagination>
                  </div>
                </div>
              </div>
              <product-list
                :loaded="loaded"
                :productListPage="productListPage"
                :productTotal="productTotal"
                :productList="productList"
                :limit="limit"
                @pageChanged="pageChanged"
              ></product-list>
            </div>
          </div>
        </div>
      </div>

    </section>
    <seo-section
      v-if="!notShowSeoContent"
      :seoContent="seoContent"
      :seoTitle="seoTitle"
      ></seo-section>
  </div>
</template>

<script>
  import Filters from '../../components/Filters.vue'
  import Pagination from '../../components/Pagination.vue'
  import {mapGetters, mapActions} from 'vuex'
  import Select from '../../components/Select.vue'
  import SeoSection from '../../components/SeoSection.vue'
  import Breadcrumbs from '../../components/Breadcrumbs.vue'
  import ProductList from '../../components/ProductList.vue'
  import ImageHelper from '../../helpers/ImageHelper'
  import SeoHelper from '../../helpers/SeoHelper'

  const fetchData = async (store, route, productFilters) => {
    let res = []
    res = await Promise.all([
      store.dispatch('fetchBreadcrumbs', route.path),
      store.dispatch('getMeta', route.fullPath),
      store.dispatch('fetchProductList', {...productFilters, limit: 12, grade: 'asc'})
    ])
    // seo module
    if (res[1] && res[1].locale) {
      let r = res[1]
      return {
        seo_title: r.locale.title,
        seo_keywords: r.locale.keywords,
        seo_description: r.locale.description,
        seo_canonical: r.locale.canonical,
        seo_robots: r.locale.robots,
        seoTitle: r.locale.title,
        seoContent: r.locale.content
      }
    // seo from category
    } else {
      let b = res[0]
      let r = b[b.length - 1]
      return {
        seo_title: r.locale.seo_title,
        seo_keywords: r.locale.seo_keywords,
        seo_description: r.locale.seo_description,
        seo_canonical: r.locale.seo_canonical,
        seo_robots: r.locale.seo_robots,
        seoTitle: r.locale.seo_title,
        seoContent: r.locale.formatted_description
      }
    }
  }

  export default {
    name: 'category_alias',
    components: {
      'product-list': ProductList,
      'filters': Filters,
      'pagination': Pagination,
      'app-select': Select,
      'seo-section': SeoSection,
      'breadcrumbs': Breadcrumbs
    },
    mixins: [ImageHelper, SeoHelper],
    computed: {
      ...mapGetters([
        'productListPage',
        'productTotal',
        'productFilters',
        'category',
        'cat_id',
        'breadcrumbs',
        'featureList',
        'price_range',
        'productList']),
      simpleFilters () {
        return this.featureList.length ? this.featureList.filter((f) => f.type === 1 || f.type === 3) : []
      },
      namedFilters () {
        return this.featureList.length ? this.featureList.filter((f) => f.type_view === 1) : []
      },
      radioFilters () {
        return this.featureList.length ? this.featureList.filter((f) => f.type === 2 && f.type_view !== 1) : []
      },
      multiFilters () {
        return this.featureList.length ? this.featureList.filter((f) => f.type === 4) : []
      },
      featureListLimit: function () {
        return this.namedFilters.slice(0, 6)
      },
      categoryTitle: function () {
        let l = this.breadcrumbs.length - 1
        return this.breadcrumbs.length ? this.breadcrumbs[l].locale.name : ''
      }
    },
    data () {
      return {
        limit: 12,
        grade: 'asc',
        sliderInProgress: false,
        seoTitle: '',
        seoContent: '',
        loaded: false,
        notShowSeoContent: false,
        filtersDeep: 0
      }
    },
    methods: {
      ...mapActions(['fetchProductList', 'fetchFilters', 'setLimit', 'setGrade', 'setCatId', 'setFilters', 'fetchBreadcrumbs', 'getMeta']),
      imgUrl (filterId, imgName) {
        return this.url() + `/assets/images/filters/${filterId}/${imgName}`
      },
      filterObserver () {
        // update filters
        this.setFilters({...this.productFilters})
        // get products with new filters
        Promise
          .all([this.fetchProductList({...this.productFilters, limit: this.limit, grade: this.grade})])
          .then((res) => {
            window.$('html, body').animate({
              scrollTop: 0
            }, 500)
            if ((this.price_range.price_from && this.price_range.price_to) && this.productFilters.price_to > this.price_range.price_to) {
              this.$router.push('/notFound')
              return
            }
            if (!this.sliderIt || !(this.sliderIt && this.sliderIt.noUiSlider)) {
              // init slider
              this.sliderRange()
            } else {
              let start = this.productFilters.price_from || this.price_range.price_from
              let end = this.productFilters.price_to || this.price_range.price_to
              let settingsObj = {
                start: [start, end],
                range: {
                  'min': this.price_range.price_from,
                  'max': this.price_range.price_to
                }
              }
              this.sliderIt && this.sliderIt.noUiSlider && this.sliderIt.noUiSlider.updateOptions(settingsObj, 'update')
            }
            // update url
            /* this.setUrl() */
            this.fetchMeta(this.setUrl())
            if (!this.loaded) {
              this.loaded = true
            }
          })
          .catch((error) => {
            console.error(error.message)
            this.$router.push('/notFound')
          })
      },
      setUrl () {
        let path = this.$route.path
        let url = path.indexOf('/f/') > -1 ? path.slice(0, path.indexOf('/f/')) : path
        let urlPath = ''
        let price = []
        let keys = Object.keys(this.productFilters).sort()
        this.filtersDeep = 0
        keys.forEach((key) => {
          // catch price from and price to and collect its in array
          if (key.indexOf('price_from') > -1) {
            price[0] = this.productFilters['price_from']
          } else if (key.indexOf('price_to') > -1) {
            price[1] = this.productFilters['price_to']
          // handle other filters
          } else {
            if (!this.featureList.length) {
              /* setTimeout(() => {
                this.setUrl()
              }, 500) */
              return
            }
            let radio = this.featureList.some((categoryFilter) => categoryFilter.alias === key && (categoryFilter.type === 2 || categoryFilter.type_view === 1))
            let value = this.productFilters[key] instanceof Array ? this.productFilters[key].slice().sort().join(';') : []
            if (value.length) {
              if (radio) {
                urlPath += `/${key}`
                this.filtersDeep += 1
              } else {
                urlPath += `/${key}=${value}`
                this.filtersDeep += this.productFilters[key].length
              }
            }
          }
        })
        if (urlPath.length || price.length) {
          url += price.length ? `/f${urlPath}/price=${price[0] || this.price_range.price_from}-${price[1] || this.price_range.price_to}` : `/f${urlPath}`
        }
        if (this.productFilters.page && this.productFilters.page !== 1) {
          url += urlPath.length || price.length ? `/page=${this.productFilters.page}` : `/f/page=${this.productFilters.page}`
        }
        history.pushState(null, null, url)
        return url
      },
      changeFilterArr ([key, id, isPrice]) {
        if (isPrice) {
          this.productFilters[key] = id
        } else {
          if (this.productFilters[key]) {
            let i = this.productFilters[key].indexOf(id)
            i > -1 ? this.productFilters[key].splice(i, 1) : this.productFilters[key].push(id)
          } else {
            this.productFilters[key] = [id]
          }
          // this.resetPriceFilter()
        }
        this.filterObserver()
      },
      clearFilters (filterName) {
        let price = filterName instanceof Array
        if (price) {
          this.resetPriceFilter()
          this.filterObserver()
        } else {
          // if filter is present and not empty --> delete filter and get products
          if (this.productFilters[filterName] && this.productFilters[filterName].length) {
            delete this.productFilters[filterName]
            this.resetPriceFilter()
            this.filterObserver()
          }
        }
      },
      resetPriceFilter () {
        delete this.productFilters.price_from
        delete this.productFilters.price_to
        this.productFilters.page = 1
        this.filterWasChangedByUser = false
      },
      clearNamedFilters () {
        // filter namedFilters and if ones is present and not empty --> delete ones and get products
        let nF = this.namedFilters.filter((f) => this.productFilters[f.alias] && this.productFilters[f.alias].length && delete this.productFilters[f.alias])
        if (nF.length) {
          this.resetPriceFilter()
          this.filterObserver()
        }
      },
      changeRadioFilterArr ([key, id]) {
        console.log('this.radioFilters', this.radioFilters)
        this.radioFilters.forEach((f) => {
          this.productFilters[f.alias] && this.productFilters[f.alias].length && delete this.productFilters[f.alias]
        })
        if (key && id) {
          this.productFilters[key] = [id]
        }
        // this.resetPriceFilter()
        this.filterObserver()
      },
      pageChanged (page) {
        this.productFilters.page = page
        this.notShowSeoContent = page > 1
        this.filterObserver()
      },
      handleLimitChange (value) {
        this.setLimit(value)
        this.productFilters.limit = value
        this.productFilters.page = 1
        this.filterObserver()
      },
      handleGrade (value) {
        this.setGrade(value)
        this.productFilters.grade = value
        this.productFilters.page = 1
        this.filterObserver()
      },
      onFilterFunctions () {
        window.$('body').on('click', '.js_open_filter', this.mobileFilter)
        window.$('body').on('click', '.js_open_sort', this.mobileSort)
      },
      offFilterFunctions () {
        window.$('body').off('click', '.js_open_filter', this.mobileFilter)
        window.$('body').off('click', '.js_open_sort', this.mobileSort)
        // close all mob filters
        this.closeFilter('.js_open_filter', '.catalog-filter')
        this.closeFilter('.js_open_sort', '.catalog-body-filter')
      },
      mobileFilter (e) {
        this.closeFilter('.js_open_sort', '.catalog-body-filter')
        window.$(e.target).toggleClass('active')
        window.$(e.target).hasClass('active') && window.$('body').addClass('noscroll')
        window.$('.catalog-filter').toggleClass('visible')
      },
      mobileSort (e) {
        this.closeFilter('.js_open_filter', '.catalog-filter')
        window.$(e.target).toggleClass('active')
        window.$(e.target).hasClass('active') && window.$('body').addClass('noscroll')
        window.$('.catalog-body-filter').toggleClass('visible')
      },
      closeFilter (filter, catalogFilter) {
        window.$('body').removeClass('noscroll')
        window.$(filter).removeClass('active')
        window.$(catalogFilter).removeClass('visible')
      },
      /**
       * slider functions
      */
      setSliderListenerUpdate () {
        this.sliderIt.noUiSlider.on('update', (values, handle) => {
          let value = parseInt(values[handle])
          if (handle) {
            window.$(this.thisInputTo).val(value)
          } else {
            window.$(this.thisInputFrom).val(value)
          }
        })
        this.sliderIt.noUiSlider.on('end', (values, handle) => {
          let value = parseInt(values[handle])
          if (handle) {
            window.$(this.thisInputTo).val(value)
          } else {
            window.$(this.thisInputFrom).val(value)
          }
          this.productFilters.price_from = +window.$(this.thisInputFrom).val()
          this.productFilters.price_to = +window.$(this.thisInputTo).val()
          this.productFilters.page = 1
          this.filterObserver()
          window.$('.catalog-filter').removeClass('visible')
        })
      },
      sliderRange () {
        this.sliderIt = document.querySelector('.range-slider [id]')
        this._thisMin = this.price_range.price_from
        this._thisMax = this.price_range.price_to
        this._thisMinCur = this.productFilters.price_from || this.price_range.price_from
        this._thisMaxCur = this.productFilters.price_to || this.price_range.price_to
        if (!this._thisMaxCur) {
          this._thisMinCur = this._thisMin
        }
        if (!this._thisMaxCur) {
          this._thisMaxCur = this._thisMax
        }
        if (this._thisMin && this._thisMax && this._thisMinCur && this._thisMaxCur && this._thisMin !== this._thisMax) {
          let settingsObj = {
            start: [this._thisMinCur, this._thisMaxCur],
            connect: true,
            step: 1,
            behaviour: 'drag',
            range: {
              'min': this._thisMin,
              'max': this._thisMax
            },
            format: window.wNumb({
              decimals: 0
            })
          }
          window.noUiSlider.create(this.sliderIt, settingsObj)
          this.thisInputFrom = window.$(this.sliderIt).parents('.range-slider').find('.js_from')
          this.thisInputTo = window.$(this.sliderIt).parents('.range-slider').find('.js_to')
          this.setSliderListenerUpdate()
        }
      },
      updateSlider () {
        this.resetPriceFilter()
        this.sliderRange()
      },
      manualPrice () {
        this.filterObserver()
      },
      /**
       * meta
      */
      fetchMeta (url) {
        Promise
          .all([
            this.fetchBreadcrumbs(),
            this.getMeta(url)])
          .then((res) => {
            console.log('[response from Promise meta and breadcrumbs]:', res)
            // seo module
            if (res[1] && res[1].locale) {
              let r = res[1]
              this.setMetaIntoPage({
                title: r.locale.title,
                keywords: r.locale.keywords,
                description: r.locale.description,
                canonical: r.locale.canonical,
                robots: r.locale.robots
              })
              this.updateSeo(r.locale.title, r.locale.content, r.locale.robots)
            // seo from category
            } else {
              let b = res[0]
              let r = b[b.length - 1]
              this.setMetaIntoPage({
                title: r.locale.seo_title,
                keywords: r.locale.seo_keywords,
                description: r.locale.seo_description,
                canonical: r.locale.seo_canonical,
                robots: r.locale.seo_robots
              })
              this.updateSeo(r.locale.seo_title, r.locale.formatted_description, r.locale.seo_robots)
            }
          })
          .catch((error) => {
            console.log('[error from Promice meta and breadcrumbs]: ', error)
          })
      },
      updateSeo (seoTitle, seoContent, robots) {
        this.seoTitle = seoTitle
        this.seoContent = seoContent
        console.log('this.filtersDeep ', this.filtersDeep)
        if (this.filtersDeep > 2) {
          this.robots.attr('content', 'noindex, nofollow')
        } else {
          this.robots.attr('content', robots)
        }
        if (this.productFilters.page && this.productFilters.page > 1) {
          this.notShowSeoContent = true
        } else {
          this.notShowSeoContent = false
        }
      }
    },
    /* beforeCreate () {
      console.log('before create')
      this.$store.dispatch('fetchProductList')
    }, */
    async asyncData ({store, route}) {
      let productFilters = {}
      store.dispatch('setFilters')
      /**
       *
      */
      let key = route.name.replace('filter', '').split('-')
      key = key[1] ? key[1] : key[0]
      let parseQuery = route.params[key]
      store.dispatch('setCatId', parseQuery)
      store.dispatch('fetchFilters')
      /**
       *
      */
      let parseParams = route.params['0']
      /**
       * url with filters ?
      */
      if (parseParams && parseParams.length) {
        /**
         * parse filters
        */
        parseParams.split('/').map((el) => el.indexOf('=') > -1 ? el.split('=') : el).forEach((el) => {
          // parse price
          if (el[0].indexOf('price') > -1) {
            let price = el[1].split('-')
            if (price.length === 2) {
              productFilters[`price_from`] = +price[0]
              productFilters[`price_to`] = +price[1]
            }
          // parse page
          } else if (el[0] === 'page') {
            productFilters[`${el[0]}`] = +el[1]
          // parse filters
          } else {
            el instanceof Array ? productFilters[`${el[0]}`] = el[1].split(';') : productFilters[`${el}`] = ['1']
          }
        })
        store.dispatch('setFilters', productFilters)
        /**
         * fetch Breadcrumbs, Meta, ProductList
        */
        return fetchData(store, route, productFilters)
      } else {
        /**
         * fetch Breadcrumbs, Meta, ProductList
        */
        return fetchData(store, route, productFilters)
      }
    },
    head () {
      this.filtersDeep = Object.keys(this.productFilters).length - 1
      let store = this.$store.state.categoryMeta
      console.log('this ', this, 'store', store)
      let path = this.$route.path
      let title = this.seo_title || (store && store.seo_title) || 'Eurogold'
      let description = this.seo_description || (store && store.seo_description) || ''
      let keywords = this.seo_keywords || (store && store.seo_keywords) || ''
      let robots = this.filtersDeep > 2 ? 'noindex, nofollow' : this.seo_robots || (store && store.seo_robots)
      let canonicalLink = this.seo_canonical || (store && store.seo_canonical) || ''
      let canonical = this.productFilters && this.productFilters.page > 1 ? path.slice(0, path.indexOf('/f/')) : canonicalLink
      return {
        title: title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: description
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: keywords
          },
          {
            hid: 'robots',
            name: 'robots',
            content: robots
          }
        ],
        link: [
          { rel: 'canonical', href: canonical }
        ]
      }
    },
    mounted () {
      console.log('MOUNTED ')
      this.onFilterFunctions()
      // jquery toggleClass
      window.$('select').not('.my_select_box').material_select()
      window.$('.prod-txt').liTextLength({
        length: 70,
        afterLength: '...',
        fullText: false
      })
      window.$('html, body').animate({
        scrollTop: 0
      }, 500)
      if ((this.price_range.price_from && this.price_range.price_to) && this.productFilters.price_to > this.price_range.price_to) {
        this.$router.push('/notFound')
        return
      }
      if (!this.sliderIt || !(this.sliderIt && this.sliderIt.noUiSlider)) {
        // init slider
        this.sliderRange()
      } else {
        let start = this.productFilters.price_from || this.price_range.price_from
        let end = this.productFilters.price_to || this.price_range.price_to
        let settingsObj = {
          start: [start, end],
          range: {
            'min': this.price_range.price_from,
            'max': this.price_range.price_to
          }
        }
        this.sliderIt && this.sliderIt.noUiSlider && this.sliderIt.noUiSlider.updateOptions(settingsObj, 'update')
      }
      // update url
      this.setUrl()
      if (!this.loaded) {
        this.loaded = true
      }
      if (this.productFilters.page && this.productFilters.page > 1) {
        this.notShowSeoContent = true
      } else {
        this.notShowSeoContent = false
      }
    },
    beforeDestroy () {
      this.offFilterFunctions()
      this.$store.state.categoryMeta = {}
    }
  }
</script>

<style>
  .flt-label + .select-wrapper {
    width: 190px !important;
  }
  .inline {
    display: inline-block;
  }
  .catalog-section {
    overflow: initial;
  }
  @media only screen and (max-width: 470px) {
    .breadcrumbs {
      display: block;
    }
    .namedWithImg {
      display: none;
    }
  }
</style>
