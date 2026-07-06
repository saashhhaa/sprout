<script setup>
import SideBar from '../components/SideBar.vue';
import TasksManager from '../components/TasksManager.vue';
import { useUsersStore } from '../stores/store';


const usersStore = useUsersStore()
</script>

<template>
<div class="homepage">
    <SideBar/>
    <TasksManager/>
</div>
</template>

<style scoped>

* {
    border: 1px solid red;
}

.homepage {
    display: grid;
  grid-template-columns: 0.5fr 2fr;
  background-color: var(--bg-main);
  border-radius: 30px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  width: 90vw;
  min-height: 85vh;
  margin-top: -3vh;
}
</style>