<template>
  <div id="cartIsEmptyIndex" class="modal">
    <div class="modal-content"><span class="modal-action modal-close modal-close--top icon-cancel"></span>
      <div class="modal-head">Ваша козина пуста.</div>
      <div class="modal-foot clearfix">
        <span class="waves-effect waves-light modal-close" @click="redirectToMainPage()"><span class="icon-16-arrow-link"></span>Ок</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
