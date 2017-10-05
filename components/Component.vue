<template>
  <div>some text</div>
</template>

<script>
// See https://vuejs.org/v2/guide/components.html#Advanced-Async-Components
/* const getPost = (slug) => ({
  component: import(`./${slug}`),
  error: require('./Posts.vue')
}) */
export default {
  /* beforeCreate () {
    this.component = () => getPost('_category_alias/index.vue')
  }, */
  /* beforeMount () {
    if (this.$route.name === 'component') {
      this.$router.push({name: 'Content page', params: {'alias': this.$route.path.slice(1, this.$route.path.length)}})
      console.log('push')
    }
    console.log(this.$route.path.slice(1, this.$route.path.length), this.$route.name)
  } */
}
</script>