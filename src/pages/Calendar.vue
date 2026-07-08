<script setup lang="ts">
import { computed } from 'vue';
import dayjs from 'dayjs';
import SideBar from '../components/SideBar.vue';
import { useDateStore, useTasksSStore, useUsersStore } from '../stores/store.ts';
import { useI18n } from 'vue-i18n';
import { DatePicker as VDatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';
import Weather from '../components/Weather.vue';
import BottomBar from '../components/BottomBar.vue';

const { locale } = useI18n();
const dateStore = useDateStore();
const tasksStore = useTasksSStore();
const usersStore = useUsersStore();

const selectedDateStr = computed(() => {
  if (!dateStore.selectedDate) return '';
  return dayjs(dateStore.selectedDate).format('YYYY-MM-DD');
});

const calendarAttributes = computed(() => {
  const currentUserId = usersStore.currentUser?.id;
  
  const activeTasks = tasksStore.tasks.filter(
    (task) => task.userId === currentUserId && !task.isDone && task.deadlineDate
  );

  return activeTasks.map((task) => ({
    key: task.id,
    dot: {
      style: {
        backgroundColor: task.catCol || '#1a9185',
      },
    },
    dates: new Date(task.deadlineDate),
  }));
});

const tasksForSelectedDay = computed(() => {
  const currentUserId = usersStore.currentUser?.id;
  if (!selectedDateStr.value) return [];

  return tasksStore.tasks.filter(
    (task) => task.userId === currentUserId && task.deadlineDate === selectedDateStr.value && task.isDone == false
  );
});

const formattedSelectedDate = computed(() => {
  if (!dateStore.selectedDate) return '';
  return dayjs(dateStore.selectedDate).locale(locale.value).format('D MMMM, dddd');
});
</script>

<template>

    <div class="calendar">
        <SideBar/>
     <div class="calendar-main-content">
      <div class="calendar-wrap">
      <h1>{{ $t('sideBar.calendar') }}</h1>

        <VDatePicker 
          v-model="dateStore.selectedDate" 
          mode="date"
          :locale="locale"
          :attributes="calendarAttributes" 
          expanded
        />
      </div>

      <div class="selected-day-panel">
        <div class="panel-header">
          <div class="title-box">
            <span class="hint">{{ $t('calendar.chosenDay') }}</span>
            <h3>{{ formattedSelectedDate }}</h3>
          </div>
          <RouterLink to="/homepage"><button class="add-task-btn">+</button></RouterLink>
          
        </div>

        <div class="tasks-list">
          <div  
            v-for="task in tasksForSelectedDay" 
            :key="task.id" 
            class="task-card"
            :class="{ 'done': task.isDone }"
            @click="task.isDone=!task.isDone"
          >
            <div class="task-checkbox" @click="tasksStore.switchTaskState(task.id, task.createDate)">
              <div class="circle" :style="{ borderColor: task.catCol }"></div>
            </div>
            <div class="task-info">
              <p class="task-title">{{ task.title }}</p>
              <span class="category-badge" :style="{ color: task.catCol }">
                ● {{ task.category }}
              </span>
            </div>
          </div>

          <div v-if="tasksForSelectedDay.length === 0" class="empty-tasks">
             <p class="noTasksMessage">{{ $t("taskManager.noTasksMessage") }}</p>
          </div>
        </div>
      </div>
    <Weather/> 
      
    </div>
    <BottomBar/>

  </div>
</template>

<style scoped>
.calendar {
    display: grid;
  grid-template-columns: 0.6fr 2fr;
  background-color: var(--bg-main);
  border-radius: 30px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  width: 95vw;
  min-height: 85vh;
  margin-top: -3vh;
}

.calendar-main-content {
  padding: 2vh 2vw;
  gap: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 50vh;
  width: 100%;
  justify-content: center;
}

.calendar-wrap {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.calendar-wrap :deep(.vc-container) {
  width: 100% !important;
  border: none;
}

.selected-day-panel {
   background-color: var(--contrast);

  border: 1.5px solid var(--bg-secondary2);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin-top: 5vh;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.panel-header h3 {
  font-size: 18px;
  font-weight: 600;
  text-transform: capitalize;
}

.hint {
  font-size: 11px;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
}

.calendar-wrap h1 {
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 2vh;
  opacity: .5;
  color: var(--text-secondary);
}

.add-task-btn {
  background-color: var(--bg-secondary);
  border: 1.5px solid var(--bg-secondary2);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-size: 18px;
  color: var(--text-main);
  opacity: .5;
}

.add-task-btn:hover {
  opacity: 1;
  filter: brightness(1);
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-card {
  cursor: pointer;
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 12px 15px;
  border: 1.5px solid var(--bg-secondary2);
  border-radius: 12px;
  background-color: var(--bg-main);
}

.task-checkbox .circle {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
}

.task-title {
  font-weight: 500;
  font-size: 14px;
}

.category-badge {
  font-size: 11px;
  font-weight: 600;
}

.empty-tasks {
  text-align: center;
  padding: 30px 0;
  opacity: 0.5;
  font-size: 14px;
}


@media (max-width: 1000px) {
   .calendar {
    padding: 3vh 4vw;
    display: flex;
  border-radius: 0px;
  width: 100vw;
  justify-content: center;
  min-height: 95vh;
  margin-top: 0vh;
}

.calendar-main-content {
  display: flex;
  flex-direction: column;
  height: fit-content;
}
}
</style>