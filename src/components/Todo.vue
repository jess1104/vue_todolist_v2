<template>
  <div class="todo">
    <h1>TO DO LIST</h1>
    <!-- 不想太多歷史紀錄用replace -->
    <router-link to="/all" replace>All</router-link> |
    <router-link to="/active" replace>Active</router-link> |
    <router-link to="/done" replace>Done</router-link> |
    <!-- 輸入事項框 -->
    <div class="top-content">
      <input
        class="top-input"
        type="text"
        placeholder="請輸入新事項"
        v-model.trim="newInput"
        @keyup.enter="addItem()"
      />
      <button class="top-button" @click="addItem()">新增</button>
    </div>
    <ul class="content">
      <!-- 顯示模式/編輯模式 -->
      <li v-for="(item, index) of list" :key="index">
        <!-- 預設edit:null 不等於任何Id所以秀出顯示模式 -->
        <template v-if="edit !== index">
          <div class="input" :class="{ strikeout: item.done }">
            <!-- input 控制資料 true/false -->
            <input
              type="checkbox"
              :checked="item.done"
              @change="checkTodo(item)"
              :id="item.id"
            />
            <label :for="item.id">{{ item.content }}</label>
          </div>
          <div class="button">
            <button @click="edit = index">編輯</button>
            <button @click="deleteTodo(item)">刪除</button>
            <div class="sort-button" v-if="$route.name == 'all'">
              <button @click="upItem({ item, index })">
                <i class="fas fa-chevron-up"></i>
              </button>
              <button @click="downItem({ item, index })">
                <i class="fas fa-chevron-down"></i>
              </button>
            </div>
          </div>
        </template>
        <template v-else>
          <!-- 當edit===tId時就顯示編輯模式 -->
          <div class="input">
            <input type="text" v-model="item.content" />
          </div>
          <div class="button">
            <button @click="edit = null">取消</button>
            <button @click="updateTodoDone(item)">
              確定
            </button>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Todo",
  data() {
    return {
      newInput: "",
      // 是否編輯
      edit: null,
    };
  },
  computed: {
    ...mapState(["todos"]),
    // 去拿store篩選後的getters
    list() {
      if (this.$route.name === "active") {
        return this.todos.filter((item) => {
          return item.done === false;
        });
      } else if (this.$route.name === "done") {
        return this.todos.filter((item) => {
          return item.done === true;
        });
      } else {
        return this.todos;
      }
    },
  },
  methods: {
    ...mapActions([
      "deleteTodo",
      "createData",
      "updateTodo",
      "readTodos",
      "checkTodo",
      "upRecord",
      "downRecord",
    ]),
    addItem() {
      if (this.newInput !== "") {
        this.createData({
          content: this.newInput,
          done: false,
          id: Date.now(),
        });
        this.newInput = "";
      }
    },
    updateTodoDone(value) {
      this.updateTodo(value);
      this.edit = null;
    },
    // 先做判斷，再丟payload
    upItem(value) {
      if (value.index <= 0) {
        return;
      }
      this.upRecord(value);
    },
    downItem(value) {
      if (value.index >= this.todos.length - 1) {
        return;
      }
      this.downRecord(value);
    },
  },
  created() {
    this.readTodos();
  },
};
</script>
<style lang="scss" scoped>
ol,
ul {
  list-style: none;
}
input,
button {
  border: 0;
  margin: 0;
  padding: 0;
  outline: none;
}
h1 {
  color: #3e517a;
}
.strikeout {
  text-decoration: line-through;
  color: grey;
}
a {
  color: #3e517a;
  text-decoration: none;
}
.router-link-exact-active {
  color: #0b5a8c;
  font-weight: bold;
}
.todo {
  margin-top: 30px;
  padding: 10px;
  width: 400px;
  border-radius: 10px;
  background-color: #70cad1;
}
.top-content {
  margin: 5px auto;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #8ee3f5;
}
.top-input {
  width: 85%;
  padding: 10px;
  border-radius: 3px;
  background-color: #8ee3f5;
}
.top-button {
  width: 15%;
  padding: 10px;
  border-radius: 3px;
  cursor: pointer;
  color: #3e517a;
  background-color: #8ee3f5;
  &:hover {
    color: #8ee3f5;
    background-color: #3e517a;
  }
  &:active {
    color: #3e517a;
    background-color: #8ee3f5;
  }
}
.content {
  margin: 0 auto;
  button:active {
    transform: scale(1.3);
  }

  li {
    margin: 5px 0;
    padding: 5px 0;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #8ee3f5;
  }
}
.input {
  width: 150px;
  display: flex;
  justify-content: start;
  align-items: center;
  input {
    padding: 5px 5px;
    margin: 0 5px;
  }
}
.button {
  display: flex;
  button {
    height: 33px;
    cursor: pointer;
    padding: 0 3px;
    margin-right: 3px;
    border-radius: 3px;
    color: #8ee3f5;
    background-color: #3e517a;
    &:hover {
      color: #3e517a;
      background-color: #caf9ed;
    }
  }
}
.sort-button {
  // float: right;
  display: flex;
  flex-direction: column;
  button {
    height: 15px;
    &:first-child {
      margin-bottom: 3px;
    }
  }
  i {
    transform: scale(0.8, 0.8);
  }
}
</style>
