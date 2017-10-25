import * as config from '../config/index'

export default {
  methods: {
    url () {
      return config.url
    },
    coverImg (product) {
      if (product && product.cover && product.cover.image_url) {
        return product.cover.image_url
      } else {
        if (product && product.images && product.images.length) {
          return product.images[0].image_url
        } else {
          return product.empty_image
        }
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
