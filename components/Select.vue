<template>
  <select><slot></slot></select>
</template>

<script>
  export default {
    props: {
      value: [String, Number],
      name: {
        type: String,
        required: true
      },
      error: {
        type: String
      },
      onChange: {
        type: Function,
        default: () => {}
      }
    },
    watch: {
      value (value) {
        this.reload(value)
        this.onChange(value)
      }
    },
    methods: {
      reload (value) {
        const select = window.$(this.$el)
        select.val(value || this.value)
        select.material_select('destroy')
        select.material_select()
      }
    },
    mounted () {
      let vm = this
      let select = window.$(this.$el)
      select
        .val(this.value)
        .on('change', function () {
          vm.$emit('input', this.value)
        })
      select.material_select()
    },
    updated () {
      this.reload()
    },
    destroyed () {
      window.$(this.$el).material_select('destroy')
    }
  }
</script>
