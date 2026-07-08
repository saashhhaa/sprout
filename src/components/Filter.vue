<script setup lang="ts">
import dayjs from "dayjs";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useTasksSStore } from "../stores/store";
const emit = defineEmits(["switchModes", 'switchView']);
const { t } = useI18n();
const props = defineProps({
  tasks: Array,
  currentView: String,
});
const currMode = ref("all");
const todayDate = computed(() => dayjs().format("YYYY-MM-DD"));

function changeMode(mode: "today" | "all" | "active" | "done" | "deadlined") {
  currMode.value = mode;
  emit("switchModes", mode);
}
const tasksStore = useTasksSStore()


function deleteAllDone() {
  tasksStore.tasks = tasksStore.tasks.filter((task) => !task.isDone);
  localStorage.setItem("tasks", JSON.stringify(tasksStore.tasks));
}

function handleViewSwitch( view: 'list' | 'table'){
  emit('switchView', view)
}

const expiredTasksCount = computed(() => {
  return tasksStore.tasks.filter(task => {
    if (task.isDone) return false;
    
    if (!task.deadlineDate) return false;

    const deadline = dayjs(task.deadlineDate);
    return deadline.isValid() && deadline.isBefore(dayjs(), 'day');
  }).length;
});
</script>

<template>
  <div class="filter">
    <div class="left"><img class="filterIcon" src="../assets/homepage/filter.svg" alt="" />

   
    <button
      @click="changeMode('all')"
      :class="currMode == 'all' ? 'filterMode active' : 'filterMode'"
    >
    <div>{{ $t("taskManager.filterAll") }}</div><div class="taskAmount">{{ props.tasks?.length }}</div>
       
    </button>
     <button
      @click="changeMode('today')"
      :class="currMode == 'today' ? 'filterMode active' : 'filterMode'"
    >
     <div>{{ $t("taskManager.filterToday") }}</div><div class="taskAmount">{{ tasksStore.tasks.filter(task => task.deadlineDate == todayDate).length }}</div>
      
    </button>
    <button
      @click="changeMode('active')"
      :class="currMode == 'active' ? 'filterMode active' : 'filterMode'"
    >
     <div>{{ $t("taskManager.filterActive") }}</div><div class="taskAmount">{{ tasksStore.tasks.filter(task => !task.isDone).length }}</div>
      
    </button>
    <button
      @click="changeMode('done')"
      :class="currMode == 'done' ? 'filterMode  active' : 'filterMode'"
    >
     <div> {{ $t("taskManager.filterDone") }}</div><div class="taskAmount">{{ tasksStore.tasks.filter(task => task.isDone).length }}</div>
     
    </button>
    <button
      @click="changeMode('deadlined')"
      :class="currMode == 'deadlined' ? 'filterMode  active' : 'filterMode'"
    >
     <div>{{ $t("taskManager.filterDeadlined") }}</div><div class="taskAmount">{{ expiredTasksCount }}</div>
      
    </button></div>
    <div class="right">
      <div class="viewSwitcher">
       
        <div class="viewMode" @click="handleViewSwitch('list')" :class="{'active': props.currentView=='list'}"> <img src="../assets/homepage/list.svg" alt=""></div>
        <div class="viewMode" @click="handleViewSwitch('table')" :class="{'active': props.currentView=='table'}"> <img src="../assets/homepage/table.svg" alt=""></div>

       
      </div>
      <button :disabled="tasksStore.tasks.filter((task)=>task.isDone==true).length==0" @click="deleteAllDone" class="deleteAllDone">
        {{ $t("taskManager.deleteAllDoneTasksButton") }}
        <img src="../assets/homepage/delete.svg" alt="" />
      </button>
    </div>
   
    
    
  </div>
</template>

<style scoped>

button:disabled:hover {
  opacity: .5;
}
.filter {
   display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.left{
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
  margin: 2vh 0;
  background-color: var(--bg-secondary);
  border: 1.5px solid var(--bg-secondary2);
  width: fit-content;
  border-radius: 50px;
  padding: 5px 5px 5px 2vw;
}

.filterIcon {
  width: 20px;
  opacity: .5;
  margin-right: 20px;
}

button {
  padding: 5px 20px;
  color: var(--text-secondary);
  border-radius: 100px;
  border: none;
  background-color: transparent;
  font-size: 16px;
  display: flex;
  gap: 10px;
}

.taskAmount {
    opacity: 0;
}

button:hover .taskAmount, .active .taskAmount {
    opacity: .5;
}

.active {
  background-color: var(--accent-color);
  color: white;
}

.deleteAllDone {
  background-color: var(--bg-secondary2);
  padding: 5px 20px;
  opacity: .5;
}

.deleteAllDone img , .viewSwitcher img {
    width: 20px;
  opacity: .5;
}
.deleteAllDone:hover {
  opacity: 1;
  filter: brightness(1);
}

.right {
  display: flex;
  gap: 10px;
  align-items: center;
}

.viewSwitcher {
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: var(--bg-secondary);
  border: 1.5px solid var(--bg-secondary2);
  width: fit-content;
  border-radius: 10px;
  padding: 5px;
}

.viewSwitcher img {
  cursor: pointer;
  opacity: 0.3;
width: 20px;
}

.viewMode {
 border-radius: 10px;
  display: flex;
  align-items: center;
padding: 5px 10px;
}

.viewMode.active {
  background-color: white !important;
}

.viewMode.active img {
  opacity: 0.8;

}

</style>