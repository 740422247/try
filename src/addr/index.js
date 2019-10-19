import addr from './addr'
import addrFun from './fun'

export default (Vue) => {
  // Vue.component(addr.name, addr)
  Vue.prototype.$addrFun = addrFun
}

