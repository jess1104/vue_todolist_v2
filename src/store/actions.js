const actions = {
  createData({ commit }, inputValue) {
    commit("createTodos", inputValue);
  },
  readTodos({ commit, state }) {
    // 第一次讀取
    const todos = state.todos.map((item) => {
      return item;
    });
    // 寫入state
    commit("setTodos", todos);
  },
  updateData({ commit }, { id, content }) {
    commit("updateTodo", { id, content });
  },
  deleteData({ commit }, { id }) {
    commit("deleteTodo", { id });
  },
  checkData({ commit }, { id }) {
    commit("checkTodo", { id });
  },

  upRecord({ commit }, upIndex) {
    commit("upTodo", upIndex);
  },
  downRecord({ commit }, downIndex) {
    commit("downTodo", downIndex);
  },
};
export default actions;
