<template>
  <div id="tab5" class="tab-box">
    <photo-slider
      :className="'packingImages'"
      :object="packingPhotoPage"
      :pathOfImgUrl="'posts'"
      :galleryClassName="'gal-photos'"
    ></photo-slider>
  </div>
</template>

<script>
import ImageHelper from '../../helpers/ImageHelper'
import { mapGetters } from 'vuex'
import { packingPhotoUrl } from '../../enum'
import PhotoSlider from '../../components/PhotoSlider.vue'

export default {
  data () {
    return {
      packingPhotoUrl
    }
  },
  mixins: [ImageHelper],
  components: {
    'photo-slider': PhotoSlider
  },
  computed: {
    ...mapGetters(['contentPages']),
    packingPhotoPage () {
      return this.contentPages && this.contentPages.length ? this.contentPages.filter((p) => p.alias === packingPhotoUrl)[0] : null
    }
  },
  methods: {
  },
  mounted () {
    this.initZoomJQuery('packingImages', 'gal-photos')
  }
}
</script>

