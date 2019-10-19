// import mutation from './mutation'

const actions= {
  incrementAsync ({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit('increment',1)
        resolve()
      }, 1000)
    })
  },
  subtractAsync ({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit({type:'subtract',num:1})
        resolve()
      }, 1000)
    })
  }
}
export default actions
