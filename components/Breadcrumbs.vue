<template>
  <div class="breadcrumbs">
    <ul>
      <li>
        <router-link to="/">
          Главная
        </router-link>
      </li>
      <li v-for="(breadcrumb, index) in breadcrumbs.way" v-bind:key="index">
        <template v-if="breadcrumb.locale">
          <router-link
            :to="{ name: `${breadcrumb.categoryName}`, params: categoryParams(breadcrumb, index) }"
            v-if="index < wayLength">
            {{breadcrumb.locale.name}}
          </router-link>

          <span v-else>{{breadcrumb.locale && breadcrumb.locale.name}}</span>
        </template>
        <template v-else>
          <router-link
            :to="{ name: `${breadcrumb.template}` }"
            v-if="index < wayLength">
            {{breadcrumb.name}}
          </router-link>

          <span v-else>{{breadcrumb.name}}</span>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'breadcrumbs',
  props: ['breadcrumbs'],
  computed: {
    wayLength () {
      return this.breadcrumbs.way.length - 1
    }
  },
  methods: {
    categoryParams (breadcrumb, index) {
      if (index < this.wayLength && index === 0) {
        return {
          'category_alias': `${breadcrumb.alias}`
        }
      } else if (index < this.wayLength && index === 1) {
        return {
          'category_alias': this.breadcrumbs.way[0].alias,
          'subcategory_alias': `${breadcrumb.alias}`
        }
      } else if (index < this.wayLength && index === 2) {
        return {
          'category_alias': this.breadcrumbs.way[0].alias,
          'subcategory_alias': this.breadcrumbs.way[1].alias,
          'subCategoryChild': `${breadcrumb.alias}`
        }
      }
    }
  }
}
</script>
