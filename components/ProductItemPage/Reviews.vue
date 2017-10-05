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
    <!-- <div class="add-testimonials contact-form-sect">
      <div class="head-contact">Оставьте отзыв о данном товаре<span>Мы хотели бы узнать Ваше мнение.</span></div>
      <form class="js_validate align-center" @submit.prevent="sendProductReview()">
        <div class="row">
          <div class="col l12 s12">
            <div :data-error="errorMsg" :data-recheck="recheckMsg" class="input-field required-field"><span class="label-field"> ФИО*</span>
              <input type="text" v-model="name" required data-validate="text">
            </div>
          </div>
          <div class="col l12 s12">
            <div :data-error="errorMsg" :data-recheck="recheckMsg" class="input-field required-field"><span class="label-field"> Email*</span>
              <input type="email" v-model="email" required data-validate="email">
            </div>
          </div>
          <div class="col l12 s12">
            <div :data-error="errorMsg" :data-recheck="recheckMsg" class="input-field required-field"><span class="label-field"> Ваш отзыв*</span>
              <textarea v-model="message" required class="materialize-textarea" data-validate="text"></textarea>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn--brown waves-effect waves-light">Отправить</button>
      </form>
    </div>
    <div id="modal-review" class="modal">
      <div class="modal-content"><span class="modal-action modal-close modal-close--top icon-cancel"></span>
        <div class="modal-body">
          <h3 class="align-center">Ваш отзыв отправлен</h3>
          
        </div>
        <div class="modal-foot clearfix">
          <span class="btn waves-effect waves-light modal-close"><span class="icon-16-arrow-link"></span>Ок</span>
        </div>
      </div>
    </div>
    <div id="modal-review-error" class="modal">
      <div class="modal-content"><span class="modal-action modal-close modal-close--top icon-cancel"></span>
        <div class="modal-body">
          <h3 class="align-center">Сервер не отвечает, попробуйте позже</h3>
          
        </div>
        <div class="modal-foot clearfix">
          <span class="btn waves-effect waves-light modal-close"><span class="icon-16-arrow-link"></span>Закрыть</span>
        </div>
      </div>
    </div> -->
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
