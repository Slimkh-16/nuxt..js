<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="container">
        <div class="row foot-top">

          <div class="col l3 m6 s12">
            <div class="foot-nav">
              <div class="foot-nav__head">Каталог</div>
              <ul>
                <li v-for="link in menu">
                  <!-- link -->
                  <router-link :to="{ name: 'category_alias', params: { 'category_alias' : link.alias}}">
                    {{link.locales[0].name}}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>

          <div class="col l3 m6 s12">
            <div class="foot-nav">
              <div class="foot-nav__head">Помощь клиентам</div>
              <ul>
                <li v-for="page in contentPages" v-if="page.is_footer"><router-link :to="{ name: 'Content page' , params : {alias : page.alias}}">{{page.title}}</router-link></li>
              </ul>
            </div>
          </div>

          <div class="col l3 m6 s12">
            <div class="foot-nav">
              <div class="foot-nav__head">О магазине</div>
              <ul>
                <li><router-link :to="{ name: 'ContactsPage' }">Контакты</router-link></li>
                <li><router-link :to="{ name: 'Stores' }">Наши магазины</router-link></li>
                <li><router-link :to="{ name: 'Reviews' }">Отзывы</router-link></li>
              </ul>
            </div>
          </div>

          <div class="col l3 m6 s12">
            <div class="foot-nav">
              <div class="foot-nav__head">Новости  Eurogold</div>
              <ul>
                <li><router-link :to="{ name: 'news'}">Новости</router-link></li>
                <li><router-link :to="{ name: 'Articles'}">Статьи и обзоры</router-link></li>
              </ul>
            </div>
            <div class="social">
              <social-list></social-list>
            </div>
          </div>
        </div>
        <div class="row foot-bottom">
          <div class="col l9 m6 s12">
            <p>Служба поддержки: {{getObjectByKey('support_phone') && getObjectByKey('support_phone').value}} ({{getObjectByKey('support_time') && getObjectByKey('support_time').value}})</p>
            <p>© 2013-<span class="yearN">2017</span> Все права защищены. Право на использование торговой марки EUROGOLD принадлежит ИП "Коровин Е.Н."</p>
            <p>Все материалы, представленные на сайте, являются собственностью ИМ "Коровин Е.Н." Любое использование этих материалов на других сайтах, в социальных сетях, в электронном или печатном виде запрещено законодательством Российской Федерации.</p>
          </div>
          <div class="col l3 m6 s12">
            <p>Мы принимаем к оплате:</p><img src="../assets/images/foot.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import SocialList from './SocialList'
import SocialHelper from '../helpers/SocialHelper'
import { mapGetters } from 'vuex'

export default {
  props: ['menu'],
  mixins: [SocialHelper],
  computed: {
    ...mapGetters(['settings', 'contentPages'])
  },
  components: {
    'social-list': SocialList
  }
}
</script>

<style>
/*.footer {*/
  /*display: block;*/
/*}*/
[class*='icon-']:before {
  margin-right: 10px;
}
</style>
