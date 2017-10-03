<template>
  <div class="pagination-section" v-if="totalItems > itemsPerPage">
    <a @click.prevent="pageChanged(1)" :class="[{disabled: this.currentPage == 1}, 'prev-page']">< пред.</a>
    <ul>
      <li v-if="paginationRange.indexOf(1) === -1" :class="[activePage(1), 'page-number']"><a @click.prevent="pageChanged(1)">{{ 1 }}</a></li>
      <li v-for="(n, i) in paginationRange" :class="[activePage(n), 'page-number']" :key="i">
        <a @click.prevent="pageChanged(n)">{{ n }}</a>
      </li>
    </ul>
    <a @click.prevent="pageChanged(lastPage)" :class="[{disabled: this.currentPage == this.lastPage}, 'next-page']">след. ></a>
  </div>
</template>
<script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: Number,
      itemsPerPage: Number,
      totalItems: Number,
      visiblePages: {
        type: Number,
        default: 4,
        coerce: (val) => parseInt(val)
      },
      scrollToTop: {
        type: Function,
        default: () => {
          window.$('body').scrollTop()
        }
      }
    },
    data () {
      return {}
    },
    computed: {
      lastPage () {
        if (this.totalPages) {
          return this.totalPages
        }
        return this.totalItems % this.itemsPerPage === 0
          ? this.totalItems / this.itemsPerPage
          : Math.floor(this.totalItems / this.itemsPerPage) + 1
      },
      paginationRange () {
        let start = this.currentPage - this.visiblePages / 2 <= 0
          ? 1 : this.currentPage + this.visiblePages / 2 > this.lastPage
            ? this.lowerBound(this.lastPage - this.visiblePages + 1, 1)
            : Math.ceil(this.currentPage - this.visiblePages / 2)
        let range = []
        for (let i = 0; i < this.visiblePages && i < this.lastPage; i++) {
          range.push(start + i)
        }
        return range
      }
    },
    methods: {
      pageChanged (pageNum) {
        this.$emit('page-changed', pageNum)
        this.scrollToTop()
      },
      activePage (pageNum) {
        return this.currentPage === pageNum ? 'active' : ''
      },
      lowerBound (num, limit) {
        return num >= limit ? num : limit
      }
    }
  }
</script>

<style>
  .page-number, .prev-page, .next-page {
    cursor: pointer;
  }
  a.disabled {
    opacity: 0;
  }
</style>
