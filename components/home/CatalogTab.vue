<template>
  <section class="catalog-tab">
    <div class="container">
      <ol class="tabs">
        <li>
          <span class="small-heading">Украшения</span>
        </li>
        <li class="tab">
          <a href="#tab1" :class="{ 'active': activeTab === '1' }" @click.prevent="() => activeTab = '1'">из золота</a>
        </li>
        <li class="tab">
          <a href="#tab2" :class="{ 'active': activeTab === '2' }" @click.prevent="() => activeTab = '2'">из серебра</a>
        </li>
      </ol>

      <!-- tab-content -->
      <tab-content
        :activeTab="activeTab"
        :goldCats="goldCats"
        :silverCats="silverCats"
      />
      <!-- stones -->
      <stones />
    </div>
  </section>
</template>

<script>
import Stones from './Stones.vue'
import TabContent from './TabContent.vue'

export default {
  props: ['goldCats', 'silverCats'],
  data () {
    return {
      activeTab: '1'
    }
  },
  components: {
    'stones': Stones,
    'tab-content': TabContent
  }
}
</script>

