import addr from './addr'

export default {
  extends: addr,
  data: () => ({
    stlye: { bottom: 0 },
    active: false
  }),
  created: function () {
    console.log('data:', this.$data)
  },
  mounted() {
    this.active = true
  },
  methods: {
    afterLeave(msg) {
      console.log('parent', msg)
    }
  }
}
