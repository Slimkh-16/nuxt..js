<template>
  <section class="seo-section">
    <div class="container">
      <h1 class="h1">{{seoTitle}}</h1>
      <div v-html="seoContent"></div>
      <div v-html="seoIntrotext"></div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'seo-section',
  props: ['seoContent', 'seoTitle', 'seoIntrotext']
}
</script>
