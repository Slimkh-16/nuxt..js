<template>
  <components :is="component"></components>
</template>

<script>
// See https://vuejs.org/v2/guide/components.html#Advanced-Async-Components
import urlsList from '../helpers/urlsList'

const getPost = (slug) => ({
  component: import(`./${slug}`),
  error: require('./Posts.vue')
})
export default {
  beforeCreate () {
    this.component = () => getPost(this.$store.state.slug)
  },
  async asyncData ({store, route}) {
    if (!Object.keys(urlsList.urlList).length) {
      await store.dispatch('fetchMenu')
    }

    if (!Object.keys(urlsList.contentPagesList).length) {
      await store.dispatch('fetchContentPage')
    }

    if (urlsList.urlList[route.path]) {
      store.state.slug = '_category_alias/index.vue'
      let res = []
      res = await Promise.all([
        store.dispatch('fetchBreadcrumbs', route.path.slice(1, route.path.length)),
        store.dispatch('getMeta', route.fullPath),
        store.dispatch('setCatId', route.path.slice(1, route.path.length)),
        store.dispatch('fetchFilters'),
        store.dispatch('fetchProductList')
      ])
      // seo module
      if (res[1] && res[1].locale) {
        let r = res[1]
        store.state.categoryMeta = {
          seo_title: r.locale.title,
          seo_keywords: r.locale.keywords,
          seo_description: r.locale.description,
          seo_canonical: r.locale.canonical,
          seo_robots: r.locale.robots,
          seoTitle: r.locale.title,
          seoContent: r.locale.content
        }
      // seo from category
      } else {
        let b = res[0]
        let r = b ? b[b.length - 1] : {locale: {}}
        store.state.categoryMeta = {
          seo_title: r.locale.seo_title,
          seo_keywords: r.locale.seo_keywords,
          seo_description: r.locale.seo_description,
          seo_canonical: r.locale.seo_canonical,
          seo_robots: r.locale.seo_robots,
          seoTitle: r.locale.seo_title,
          seoContent: r.locale.formatted_description
        }
      }
    } else if (urlsList.contentPagesList[route.path]) {
      store.state.slug = 'ContentPage/ContentPage.vue'
      await store.dispatch('fetchContentPage')
    } else {
      store.state.slug = 'ProductItemPage/ProductItemPage.vue'
      await store.dispatch('fetchProduct', route.path)
    }
  }
  /* head () {
    console.log('head from components')
    return {
      title: 'this.currentPage && this.currentPage.locale.seo_title',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'this.currentPage && this.currentPage.locale.seo_description'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'this.currentPage && this.currentPage.locale.seo_keywords'
        },
        {
          hid: 'robots',
          name: 'robots',
          content: 'this.currentPage && this.currentPage.locale.seo_robots'
        }
      ],
      link: [
        { rel: 'canonical', href: 'this.currentPage && this.currentPage.locale.seo_canonical' }
      ]
    }
  } */
}
</script>
