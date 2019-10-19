import Vue from 'vue'
import component from './notify-fun'

const notifyConstructor = Vue.extend(component)
const notifys = []
let index = 0
let timer = undefined

// options配置说明：
// content：显示内容，可以传入html代码片段，可选
// btn：右侧按钮名称，可选
// time：自动关闭时间，单位为毫秒，默认5000
// allow：是否显示多个，true为可显示多个，false为显示一个，默认为true

const notifyFun = (options) => {

  const instance = new notifyConstructor({
    propsData: { ...options, containerStyle: { transform: `translateY(0px)` } }
  });

  instance.vm = instance.$mount();
  if (options.allow) {
    instance.vm.$el.id = 'notify_' + index;
    notifys.push(instance);
    instance.containerStyle = { ...instance.containerStyle, transform: `translateY(-${(notifys.length - 1) * 110}px)` }
    index++;
  } else if (document.querySelector('.notify')) {
    clearTimeout(timer)
    document.body.removeChild(document.querySelector('.notify'))
  }

  document.body.appendChild(instance.vm.$el);

  const t = options.time ? options.time : 5000;

  if (options.allow) {
    instance.timer = setTimeout(function () {
      instance.$deleteDom()
    }, t)
  } else {
    timer = setTimeout(function () {
      document.body.removeChild(document.querySelector('.notify'))
    }, t)
  }



  instance.$on('closed', function () {
    clearTimeout(instance.timer);
    instance.$deleteDom()
  })

  // 关闭并删除dom
  instance.$deleteDom = function () {
    document.body.removeChild(instance.vm.$el)
    notifys.forEach((item, i) => {
      item.$el.id === instance.vm.$el.id && notifys.splice(i, 1) && this.$reset(i)
    });
  }
  // 重置notifys数组
  instance.$reset = function (flat) {
    console.log(flat)
    flat = flat ? flat : 0;
    for (let i = flat; i < notifys.length; i++) {
      notifys[i].containerStyle = { ...instance.containerStyle, transform: `translateY(-${i * 110}px)` }
    }
  }
}

export default notifyFun
