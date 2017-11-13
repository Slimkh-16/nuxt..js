<template>
  <div class="row">
    <div v-for="review in reviews" :key="review.id" class="col l6 s12">
      <div class="testi-item">
        <div class="testi-item__img"></div>
        <div class="testi-item__txt">{{hiddenText(review.formatted_body)}}</div>
        <router-link v-if="isMain && review.formatted_body.length > 200" :to="{ name: 'Reviews' }" class="all-testi">
          Читать отзыв полностью
        </router-link>
        <div class="testi-author">
          — {{review.name}}
          <span>{{filterData(review.created_at)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/ru'
import 'moment/locale/uk'
export default {
  props: ['reviews', 'lang', 'isMain'],
  methods: {
    filterData (date) {
      let d = date instanceof Object ? date.date : date
      return moment(d).locale(this.lang).format('DD MMMM YYYY')
    },
    hiddenText (text) {
      if (text.length > 200 && this.isMain) {
        return `${text.slice(0, 200)}...`
      } else {
        return text
      }
    }
  }
}
</script>
