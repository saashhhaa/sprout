<script setup lang="ts">
import {
  useCategoriesStore,
  useTasksSStore,
  useUsersStore,
} from "../stores/store";
import dayjs from "dayjs";
import { computed, ref } from "vue";


const tasks = useTasksSStore();
const users = useUsersStore();
const categoriesStore = useCategoriesStore();
const newTaskTitle = ref("");
const newTaskDeadline = ref("");
const newTaskCategory = ref("work");

const todayDate = computed(() => dayjs().format("YYYY-MM-DD"));

function createNewTask() {
  if (newTaskTitle.value.trim() === "") return;

  tasks.createNewTask(
    newTaskTitle.value,
    newTaskDeadline.value ? newTaskDeadline.value : "", // when deadline
    todayDate.value, //when created
    newTaskCategory.value,
  );

  newTaskTitle.value = "";
  newTaskDeadline.value = "";
}
</script>

<template>
  <div class="addTaskBar">
    <div class="coverInput">
      <input
        class="taskTitle"
        type="text"
        :placeholder="$t('taskManager.addTaskInput')"
        v-model="newTaskTitle"
      />
     <button @click="createNewTask">+</button>
    </div>
    <div class="cover">
      <div class="flex">
        <div 
    v-for="category in categoriesStore.categories" 
    :key="category.title"
    class="category"
    :class="{ active: newTaskCategory === category.title }"
    @click="newTaskCategory = category.title"
  > 
    <div :style="{ backgroundColor: category.color }" class="catCol"></div> 
    <div>{{ category.title }}</div>
  </div>
         <div class="categorySwitch">
      <select v-if="categoriesStore.customCategories.length>0" v-model="newTaskCategory" name="category" id="">
        <option
          v-for="category in categoriesStore.customCategories"
          :key="category.title"
          :value="category.title"
        >
          {{ category.title }}
        </option>
      </select>
    </div>
      </div>

      <div class="taskDateCover">
        <label for="date"><img src="../assets/homepage/calendar.svg" alt="" /></label>
        <input
          :min="todayDate"
          v-model="newTaskDeadline"
          type="date"
          name=""
          id="taskDate"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.addTaskBar {
    margin-top: 2vh;
     border-radius: 20px;
  padding: 2vh 20px;
  /* width: 100%; */
  background-color: white;
  border: 1.5px solid var(--bg-secondary2);
  box-shadow: 0 0px 5px rgba(29, 51, 28, 0.076);
}
.taskTitle {
    
    width: 100%;
    height: 100%;
font-size: 20px;

}

input{
border: none;
    outline: none;

}

.coverInput {
    display: flex;
    padding: 2vh 0;
    justify-content: space-between;
border-bottom: 1.5px dashed var(--bg-secondary2);
margin-bottom: 2vh;
}


.coverInput button {
font-size: 20px;

    background-color: var(--accent-color);
    border-radius: 100px;
    padding: 10px 19px;
    border: none;
    color: white;
}

.catCol {
    height: 10px;
    width: 10px;
    border-radius: 50px;
}

.flex {
    display: flex;
    gap: 10px;
}

.category {
    
    background-color: var(--bg-secondary);
    border: 1.5px solid var(--bg-secondary2);
    color: var(--text-secondary)
}

.taskDateCover , .category, select   {
cursor: pointer;
    display: flex;
    gap: 10px;
     border-radius: 50px;
    padding: 5px 20px;
    align-items: center;
}

.taskDateCover {
    background-color: var(--bg-secondary2);
    width: fit-content;
}

.taskDateCover input{
    background-color: transparent;
    font-size: 14px !important;
    color: var(--text-secondary);
}

.taskDateCover img {
    opacity: .5;
    width: 20px;
}
.cover {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

select {
    margin-top: 5px;
    padding: 10px 20px;
    background-color: var(--bg-secondary);
    border: none;
}

.category:hover {
    filter: brightness(0.95);
}
.category.active {
 background-color: rgba(167, 208, 167, 0.463);
    color: var(--text-main); 
    border-color: rgba(167, 208, 167, 0.463);;
}
</style>
