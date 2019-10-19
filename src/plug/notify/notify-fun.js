import Notify from './notify'

export default {
  extends: Notify,
  props: {
    content: {
      type: String,
    },
    btn: {
      type: String
    },
    containerStyle: {
      type: Object
    }
  },
  data: () => ({
    show: false,
    text: '暂无提示内容',
    btnTxt: 'OK'
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.show = true;
      this.text = this.content ? this.content : this.text;
      this.btnTxt = this.btn ? this.btn : this.btnTxt;
    },
    afterLeave() {
      this.$emit('closed')
    }
  }
}
