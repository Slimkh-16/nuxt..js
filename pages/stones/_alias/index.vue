<template>
  <!--store section-->
  <section class="stones-page">
    <div class="container">
      <breadcrumbs :breadcrumbs="{way: [{name: currentStone && `Украшения с камнем ${currentStone.locale.name.toLowerCase()}`}]}"></breadcrumbs>
      <div class="big-heading">{{currentStone && `Украшения с камнем ${currentStone.locale.name.toLowerCase()}`}}</div>
      <br>
      <br>
      <div class="row">
        <div v-for="(stone_category, index) in stoneCategories" :key="index" class="col l4 m4 s6">
          <img :src="getImgSrc(stone_category)" :alt="stone_category.locale.name" class="col s4">
          <div v-for="child in stone_category.childrenCategories" :key="child.id" class="col s8">
            <router-link
              :to="`${child.path.join('')}/f/Kamni=${$route.params.alias}`"
              class="filter_link"
            >
              {{child.locale.name}}
            </router-link>
            <br>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '../../../components/Breadcrumbs'
import StoneCategoriesHelper from '../../../helpers/StoneCategoriesHelper'
import ImageHelper from '../../../helpers/ImageHelper'
import SeoHelper from '../../../helpers/SeoHelper'

export default {
  components: {
    'breadcrumbs': Breadcrumbs
  },
  mixins: [StoneCategoriesHelper, ImageHelper, SeoHelper],
  computed: {
    ...mapGetters(['stone_categories', 'stone']),
    currentStone () {
      return this.stone && this.stone.filter((s) => s.alias === this.$route.params.alias)[0]
    },
    stoneCategories () {
      return this.stone_categories && this.parseByParentFromTopCategories(this.stone_categories)
    }
  },
  methods: {
    ...mapActions(['getCategoriesByStone', 'getMeta']),
    imgUrl (postId, imgName) {
      return this.url() + `/assets/images/categories/${postId}/${imgName}`
    },
    getImgSrc (post) {
      let cover = this.coverImg(post)
      return cover
    }
  },
  mounted () {
    this.getCategoriesByStone()
    //    this.getMeta(this.$route.fullPath)
    //      .then((r) => {
    //        console.warn('dfsfsdf', r)
    //        if (r) {
    //          this.setMetaIntoPage({
    //            title: r.locale.title,
    //            keywords: r.locale.keywords,
    //            description: r.locale.description,
    //            canonical: r.locale.canonical,
    //            robots: r.locale.robots
    //          })
    //        } else {
    //          this.setMetaIntoPage({})
    //        }
    //      })
  },
  async asyncData ({store, route}) {
    return {
      postsMeta: await store.dispatch('getMeta', route.fullPath)
    }
  },
  head () {
    return {
      title: this.postsMeta ? this.postsMeta.locale.title : 'Euroglasdkf;s',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.postsMeta ? this.postsMeta.locale.description : ''
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.postsMeta ? this.postsMeta.locale.keywords : ''
        },
        {
          hid: 'robots',
          name: 'robots',
          content: this.postsMeta ? this.postsMeta.locale.robots : 'index, follow'
        }
      ],
      link: [
        { rel: 'canonical', href: this.postsMeta ? this.postsMeta.locale.canonical : '' }
      ]
    }
  }
}
</script>

<style>
  .filter_link {
    font-size: 15px;
  }
</style>
