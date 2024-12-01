<template>
  <div class="board" @dragover.prevent @drop="dropTask">
    <div @click="removeBoard" class="remove-board-button">X</div>
    <h3 class="board-title">{{ board.name }}</h3>
    <div
      v-for="(task, taskIndex) in board.tasks"
      :key="taskIndex"
      class="task"
      :draggable="true"
      @dragstart="dragStart(task, taskIndex)"
    >
      <div>{{ task.name }}</div>
      <div v-if="task.user" class="task-user">Assigned to: {{ task.user }}</div>
      <b-form-select v-model="task.user" :options="options" />
    </div>
  </div>
</template>

<script>
export default {
  name: "BoardVue",
  props: {
    board: Object,
    options: Array,
    boardIndex: Number,
  },
  methods: {
    removeBoard() {
      this.$emit("remove-board", this.board.name); // Отправляем название доски для удаления
    },
    dragStart(task, taskIndex) {
      this.$emit("drag-start", task, taskIndex, this.boardIndex); // Передаем данные о задаче и доске родителю
    },
    dropTask() {
      this.$emit("drop-task", this.boardIndex); // Передаем индекс целевой доски родителю
    },
  },
};
</script>
<style scoped>
.board {
  min-width: 300px;
  max-width: 400px;
  min-height: 350px;
  background-color: #fef9f9;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.remove-board-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.board-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
}

.task {
  background-color: #e3e9f0;
  padding: 10px;
  border: 1px solid #d1d8e3;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;
}

.task-user {
  font-size: 14px;
  color: #5c6c7c;
}
</style>
