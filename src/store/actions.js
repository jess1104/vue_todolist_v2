const actions = {
  createData({ commit }, payload) {
    commit("createTodos", payload);
  },
  readTodos({ commit, state }) {
    // 第一次讀取
    const todos = state.todos.map((item) => {
      return item;
    });
    // 寫入state
    commit("setTodos", todos);
  },
  updateTodo({ commit, state }, payload) {
    const updateData = state.todos.map((item) => {
      if (item.id === payload.id) {
        item.content = payload.content;
      }
      return item;
    });
    commit("setTodos", updateData);
  },
  deleteTodo({ commit, state }, payload) {
    const delateData = state.todos.filter((item) => {
      return item.id !== payload.id;
    });
    commit("setTodos", delateData);
  },
  checkTodo({ commit, state }, payload) {
    const checkData = state.todos.map((item) => {
      if (item.id === payload.id) {
        item.done = !item.done;
      }
      return item;
    });
    commit("setTodos", checkData);
  },
  upRecord({ commit, state }, payload) {
    let upData = state.todos.map((item, index) => {
      if (index === payload.index - 1) {
        return state.todos[payload.index];
      }
      if (index === payload.index) {
        return state.todos[payload.index - 1];
      }
      return item;
    });
    commit("setTodos", upData);
  },
  downRecord({ commit, state }, payload) {
    let downData = state.todos.map((item, index) => {
      if (index === payload.index + 1) {
        return state.todos[payload.index];
      }
      if (index === payload.index) {
        return state.todos[payload.index + 1];
      }
      return item;
    });

    commit("setTodos", downData);
  },
};
export default actions;
