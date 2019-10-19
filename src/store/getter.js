
import state from './state'

let getter = {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  },
  getById: state => (id) => state.todos.find(item => item.id === id)
}

export default getter
