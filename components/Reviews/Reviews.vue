<template>
  <!--testimonials section-->
  <section class="testimonials-page">
    <div class="container">
      <div class="big-heading">Отзывы</div>
      <div class="testi-cont">
        <reviews-box
          :reviews="reviews"
          :lang="lang"
        ></reviews-box>
      </div>
      <!-- pagination -->
      <div class="clearfix align-right">
        <pagination :current-page="currentPageReviewsForSite"
                    :total-items="totalReviewsForSite"
                    :itemsPerPage="itemsPerPageReviewsForSite"
                    @page-changed="pageChanged"></pagination>
      </div>
      <!-- reviews form -->
      <review-form
        :sendReview="sendReview"
        :title="'Оставьте отзыв о работе с нами'"
        :subTitle="'Мы хотели бы узнать Ваше мнение о сайте. Будем очень признательны если Вы ответите на несколько вопросов в небольшой анкете.'"
      ></review-form>
    </div>
  </section>
</template>
<script>
  /* import moment from 'moment'
  import 'moment/locale/ru'
  import 'moment/locale/uk' */
  import { mapGetters, mapActions } from 'vuex'
  import ReviewForm from '../../components/ReviewForm'
  import Pagination from '../../components/Pagination.vue'
  import ReviewsBox from '../../components/ReviewsBox.vue'

  export default {
    data () {
      return {
        lang: 'ru'
      }
    },
    components: {
      'review-form': ReviewForm,
      'pagination': Pagination,
      'reviews-box': ReviewsBox
    },
    computed: {
      ...mapGetters(['reviews', 'totalReviewsForSite', 'currentPageReviewsForSite', 'itemsPerPageReviewsForSite'])
    },
    methods: {
      ...mapActions(['fetchReviews', 'sendReviewForSite']),
      sendReview (data) {
        this.sendReviewForSite(data)
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
      },
      pageChanged (page) {
        this.fetchReviews({limit: 6, page})
      }
    },
    async asyncData ({store, route}) {
      let res = []
      res = await Promise.all([
        store.dispatch('getMeta', route.path),
        store.dispatch('fetchReviews', {limit: 6, page: 1})
      ])
      // seo module
      if (res[0] && res[0].locale) {
        let r = res[0]
        return {
          seo_title: r.locale.title,
          seo_keywords: r.locale.keywords,
          seo_description: r.locale.description,
          seo_canonical: r.locale.canonical,
          seo_robots: r.locale.srobots,
          seoTitle: r.locale.title,
          seoContent: r.locale.content
        }
        // seo from category
      } else {
        return {
          seo_title: 'Eurogold',
          seo_keywords: null,
          seo_description: null,
          seo_canonical: null,
          seo_robots: 'index, follow',
          seoTitle: '',
          seoContent: ''
        }
      }
    },
    head () {
      return {
        title: this.seo_title && this.seo_title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.seo_description && this.seo_description
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: this.seo_keywords && this.seo_keywords
          },
          {
            hid: 'robots',
            name: 'robots',
            content: this.seo_robots && this.seo_robots
          }
        ],
        link: [
          { rel: 'canonical', href: this.seo_canonical && this.seo_canonical }
        ]
      }
    },
    mounted () {
      // this.fetchReviews({limit: 6, page: 1})
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
