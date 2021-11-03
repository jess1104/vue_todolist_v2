const mutations = {
  setTodos(state, todos) {
    state.todos = todos;
  },
  createTodos(state, payload) {
    state.todos.push(payload);
  },
};
export default mutations;
