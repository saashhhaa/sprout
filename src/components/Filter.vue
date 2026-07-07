<script setup lang="ts">
import dayjs from "dayjs";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useTasksSStore } from "../stores/store";
const emit = defineEmits(["switchModes"]);
const { t } = useI18n();
const props = defineProps({
  tasks: Array,
});
const currMode = ref("all");
const todayDate = computed(() => dayjs().format("YYYY-MM-DD"));

function changeMode(mode: "today" | "all" | "active" | "done" | "deadlined") {
  currMode.value = mode;
  emit("switchModes", mode);
}
const tasksStore = useTasksSStore()
</script>

<template>
  <div class="filter">
    <img src="../assets/homepage/filter.svg" alt="" />

   
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
     <div>{{ $t("taskManager.filterDeadlined") }}</div><div class="taskAmount">{{ tasksStore.tasks.filter(task => task.deadlineDate<todayDate).length }}</div>
      
    </button>
    
  </div>
</template>

<style scoped>
.filter {
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

img {
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


</style>