import Vue from 'vue'
import mixin from './mixin'

let mixins = new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    // console.log(this.$data)
  }
})


export default mixin
