<template>
  <div id="tab4" class="tab-box">
    <div v-if="reviews && reviews.length" class="product-tab-head">Отзывы</div>
    <div v-else class="product-tab-head">Здесть пока нет отзывов</div>
    <div v-for="review in reviews" class="testi-item">
      <div class="testi-item__txt">
        {{review.formatted_body}}
        <div class="testi-author">— {{review.name}}<span>{{filterData(review.created_at)}}</span></div>
      </div>
    </div>

    <!-- reviews form -->
    <review-form
      :sendReview="sendProductReview"
      :title="'Оставьте отзыв о данном товаре'"
      :subTitle="'Мы хотели бы узнать Ваше мнение.'"
    ></review-form>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/ru'
import 'moment/locale/uk'
import {mapGetters, mapActions} from 'vuex'
import MsgHelper from '../../helpers/MsgHelper'
import ReviewForm from '../../components/ReviewForm'

export default {
  props: ['reviews', 'locale'],
  data () {
    return {
      lang: 'ru',
      name: '',
      email: '',
      message: ''
    }
  },
  mixins: [MsgHelper],
  components: {
    'review-form': ReviewForm
  },
  computed: {
    ...mapGetters(['review']),
    errorMsg () {
      return this.locale ? this.localesRequiredField[this.locale] : ''
    },
    recheckMsg () {
      return this.locale ? this.localesErrorText[this.locale] : ''
    }
  },
  methods: {
    ...mapActions(['sendReviewForProduct']),
    filterData (date) {
      let d = date instanceof Object ? date.date : date
      return moment(d).locale(this.lang).format('DD MMMM YYYY')
    },
    sendProductReview (data) {
      this.sendReviewForProduct([data, this.$route.path])
        .then((res) => {
          if (res.status === 200) {
            window.$('#modal-review-error').modal('close')
            window.$('#modal-review').modal('open')
            this.name = this.email = this.message = ''
          } else {
            window.$('#modal-review').modal('close')
            window.$('#modal-review-error').modal('open')
          }
        })
        .catch((error) => {
          console.log('[sendReview error]: ', error.response)
          window.$('#modal-review').modal('close')
          window.$('#modal-review-error').modal('open')
        })
    }
  },
  mounted () {
    window.$('#modal-review, #modal-review-error').modal({
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

<style>
  #modal-review, #modal-review-error {
    padding: 20px;
    max-width: 500px;
  }
  #modal-review .modal-foot, #modal-review-error .modal-foot {
    text-align: center;
  }
</style>
