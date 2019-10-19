import Vue from 'vue'
import addrFun from './picker-fun'

const addrConstructor = Vue.extend(addrFun)

const addrPicker = (options) => {
  const instance = new addrConstructor({
    propsData: { ...options }
  })

  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);

  instance.vm.$on('closed',function(){
    document.body.removeChild(instance.vm.$el)
  })

  return instance

}

export default addrPicker
