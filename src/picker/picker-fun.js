import Picker from './picker'

export default {
  extends: Picker,
  props: {
    layer: {
      type: Number
    },
    callback: {
      type: Function || Array
    },
    result: {
      type: Function
    },
    addr: { type: Array }
  },
  data: () => ({
    sh: {
      width: '0px'
    },
    pickerItem: {
      width: '0px'
    },
    picker_content: {
      width: '0px'
    },
    itemData: [],
    selectData: [],
    flat: 0,
    allowRefreshDom: true
  }),
  mounted() {
    this.up();
    this.init()
  },
  updated() {
    if (this.allowRefreshDom) {
      this.dealNext(0)
      this.allowRefreshDom = false
    }
  },
  methods: {
    up() {
      this.show = true
    },
    init() {
      this.addr && (this.selectData = this.addr)

      // 处理子集宽度
      this.sh.width = this.getItemWidth() + 'px'
      this.pickerItem.width = this.getItemWidth() + 10 + 'px'
      this.picker_content.width = this.getItemWidth() * this.layer + 'px'
      // for(let i=0;i<this.layer;i++){this.itemData[i] = []}
      this.callback();
    },
    // 获取动态宽度
    getItemWidth() {
      const clientWidth = this.getClientWidth();
      if (!this.layer) {
        return clientWidth;
      } else if (this.layer <= 3) {
        return clientWidth / this.layer;
      } else {
        return clientWidth / 3;
      }
    },
    //获取设备宽度
    getClientWidth() {
      return window.screen.width;
    },
    // 刷新页面
    refresh(data, flat) {
      if (flat) {
        this.flat = flat
      }
      if (!data || flat === this.layer) {
        this.show = false;
        this.result(this.getResult());
        return;
      }
      this.itemData[this.flat] = data;
      this.itemData = this.itemData.slice(0, this.flat + 1);
      this.selectData = this.selectData.slice(0, this.flat + 1);
      for (let i = this.flat + 1; i < this.layer; i++) {
        this.itemData[i] = []
      };
      this.dealNext(this.flat);
      this.flat++;
    },
    // 点击地址
    check(data, index) {
      document.querySelector('.picker_select[dataindex="' + index + '"]').classList.add('active');
      document.querySelector('.scroll_hidden[dataindex="' + index + '"] .picker_select_text').innerHTML = data.text;
      var dom = document.querySelectorAll('.scroll_hidden[dataindex="' + index + '"] .picker_item li.active');
      if (!(dom.length === 0)) {
        dom[0].setAttribute('class', '');
      }
      document.querySelector('.picker_item li[dataId="' + index + data.value + '"]').setAttribute('class', 'active');
      this.selectData[this.flat - 1] = data;
      this.refresh(this.itemData[0], index + 1);
      this.isSwipe(index + 1)
    },

    // 检测是否需要右滑
    isSwipe(index) {
      if (!(index % 3)) {
        const left = this.swipeLeft('left');
        document.querySelector('.picker_content').style.left = left + 'px';
      }
    },
    // 滑动功能
    swipeLeft(flat) {
      const clientWidth = this.getClientWidth();
      const currLeft =
        document.querySelector('.picker_content').style.left
          ? parseInt(document.querySelector('.picker_content').style.left)
          : 0;
      const contentWidth = parseInt(this.picker_content.width);
      // console.log(parseInt(this.picker_content.width))
      if (flat === 'left') {
        if (clientWidth * 2 + currLeft < contentWidth) {
          return currLeft - this.getItemWidth() * 3
        } else {
          const left = contentWidth - (this.getItemWidth() * 3 - currLeft)
          return currLeft - left;
        }
      }
    },

    // 处理后续  picker_select效果
    dealNext(flat) {
      for (let i = flat; i < this.layer; i++) {
        let text = '请选择'
        if (this.allowRefreshDom) {
          text = this.addr[i] ? this.addr[i].text : '请选择'
        }
        document.querySelector('.picker_select[dataindex="' + i + '"]') && document.querySelector('.picker_select[dataindex="' + i + '"]').classList.remove('active');
        document.querySelector('.scroll_hidden[dataindex="' + i + '"] .picker_select_text')
          && (document.querySelector('.scroll_hidden[dataindex="' + i + '"] .picker_select_text').innerHTML = text)
        var dom = document.querySelectorAll('.scroll_hidden[dataindex="' + i + '"] .picker_item li.active');
        if (!(dom.length === 0)) {
          dom[0].setAttribute('class', '');
        }
      }
    },

    // 获取结果
    getResult() {
      return this.selectData
    }

  }
}
