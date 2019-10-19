import state from './state'

const mutations = {
  increment (state,num) {
    state.count += num
  },
  subtract (state,payLoad){
    state.count-=payLoad.num
  }
}

export default mutations
