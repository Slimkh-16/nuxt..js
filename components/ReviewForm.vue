<template>
  <div>
    <div class="contact-form-sect" :class="{ 'add-testimonials': !showPhone }">
      <div class="head-contact">{{title}}<span>{{subTitle}}</span></div>
      <form class="js_validate align-center" @submit.prevent="() => {sendReview(getData()), resetData()}">
        <div class="row">
          <div class="col l12 s12">
            <div :data-error="errorMsg" :data-recheck="recheckMsg" class="input-field required-field"><span class="label-field"> ФИО*</span>
              <input type="text" v-model="name" required data-validate="text">
            </div>
          </div>
          <template v-if="showPhone">
            <div class="col l6 s12">
              <div :data-error="errorMsg" :data-recheck="recheckMsg" class="input-field required-field"><span class="label-field"> Email*</span>
                <input type="email" v-model="email" required data-validate="email">
              </div>
            </div>
            <div class="col l6 s12">
              <div :data-error="errorMsg" :data-recheck="recheckMsg" class="input-field required-field"><span class="label-field"> Телефон*</span>
                <input type="tel" v-model="phone" required data-validate="phone">
              </div>
            </div>
          </template>
          <template v-else>
            <div class="col l12 s12">
              <div :data-error="errorMsg" :data-recheck="recheckMsg" class="input-field required-field"><span class="label-field"> Email*</span>
                <input type="email" v-model="email" required data-validate="email">
              </div>
            </div>
          </template>
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
    </div>
  </div>
</template>

<script>
  import MsgHelper from '../helpers/MsgHelper'

  export default {
    props: ['sendReview', 'title', 'subTitle', 'showPhone'],
    mixins: [MsgHelper],
    data () {
      return {
        locale: 'ru',
        name: '',
        email: '',
        message: '',
        phone: ''
      }
    },
    computed: {
      errorMsg () {
        return this.locale ? this.localesRequiredField[this.locale] : ''
      },
      recheckMsg () {
        return this.locale ? this.localesErrorText[this.locale] : ''
      }
    },
    methods: {
      getData () {
        return this.showPhone ? {
          name: this.name,
          email: this.email,
          body: this.message,
          phone: this.phone
        } : {
          name: this.name,
          email: this.email,
          body: this.message
        }
      },
      resetData () {
        this.name = ''
        this.email = ''
        this.message = ''
        this.phone = ''
      }
    }
  }
</script>
