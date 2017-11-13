<template>
  <section class="found-page">
    <div class="container">
      <div class="found-container">
        <div class="txt-404"><span>404</span>ошибка</div>
        <div class="found-icon"><span class="icon-ico-dostavka-page-02"></span></div>Страница не найдена или не верно задан адрес
        <br>
        <button @click.prevent="reloadPage()" class="btn btn--brown waves-effect waves-light">
          На главную
        </button>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  methods: {
    reloadPage () {
      document.location.reload(true)
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
  }
</style>
