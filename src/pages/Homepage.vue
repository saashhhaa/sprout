<script setup>
import BottomBar from '../components/BottomBar.vue';
import SideBar from '../components/SideBar.vue';
import TasksManager from '../components/TasksManager.vue';



</script>

<template>
<div class="homepage">
    <SideBar/>
    <TasksManager/>
    <BottomBar/>
</div>
</template>

<style scoped>

* {
    /* border: 1px solid red; */
}

.homepage {
    display: grid;
  grid-template-columns: 0.6fr 2fr;
  background-color: var(--bg-main);
  border-radius: 30px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  min-height: 85vh;
  margin-top: -3vh;
  /* padding: 2vh 5vw; */
}

@media (max-width: 1000px) {
   .homepage {
    display: flex;
  border-radius: 0px;
  width: 100vw;
  justify-content: center;
  min-height: 95vh;
  margin-top: 0vh;
}


    
}
</style>