<template>
  <div class="layout">
    <div class="header">
      <div class="avatar">
        <b-avatar variant="primary" text="IF"></b-avatar>
      </div>
    </div>

    <div class="main">
      <task-input
        :boards="boards"
        :options="options"
        @add-task="addTask"
        @add-user="addUser"
        @toggle-modal="showModal = !showModal"
        @toggle-modal1="showModal1 = !showModal1"
      />
      <div class="todo-board">
        <board
          v-for="(board, index) in boards"
          :key="index"
          :board="board"
          :options="options"
          :board-index="index"
          @remove-board="removeBoard"
          @drag-start="dragStart"
          @drop-task="dropTask"
        />
      </div>

      <b-modal v-model="showModal" title="Add New Board" ok-only @ok="addBoard">
        <div>
          <input
            v-model="newBoardName"
            type="text"
            placeholder="Enter board name"
            class="form-control"
          />
        </div>
      </b-modal>

      <b-modal v-model="showModal1" title="Add New User" ok-only @ok="addUser">
        <div>
          <input
            v-model="newUser"
            type="text"
            placeholder="Enter user name"
            class="form-control"
          />
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Board from "./components/Board.vue";
import TaskInput from "./components/TaskInput.vue";

export default {
  name: "App",
  components: {
    TaskInput,
    Board,
  },
  data() {
    return {
      newBoardName: "",
      showModal: false,
      showModal1: false,
      options: [
        { value: null, text: "Please select an option" },
        { value: "Alice", text: "Alice" },
        { value: "Bob", text: "Bob" },
        { value: "Charlie", text: "Charlie" },
        { value: "David", text: "David" },
      ],
      saunaTasks: [
        "Принести метлу",
        "Подготовить еду и напитки",
        "Взять полотенца и халаты",
        "Принести тапочки",
        "Проверить температуру в сауне",
        "Подготовить дрова",
        "Взять ведро с водой",
      ],
      boards: [{ name: "Todo", tasks: [] }],
      draggedTask: null,
      draggedTaskIndex: null,
      draggedBoardIndex: null,
    };
  },
  methods: {
    addTask(task) {
      // Проверяем, содержит ли задача слово "баня"
      if (
        task.name.toLowerCase().includes("баня") ||
        task.name.toLowerCase().includes("баню")
      ) {
        // Добавляем все задачи из saunaTasks
        this.boards[0].tasks.push(
          ...this.saunaTasks.map((taskName) => ({ name: taskName }))
        );
      } else {
        // Добавляем обычную задачу
        this.boards[0].tasks.push(task);
      }
      // this.boards[0].tasks.push(task);
    },
    addUser() {
      if (this.newUser.trim()) {
        this.options.push({ value: this.newUser, text: this.newUser });
      }
    },
    addBoard() {
      if (this.newBoardName.trim()) {
        this.boards.push({ name: this.newBoardName, tasks: [] });
        this.newBoardName = ""; // Очистка поля после добавления доски
        this.showModal = false; // Закрываем модальное окно
      }
    },
    removeBoard(boardName) {
      this.boards = this.boards.filter((board) => board.name !== boardName); // Удаляем доску по имени
    },
    dragStart(task, taskIndex, boardIndex) {
      this.draggedTask = task;
      this.draggedTaskIndex = taskIndex;
      this.draggedBoardIndex = boardIndex;
    },
    dropTask(boardIndex) {
      if (this.draggedTask && this.draggedBoardIndex !== boardIndex) {
        // Удаляем задачу из исходной доски
        const task = this.draggedTask;
        const sourceBoard = this.boards[this.draggedBoardIndex];
        const targetBoard = this.boards[boardIndex];

        // Удаляем задачу из старой доски
        sourceBoard.tasks.splice(this.draggedTaskIndex, 1);

        // Добавляем задачу в новую доску
        targetBoard.tasks.push(task);
      }
      this.draggedTask = null; // Сбрасываем перетаскиваемую задачу
      this.draggedTaskIndex = null;
      this.draggedBoardIndex = null;
    },
  },
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  width: 100%;
  height: 100%;
}
.layout {
  width: 100%;
  height: 89vh;
}

.header {
  width: 100%;
  padding: 15px;
  background-color: #3b87f2;
  display: flex;
  justify-content: flex-end;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.avatar {
  display: flex;
  align-items: center;
}

.main {
  width: 100%;
  height: 100%;
  margin-top: 30px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  background-color: #f4f7fa;
}

.todo-board {
  display: flex;
  gap: 20px;
  width: 100%;
  padding: 10px;
  overflow-y: auto;

  /* justify-content: center; */
}

.task:hover {
  background-color: #c0d4eb;
}

.task:active {
  background-color: #a1bbdb;
}

.b-modal .form-control {
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.b-modal .form-control:focus {
  border-color: #3b87f2;
}

.b-modal .modal-content {
  padding: 20px;
}
</style>
