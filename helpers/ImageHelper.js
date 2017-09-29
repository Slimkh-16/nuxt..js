import * as config from '../config/index'

export default {
  methods: {
    url () {
      return config.url
    },
    coverImg (product) {
      if (product && product.images && product.images.length) {
        let cover = product.images.filter((i) => i.cover === 1)[0]
        return cover || product.images[0]
      }
    },
    initZoomJQuery (className, galleryClassName) {
      setTimeout(() => {
        window.$(`.${className} .product-big-images img`).elevateZoom({
          gallery: galleryClassName,
          cursor: 'pointer',
          galleryActiveClass: 'active',
          zoomType: 'lens',
          lensShape: 'round',
          lensSize: 255,
          imageCrossfade: true
        })
      }, 500)
    }
  }
}
