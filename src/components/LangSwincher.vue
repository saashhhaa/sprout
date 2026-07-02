<script setup >
import { useLangStore } from "../stores/store";
const langStore = useLangStore();


</script>

<template>
  <button @click="langStore.switchLang">
    <div>{{ langStore.lang }}</div>
    <img src="../assets/language.svg" alt="" />
  </button>
</template>

<style scoped>
img {
  width: 25px;
  height: 25px;
  filter: brightness(.5);
}

button {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-secondary) !important;
  padding: 10px 30px;
  /* font-size: 16px; */
  background-color: var(--bg-main) !important;
  width: fit-content !important;
  box-shadow: 0 2px 5px rgba(37, 50, 30, 0.195);
}

button:hover {
  filter: brightness(1);
}

</style>