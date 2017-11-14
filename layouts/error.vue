<template>
  <section class="found-page">
    <div class="container">
      <div class="found-container">
        <div class="txt-404"><span>404</span>ошибка</div>
        <div class="found-icon"><span class="icon-ico-dostavka-page-02"></span></div>Страница не найдена или не верно задан адрес
        <br>
        <div class="header-search">
          <b>Информация переместилась. Воспользуйтесь поиском. Или свяжитесь с нашим менеджером по телефону</b>
          <form @submit.prevent="searchFunction()">
            <button type="submit"><span class="icon-search"></span></button>
            <input type="text" value="" v-model="subString" placeholder="Что вы ищете?" @input="inputSearch()">
          </form>
        </div>
        <br>
        <router-link to='/' class="btn btn--brown waves-effect waves-light">
          На главную
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        subString: ''
      }
    },
    methods: {
      ...mapActions(['searchByString']),
      searchFunction () {
        if (this.subString.length > 2) {
          this.$router.push({name: 'SearchPage', query: { search: this.subString }})
          window.$('.menu-button-general').sideNav('hide')
          this.subString = ''
        } else {
          alert('Поиск от трёх символов')
        }
      },
      inputSearch () {
        this.subString.length > 2 && this.searchByString([this.subString, {limit: 5}])
      }
    }
  }
</script>

<style>
  .found-page {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
  }
</style>
