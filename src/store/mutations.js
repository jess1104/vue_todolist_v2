const mutations = {
  setTodos(state, todos) {
    state.todos = todos;
  },
  createTodos(state, inputValue) {
    state.todos.push(inputValue);
  },
  updateTodo(state, { id, content }) {
    const updateData = state.todos.map((item) => {
      if (item.id === id) {
        item.content = content;
      }
      return item;
    });
    state.todos = updateData;
  },
  deleteTodo(state, { id }) {
    const delateData = state.todos.filter((item) => {
      return item.id !== id;
    });
    state.todos = delateData;
  },
  checkTodo(state, { id }) {
    const checkData = state.todos.map((item) => {
      if (item.id === id) {
        item.done = !item.done;
      }
      return item;
    });
    state.todos = checkData;
  },
  upTodo(state, upIndex) {
    const upData = state.todos.map((item, index) => {
      if (index === upIndex - 1) {
        return state.todos[upIndex];
      }
      if (index === upIndex) {
        return state.todos[upIndex - 1];
      }
      return item;
    });
    state.todos = upData;
  },
  downTodo(state, downIndex) {
    let downData = state.todos.map((item, index) => {
      if (index === downIndex + 1) {
        return state.todos[downIndex];
      }
      if (index === downIndex) {
        return state.todos[downIndex + 1];
      }
      return item;
    });
    state.todos = downData;
  },
};
export default mutations;
