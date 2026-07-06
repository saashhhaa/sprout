<script setup>
import { useLangStore } from "../stores/store";
const langStore = useLangStore();
</script>

<template>
  <div class="langSwitcher">
    <img src="../assets/language.svg" alt="" />
    <div class="cover">
      <div
      class="lang en"
        :class="{ active: langStore.lang === 'en' }"
        @click="langStore.setLang('en')"
      >
        en
      </div>
      <div
      class="lang ru"
        :class="{ active: langStore.lang === 'ru' }"
        @click="langStore.setLang('ru')"
      >
        ру
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  /* border: 1px solid red; */
}
img {
  width: 20px;
  height: 20px;
  opacity: 0.3 !important;
}

.cover {
  display: flex;
}

.langSwitcher {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-secondary) !important;
  background-color: var(--bg-secondary2) !important;
  border-radius: 50px;
  width: max-content;
  padding: 5px 15px;
  gap: 5px;
}

button:hover {
  filter: brightness(1);
}

.lang {
  padding: 5px 20px;
  
}
.lang {
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}
.lang.active {
  opacity: 1;
  font-weight: 500;
  color: var(--text-secondary); 
  border-radius: 50px;
  border: 1px solid rgba(0, 0, 0, 0.21);
  background-color: var(--bg-main);
}
@media (max-width: 1200px) {
    .langSwitcher .lang {
      font-size:0.8rem;
      padding: 3px 10px;
      margin: 0 5px;
    }

    .langSwitcher{
      padding: 5px 10px !important;
    }
  
}
</style>
