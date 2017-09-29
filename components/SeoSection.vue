<template>
  <section class="seo-section">
    <div class="container">
      <h1 class="h1">{{seoTitle}}</h1>
      <p v-html="seoContent"></p>
      <p v-html="seoIntrotext"></p>
    </div>
  </section>
</template>
<script>
export default {
  name: 'seo-section',
  props: ['seoContent', 'seoTitle', 'seoIntrotext']
}
</script>
