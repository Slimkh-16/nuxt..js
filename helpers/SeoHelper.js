export default {
  computed: {
    keywords () {
      return window.$('meta[name="keywords"]')
    },
    description () {
      return window.$('meta[name="description"]')
    },
    robots () {
      return window.$('meta[name="robots"]')
    },
    canonical () {
      return window.$('link[rel="canonical"]')
    },
    title () {
      return window.$('head title')
    },
    defaultTitle () {
      return 'Eurogold'
    }
  },
  methods: {
    setMetaIntoPage (obj) {
      /**
       * @params => obj {
          title: String,
          keywords: String,
          description: String,
          canonical: String,
          robots: String
        }
      */
      obj.title && obj.title.length ? this.title.text(obj.title) : this.title.text(this.defaultTitle)
      obj.keywords && obj.keywords.length ? this.keywords.attr('content', obj.keywords) : this.keywords.attr('content', '')
      obj.canonical && obj.canonical.length ? this.canonical.attr('href', obj.canonical) : this.canonical.attr('href', undefined)
      obj.description && obj.description.length ? this.description.attr('content', obj.description) : this.description.attr('content', '')
      obj.robots && obj.robots.length ? this.robots.attr('content', obj.robots) : this.robots.attr('content', '')
    }
  }
}
