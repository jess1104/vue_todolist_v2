import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    todos: [
      { id: 1, content: 123, done: false },
      { id: 2, content: 456, done: true },
      { id: 3, content: 789, done: false },
    ],
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },
  },
  actions: {
    createData({ commit, state }, payload) {
      const newtodos = state.todos;
      newtodos.push(payload);
      commit("setTodos", newtodos);
    },
    readTodos({ commit, state }) {
      // 第一次讀取
      const todos = state.todos;
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
      if (payload.index <= 0) {
        return;
      }
      const upData = [...state.todos];
      const temp = upData[payload.index];
      upData[payload.index] = upData[payload.index - 1];
      upData[payload.index - 1] = temp;
      commit("setTodos", upData);
    },
    downRecord({ commit, state }, payload) {
      const downData = [...state.todos];
      if (payload.index >= downData.length - 1) {
        return;
      }
      const temp = downData[payload.index];
      downData[payload.index] = downData[payload.index + 1];
      downData[payload.index + 1] = temp;
      commit("setTodos", downData);
    },
  },
});
