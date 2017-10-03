<template>
  <ul>
    <li v-for="link in socialArray" v-if="getObjectByKey(link)" :key="link">
      <a :href="getObjectByKey(link).value" target="_blank" :class="`icon-${link.split('_')[1]}`"></span>{{getObjectByKey(link).description}}</a>
    </li>
  </ul>
</template>

<script>
import SocialHelper from '../helpers/SocialHelper'

export default {
  data () {
    return {
      socialArray: ['social_vk', 'social_facebook', 'social_twitter', 'social_google_plus', 'social_youtube', 'social_instagram', 'social_pinterest', 'social_tumblr']
    }
  },
  mixins: [SocialHelper]
}
</script>
