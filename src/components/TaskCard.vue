<script setup lang="ts">
import { useCategoriesStore, useTasksSStore } from "../stores/store";
import doneIcon from "../assets/homepage/plant.svg";
import activeIcon from "../assets/homepage/circle.svg";
import { computed } from "vue";
import dayjs from "dayjs";

interface Task {
  id: number;
  title: string;
  category: string;
  catColor: string;
  createDate: string;
  doneDate: string;
  deadlineDate: string;
  deadlineDateNoFormat: string;
  isDone: boolean;
  isDeadlined: boolean;
}

const leftDays = computed(() => {
  if (!props.deadlineDateNoFormat) return null;

  const start = dayjs(props.createDate);
  const end = dayjs(props.deadlineDateNoFormat);

  if (!start.isValid() || !end.isValid()) return null;

  return end.diff(start, "day");
});

const props = defineProps<Task>();
const tasks = useTasksSStore();
const categories = useCategoriesStore();

function deleteTask() {
  tasks.deleteTask(props.id);
  const catAmount = categories.categories.find(
    (cat) => cat.title == props.category,
  );
  if (catAmount) {
    catAmount.count -= 1;
  }
}
</script>

<template>
  <div
    @click="tasks.switchTaskState(props.id, createDate)"
    :class="[
      'taskCard',
      {
        done: props.isDone,
        deadlinedCard: leftDays !== null && leftDays < 0 && !props.isDone,
      },
    ]"
  >
    <div class="cover">
      <img
        class="manageState"
        :src="props.isDone ? doneIcon : activeIcon"
        alt=""
      />
      <div class="taskInfo">
        <div class="taskTitle">
          {{ props.title }}
        </div>
        <div class="titleDetails">
          <div class="category" :style="{ color: props.catColor }">
            <div class="dot" :style="{ backgroundColor: props.catColor }"></div>
            {{ props.category }}
          </div>
          <div v-if="props.deadlineDate != ''" class="date">
            <img src="../assets/homepage/calendar.svg" />
            <div class="">{{ props.deadlineDate }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="taskTags" v-if="!props.isDone && leftDays !== null">
      <span class="tag daysLeft" v-if="leftDays >= 0">
        {{ leftDays }} {{ $t("taskManager.days") }}
      </span>
      <span class="tag deadlined" v-if="leftDays < 0">
        {{ $t("taskManager.deadlinedDays") }} {{ Math.abs(leftDays) }}
      </span>
    </div>
    <img
      @click="deleteTask"
      class="deleteTask"
      src="../assets/homepage/delete.svg"
    />
  </div>
</template>

<style scoped>
* {
}
.taskCard {
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  padding: 2vh 2vw;
  align-items: center;
  border-radius: 20px;
  background-color: white;
  border: 1px solid var(--bg-secondary2);
}
.cover {
  display: flex;
  align-items: center;
  gap: 20px;
}

.titleDetails {
  display: flex;
  gap: 20px;
}
.category {
  display: flex;
  align-items: center;
  gap: 10px;
}

.taskTitle {
  font-size: 18px;
  font-weight: 500;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 100px;
}

.date {
  display: flex;
  gap: 10px;
  align-items: center;
  opacity: 0.5;
}

.date img {
  width: 20px;
}

.deleteTask {
  width: 20px;
  opacity: 0;
  z-index: 100;
}
.taskCard:hover .deleteTask {
  opacity: 0.5;
}

.manageState {
  opacity: 0.2;
  width: 30px;
  height: 30px;
}

.done {
  opacity: 0.5;
}
.done .taskTitle {
  text-decoration: line-through;
  font-weight: 400;
}
.done .manageState {
  opacity: 1;
  filter: brightness(1.1);
}
.taskTags {
  margin-left: auto;
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.tag {
  font-size: 14px;
  padding: 6px 14px;
  border-radius: 50px;
  white-space: nowrap;
}

.tag.daysLeft {
  background-color: #ddebde;
  color: #1d331c;
}

.tag.deadlined {
  background-color: #fce8e6;
  color: #a82418;
}

.deadlinedCard {
  border-color: #fca7a1 !important;
  background: linear-gradient(to right, #fff5f4, transparent);
}
</style>
