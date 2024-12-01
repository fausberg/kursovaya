<template>
  <div class="input">
    <input
      type="text"
      v-model="newTask"
      placeholder="Enter task"
      @keyup.enter="addTask"
    />
    <b-button @click="addTask">Add Task</b-button>
    <b-button @click="toggleModal">Add Board</b-button>
    <!-- Добавляем обработчик события для открытия модального окна -->

    <!-- Add user input -->
    <b-button @click="toggleModal1">Add User</b-button>
  </div>
</template>

<script>
export default {
  name: "TaskInput",
  props: {
    boards: Array,
    options: Array,
    showModal: Boolean, // Управляем состоянием showModal через props
  },
  data() {
    return {
      newTask: "",
      newUser: "",
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        const task = { name: this.newTask, user: null };
        this.$emit("add-task", task);
        this.newTask = "";
      }
    },
    addUser() {
      if (this.newUser.trim()) {
        this.$emit("add-user", this.newUser);
        this.newUser = "";
      }
    },
    // Метод для переключения состояния showModal
    toggleModal() {
      this.$emit("toggle-modal"); // Отправляем событие для переключения showModal
    },
    toggleModal1() {
      this.$emit("toggle-modal1"); // Отправляем событие для переключения showModal
    },
  },
};
</script>

<style scoped>
.input {
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  width: 100%;
}

.input input {
  padding: 12px 18px;
  width: 350px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: border 0.3s ease;
}

.input input:focus {
  border-color: #3b87f2;
}

.input b-button {
  background-color: #3b87f2;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.input b-button:hover {
  background-color: #2c6bb2;
}
</style>
