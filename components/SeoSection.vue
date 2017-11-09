<template>
  <section class="seo-section">
    <div class="container">
      <h1 class="h1">{{seoTitle}}</h1>
      <div v-if="seoContent" v-html="seoContent"></div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'seo-section',
  props: ['seoContent', 'seoTitle']
}
</script>
