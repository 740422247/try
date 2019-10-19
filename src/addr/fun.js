import Vue from 'vue'
import component from './fun-addr'

const addrConstructor = Vue.extend(component)
const instances = [];
let seed = 1

const addrFun = (options) => {

  const instance = new addrConstructor({
    propsData: { ...options, style: { bottom: 0 } }
  })
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);


  return instance.vm
}

export default addrFun
