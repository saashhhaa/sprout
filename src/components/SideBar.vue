<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useCategoriesStore, useUsersStore } from "../stores/store";
import Category from "./Category.vue";
import LangSwincher from "./LangSwincher.vue";
import Logotype from "./Logotype.vue";
import { ref } from "vue";

const usersStore = useUsersStore();
const categoriesStore = useCategoriesStore();
const { t } = useI18n();
const categoryTitle = ref("");
const categoryColor = ref("#1a9185");
const newCategoryFormVisible = ref(false);
function addCategory(): void {
  if (categoryTitle.value.trim() == "") {
    newCategoryFormVisible.value = false;
    return;
  } else {
    categoriesStore.addCategory(categoryTitle.value, categoryColor.value);
  }
  categoryTitle.value = "";
  categoryColor.value = "#1a9185";
  newCategoryFormVisible.value = false;
}

// function getTaskCount(categoryTitle: string): number {
//   return tasksStore.tasks.filter(
//     (task) =>
//       task.userId === users.currentUser?.id && task.category === categoryTitle,
//   ).length;
// }

// const doneTasksForCat = categoriesStore.categories.filter((cat)=>cat.)
</script>

<template>
  <div class="sideBar">
    
    <div class="container">
<Logotype />
    <div class="searchBar">
      <label for="search"
        ><img src="../assets/homepage/search.svg" alt="" />
      </label>
      <input id="search" type="text" :placeholder="t('sideBar.search')" />
    </div>
    <div class="sectionsBar">
      <div class="cover">
        <img src="../assets/homepage/home.svg" alt="" />
        <p>{{ t("sideBar.homepage") }}</p>
      </div>
      <div class="cover">
        <img src="../assets/homepage/calendar.svg" alt="" />
        <p>{{ t("sideBar.calendar") }}</p>
      </div>
    </div>
    <div class="categoriesBar">
      <h3>{{ t("sideBar.categories.title") }}</h3>
      <div class="categoriesWrapper">
        <Category
          v-for="category in categoriesStore.categories"
          :color="category.color"
          :title="category.title"
          :count="category.count"
          :isCustom="category.isCustom"
        />
        <Category
          v-for="category in categoriesStore.customCategories"
          :id="category.id"
          :color="category.color"
          :title="category.title"
          :count="category.count"
          :isCustom="category.isCustom"
        />
      </div>
      <div
        v-if="
          !newCategoryFormVisible &&
          categoriesStore.customCategories.length != 5
        "
        @click="newCategoryFormVisible = true"
        class="addNewCategory"
      >
        <img src="../assets/homepage/plus.svg" alt="" />
        <button>{{ t("sideBar.categories.addCategory") }}</button>
      </div>
      <div v-if="newCategoryFormVisible" class="addCategory_input">
        <input
          type="text"
          id="categoryTitle"
          v-model="categoryTitle"
          :placeholder="$t('sideBar.categories.newCatName')"
          class="categoryInput"
        />
        <input type="color" id="categoryColor" v-model="categoryColor" />
        <button @click="addCategory">+</button>
      </div>
    </div>
    </div>
    <div class="settings">
        <div class="langSwitcher">
      <LangSwincher />
    </div>

    <div class="profile">
      <div class="cover">
        <img src="" alt="" />
        <div class="box">
          <p class="name">{{ usersStore.currentUser?.username }}</p>
          <p class="email">{{ usersStore.currentUser?.email }}</p>
        </div>
      </div>
      <img src="../assets/homepage/settings.svg" alt="" />
    </div>
  </div>
    </div>
    
</template>

<style scoped>
* {
  /* border: 1px solid red; */
  font-size: 15px;
}
.sideBar {
  padding: 3vh 2vw;
  display: flex;
  flex-direction: column;
  gap: 2vh;
  align-items: start;
  border-radius: 30px;
  background-color: var(--bg-secondary);
  border-right: 1px solid rgba(43, 65, 41, 0.258);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0px;
  justify-content: space-between;
}

img {
  opacity: 0.3;
}

/* SEARCH BAR */

.searchBar {
  margin-top: 2vh;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  border-radius: 50px;
  background-color: white;
  padding: 5px 15px;
  border: 1px solid var(--bg-secondary2);
}

.searchBar img {
  width: 20px;
  height: 20px;
}

.searchBar input {
  border: none;
  outline: none;
}
.searchBar label {
  display: flex;
  align-items: center;
}

/* PAGE SWITCHER */
.sectionsBar {
  width: 100%;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sectionsBar .cover {
  border-radius: 5px;
  /* margin-bottom: 10px; */
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  /* background-color: ; */
  color: var(--text-secondary);
}

.sectionsBar .cover:hover {
  background-color: var(--bg-secondary2);
  color: var(--text-main);
}

.sectionsBar .cover:hover img {
  filter: brightness(0);
}

.sectionsBar .cover img {
  width: 20px;
  height: 20px;
}

/* CATEGORIES */
.categoriesWrapper {
     max-height: 30vh;
  overflow-y: auto;
  margin-bottom: 5px;
}

.categoriesWrapper::-webkit-scrollbar{
    visibility: hidden;
}



.categoriesBar h3 {
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0.5;
  margin-bottom: 2vh;
}

.categoriesBar {
  width: 100%;
}

.addNewCategory {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
  border-radius: 10px;
  border: 1.5px solid var(--bg-secondary2);
}
.addNewCategory button {
  border: none;
  opacity: 0.5;
  background-color: transparent;
}

.addCategory_input {
  /* display: grid; */
  /* grid-template-columns: 55% 5% 20%; */
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.addCategory_input button, .addCategory_input input {
    border: none;
    outline: none;
}

.addCategory_input button {
    background-color: var(--accent-color);
    border-radius: 10px;
    padding: 5px 15px;
    color: var(--bg-secondary);
}

.addCategory_input button:hover {
  filter: brightness(1.2);
}

.addCategory_input input[type="color"] {
  outline: none;
  border: none;
  height: 40px;
  width: 40px;
  border-radius: 10px;
}

/* lang switch */
.langSwitcher {
  width: 100%;
  justify-content: center;
}

.profile,
.addCategory_input {
  border-radius: 10px;
  padding: 5px 20px;
  width: 100%;
  background-color: white;
  border: 1.5px solid var(--bg-secondary2);
}

/* profile */
.profile {
  display: flex;
  align-items: center;
  /* margin-bottom: 10px; */
  justify-content: space-between;
  margin-top: 10px;
}
.profile .cover {
  display: flex;
  gap: 10px;
  align-items: center;
}

.profile .cover img {
  border-radius: 50px;
}

.email {
  font-size: 12px;
  opacity: 0.5;
}

.name {
  font-weight: 500;
}

img,
.name,
.email {
  cursor: pointer;
}

/*  */

.container, .settings {
    width: 100%;

}
</style>
