<template>
  <span> в {{Object.keys(categoriesList).length}} категориях
    <ul class="categoriesList">
        <li v-for="(value, key, index) in categoriesList" :key="index">
          <router-link 
            :to="{ name: `${value && value.breadcrumbs && value.breadcrumbs['categoryName']}`, params: { 'category_alias': value && value.breadcrumbs && value.breadcrumbs['alias']} }"
          >
            {{value && value.breadcrumbs && value.breadcrumbs['locale'].name}} ({{value.count}})
          </router-link>
        </li>
    </ul>
  </span>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  props: ['list'],
  data () {
    return {
      categoriesList: {},
      obj: {}
    }
  },
  computed: {
    ...mapGetters(['menu'])
  },
  methods: {
    ...mapActions(['fetchBreadcrumbs']),
    getRoutForCategory (alias, categoryObj) {
      if (this.menu.length) {
        var categories = this.menu
        var find = _.find(categories, { 'alias': alias })
        if (find) {
          find.categoryName = 'Products alias'
          categoryObj.breadcrumbs = find
        } else {
          _.forEach(categories, function (obj) {
            find = _.find(obj.children, { 'alias': alias })
            if (find) {
              find.categoryName = 'Products subCategory'
              categoryObj.breadcrumbs = find
            } else {
              _.forEach(obj.children, function (childObj) {
                find = _.find(childObj.children, { 'alias': alias })
                if (find) {
                  find.categoryName = 'Products subCategoryChild'
                  categoryObj.breadcrumbs = find
                }
              })
            }
          })
        }
        return true
      } else {
        this.getRoutForCategory(alias, categoryObj)
      }
    }
  },
  watch: {
    list () {
      this.list.forEach((element) => {
        element.categories.forEach((category) => {
          if (this.obj[category.alias]) {
            this.obj[category.alias]['count'] += 1
          } else {
            this.obj[category.alias] = {}
            this.obj[category.alias]['count'] = 1
            this.getRoutForCategory(category.alias, this.obj[category.alias])
          }
        })
      })
      this.categoriesList = this.obj
    }
  }
}
</script>

<style>
  .categoriesList {
    font-size: 14px !important;
  }
</style>

