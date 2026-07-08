<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTasksSStore, useUsersStore } from '../stores/store';
import Filter from './Filter.vue';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
import TaskForm from './TaskForm.vue';
import Greeting from './Greeting.vue';
import TaskCard from './TaskCard.vue';
import 'dayjs/locale/ru'; 
import 'dayjs/locale/en';
import TasksTable from './TasksTable.vue';


const {locale} = useI18n()

const usersStore = useUsersStore()
const todayDate = computed(() => dayjs().format("YYYY-MM-DD"));
const tasksStore = useTasksSStore()
const currentMode = ref("all");
const filteredTasks = computed(() => {
  let result = tasksStore.tasks.filter(
    (task: { userId: number }) => task.userId === usersStore.currentUser?.id,
  );

  if (tasksStore.selectedCategory) {
    result = result.filter(
      (task: { category: string }) => task.category === tasksStore.selectedCategory,
    );
  }
  if (currentMode.value === "active") {
    return result.filter((task: { isDone: boolean }) => !task.isDone);
  } else if (currentMode.value === "done") {
    return result.filter((task: { isDone: boolean }) => task.isDone);
  } else if (currentMode.value === "deadlined") {
    return tasksStore.getDeadlinedTasks.filter((task) =>
      tasksStore.selectedCategory ? task.category === tasksStore.selectedCategory : true,
    );
  } else if (currentMode.value === "today") {
    return result.filter(
      (task: { deadlineDate: string }) => task.deadlineDate === todayDate.value,
    );
  }

  return result;
});

function formatTaskDate(rawDate: string, currentLocale: string) {
  if (!rawDate) return "";
  const dateObj = dayjs(rawDate);
  if (!dateObj.isValid()) return null;
  
  return dateObj.locale(currentLocale).format("D MMMM");
}

function switchModes(mode: string) {
  currentMode.value = mode;
  if (mode == "all") {
    tasksStore.clearCategory();
  }
}

const currentView = ref('list')
function handleViewSwitch( view: 'list' | 'table'){
  currentView.value = view
}

</script>

<template>

    <div class="tasksManager">
        <Greeting/>
        <TaskForm/>
        <Filter :tasks="filteredTasks" @switchModes="switchModes" @switchView="handleViewSwitch" :currentView="currentView"/>
         <h3 v-if="currentMode == 'all'">
      {{ $t("taskManager.titleAllTasks") }}
    </h3>
    <h3 v-if="currentMode == 'today'">
      {{ $t("taskManager.titleTodayTasks") }}
    </h3>
    <h3 v-if="currentMode == 'done'">
      {{ $t("taskManager.titleDoneTasks") }}
    </h3>
    <h3 v-if="currentMode == 'active'">
      {{ $t("taskManager.titleActiveTasks") }}
    </h3>
    <h3 v-if="currentMode == 'deadlined'">
      {{ $t("taskManager.titleDeadlinedTasks") }}
    </h3>
<div
      v-if="filteredTasks.length > 0 && currentView == 'list'"
      class="tasksGrid"
    >
      <TaskCard
        :key="task.id"
        :id="task.id"
        :title="task.title"
        :category="task.category"
        :deadlineDate="formatTaskDate(task.deadlineDate, locale) || ''"
        :deadlineDateNoFormat="task.deadlineDate || ''"
        :createDate="todayDate || ''"
        :doneDate="'-'"
        :isDeadlined="task.isDeadlined"
        :catColor="task.catCol"
        :isDone="task.isDone"
        v-for="task in filteredTasks"
      />
    </div>
      <TasksTable
      v-else-if="currentView == 'table' && tasksStore.tasks.length!=0"
      :tasksList="filteredTasks"
      :key="JSON.stringify(filteredTasks)"
    />
      <p class="noTasksMessage" v-else>{{ $t("taskManager.noTasksMessage") }}</p>
    </div>
</template>

<style scoped>
.tasksManager {
    padding: 4vh 2vw;
}

h3 {
    color: var(--text-secondary);
    margin-bottom: 2vh;
    opacity: .5;
}

.tasksGrid {
   max-height: 30vh; 
    gap: 10px;
    overflow-y: auto;  
    overflow-x: hidden; 
    padding-right: 8px; 
    display: flex;
    flex-direction: column;
}

.noTasksMessage {
  opacity: .5;
  text-align: center;
  margin-top: 15vh;
}

</style>