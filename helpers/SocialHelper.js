import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['settings'])
  },
  methods: {
    getObjectByKey (str) {
      return this.settings && this.settings.length ? this.settings.filter((o) => o.key === str)[0] : null
    }
  }
}
