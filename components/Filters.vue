<template>
  <div class="col l3 m4 s12 catalog-sidebar catalog-filter">

    <div v-if="namedFilters.length" class="filter-box visible">
      <div class="filter-box__head" @click="toggleFilterBox($event)">Именованные фильтры<span class="refresh-filter" @click.stop="clearNamedFilters()">сбросить</span></div>
      <div class="filter-bix__body" style="display: block;">
        <div v-for="filter in namedFilters" class="filter-item">
          <input :id="`${filter.id}${filter.alias}`" :value="filter.alias" :checked="!!(filters[filter.alias] && filters[filter.alias].indexOf(filter.feature[0].value.alias) > -1)" @change="changeFilterArr(filter.alias, filter.feature[0].value.alias)" type="checkbox" class="filled-in">
          <label :for="`${filter.id}${filter.alias}`">{{ filter.locale.name }}</label>
        </div>
      </div>
    </div>
    <!-- radio filters -->
    <div v-if="radio.length" class="filter-box visible">
      <div class="filter-box__head" @click="toggleFilterBox($event)">&nbsp;<span class="refresh-filter" @click.stop="changeRadioFilterArr()">сбросить</span></div>
      <div class="filter-bix__body" style="display: block;">
        <div v-for="filter in radio" class="filter-item">
          <input :id="`${filter.id}${filter.alias}`" :value="filter.alias" :checked="!!(filters[filter.alias] && filters[filter.alias].indexOf(filter.feature[0].value.alias) > -1)" @change="changeRadioFilterArr(filter.alias, filter.feature[0].value.alias)" type="radio" name="or" class="filled-in">
          <label :for="`${filter.id}${filter.alias}`">{{ filter.locale.name }}</label>
        </div>
      </div>
    </div>

    <div v-for="filter in featureList" class="filter-box visible" v-if="filter.feature.length">
      <div class="filter-box__head" @click="toggleFilterBox($event)">{{filter.locale.name}}<span class="refresh-filter" @click.stop="clearFilters(filter.alias)">сбросить</span></div>
      <div class="filter-bix__body" style="display: block;">
        <div v-for="feature in filter.feature" class="filter-item">
          <input :id="`${feature.id}${feature.value.alias}`" :value="feature.value.alias" :checked="!!(filters[filter.alias] && filters[filter.alias].indexOf(feature.value.alias) > -1)" @change="changeFilterArr(filter.alias, feature.value.alias)" type="checkbox" class="filled-in">
          <label :for="`${feature.id}${feature.value.alias}`">{{ feature.value.num ? feature.value.num : feature.value.locale.name }} </label>
        </div>
      </div>
    </div>

    <!-- multi -->
    <div v-for="filter in multiFilters" class="filter-box visible" v-if="filter.feature.length">
      <div class="filter-box__head" @click="toggleFilterBox($event)">{{filter.locale.name}}<span class="refresh-filter" @click.stop="clearFilters(filter.alias)">сбросить</span></div>
      <div class="filter-bix__body" style="display: block;">
        <div v-for="feature in filter.feature" class="filter-item">
          <input :id="`${feature.id}${feature.value.alias}`" :value="feature.value.alias" :checked="!!(filters[filter.alias] && filters[filter.alias].indexOf(feature.value.alias) > -1)" @change="changeFilterArr(filter.alias, feature.value.alias)" type="checkbox" class="filled-in">
          <label :for="`${feature.id}${feature.value.alias}`">{{ feature.value.num ? feature.value.num : feature.value.locale.name }} </label>
        </div>
      </div>
    </div>
    <!-- price range -->
    <div class="filter-box visible price">
      <div class="filter-box__head" @click="toggleFilterBox($event)">Цена<span class="refresh-filter" @click.stop="clearFilters([{key: 'price_from', val: price_range.price_from}, {key: 'price_to', val: price_range.price_to}], true)">сбросить</span></div>
      <div class="filter-bix__body" style="display: block;">
        <div class="range-slider">
          <div
            id="range1"
            :data-min="price_range.price_from"
            :data-max="price_range.price_to"
            data-slider-min=""
            data-slider-max=""></div>
          <div class="price-slider-input"><span>от</span>
            <input
              type="text"
              class="js_from"
              v-model="filters.price_from"
              @keyup="checkValue('from', filters.price_from)"
              @change="setInputPrice('from', filters.price_from)"
            ><span>до</span>
            <input
              type="text"
              class="js_to"
              v-model="filters.price_to"
              @keyup="checkValue('to', filters.price_to)"
              @change="setInputPrice('to', filters.price_to)"
            ><span><b>грн</b></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['filters', 'featureList', 'namedFilters', 'price_range', 'productTotal', 'radio', 'multiFilters'],
  methods: {
    changeFilterArr (key, id, isPrice) {
      this.$emit('changeFilterArr', [key, id, isPrice])
      window.$('.catalog-filter').removeClass('visible')
      window.$('body').removeClass('noscroll')
      this.resetButton()
    },
    changeRadioFilterArr (key, id) {
      this.$emit('changeRadioFilterArr', [key, id])
      window.$('.catalog-filter').removeClass('visible')
      window.$('body').removeClass('noscroll')
      this.resetButton()
    },
    clearNamedFilters () {
      this.$emit('clearNamedFilters')
    },
    clearFilters (filterName, isPrice) {
      this.$emit('clearFilters', filterName)
    },
    toggleFilterBox (e) {
      window.$(e.target).parents('.filter-box').toggleClass('visible')
      window.$(e.target).parents('.filter-box').find('.filter-bix__body').toggle()
    },
    checkValue (range, value) {
      if (typeof value === 'string') {
        let newValue = value.replace(/^\.|[^\d.]|\.(?=.*\.)|^0+(?=\d)/g, '')
        this.filters[`price_${range}`] = value.length ? +newValue : this.price_range[`price_${range}`]
        this.setInInput(range)
      }
    },
    setInInput (range) {
      setTimeout(() => {
        let input = window.$(`.js_${range}`)
        if (input.val() !== this.filters[`price_${range}`] + '') {
          input.val(this.filters[`price_${range}`])
        }
      })
    },
    valueInLimits (range, value) {
      switch (range) {
        case 'from':
          return value > this.price_range[`price_${range}`]
        case 'to':
          return value < this.price_range[`price_${range}`]
      }
    },
    setInputPrice (range, value) {
      if (!this.valueInLimits(range, +value)) {
        this.filters[`price_${range}`] = this.price_range[`price_${range}`]
      }
      this.setInInput(range)
      this.$emit('manualPrice')
    },
    resetButton () {
      window.$(document).on('change', '.filter-item input', function () {
        window.$('.filter-box').each(function (i, item) {
          if (window.$(item).find('input').is(':checked')) {
            window.$(item).find('.refresh-filter').addClass('visible')
          } else {
            window.$(item).find('.refresh-filter').removeClass('visible')
          }
        })
      })
    },
    mounted () {
      window.$(document).on('click', '.refresh-filter', function () {
        window.$(this).removeClass('visible')
      })
    }
  }
}
</script>

<style>
  .filter-box.price:before {
    display: none;
  }
</style>
