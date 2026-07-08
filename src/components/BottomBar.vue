<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useCategoriesStore } from "../stores/store";
import { onClickOutside } from "@vueuse/core";

const { t } = useI18n();
const categoriesStore = useCategoriesStore()
const categoryTitle = ref("");
const categoryColor = ref("#1a9185");
function addCategory(): void {
  if (categoryTitle.value.trim() == "") {
      isModalVisible.value = false;

    return;
  } else {
    categoriesStore.addCategory(categoryTitle.value, categoryColor.value);
  }
  categoryTitle.value = "";
  categoryColor.value = "#1a9185";
  isModalVisible.value = false;
}

const isModalVisible = ref(false)
const modalRef = ref(null);
onClickOutside(modalRef, () => {
  isModalVisible.value = false;
});

</script>

<template>
  <div class="bottomBar">
    <RouterLink to="/homepage">
      <div class="cover">
        <img src="../assets/homepage/home.svg" alt="" />
        <p>{{ t("sideBar.homepage") }}</p>
      </div>
    </RouterLink>
    <RouterLink to="/calendar">
      <div class="cover">
        <img src="../assets/homepage/calendar.svg" alt="" />
        <p>{{ t("sideBar.calendar") }}</p>
      </div>
    </RouterLink>
    <RouterLink to="/settings">
      <div class="cover">
        <img src="../assets/homepage/settings.svg" alt="" />
        <p>{{ t("settings.title") }}</p>
      </div>
    </RouterLink>
    <div @click.stop="isModalVisible = true" class="cover">
        <img src="../assets/homepage/plus.svg" alt="">
        <p>{{ $t('sideBar.categories.addCategory') }}</p>
    </div>
  </div>

    <div class="modal" v-if="isModalVisible">
    <div class="content" ref="modalRef">
      <input
        type="text"
        id="categoryTitle"
        v-model="categoryTitle"
        :placeholder="$t('sideBar.categories.newCatName')"
        class="categoryInput"
      />
      <input type="color" id="categoryColor" v-model="categoryColor" class="colorInput" />
      <button @click="addCategory" class="add-btn">+</button>
    </div>
  </div>

</template>

<style scoped>
.bottomBar {
    text-align: center;
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  justify-content: space-between;
  background-color: var(--bg-secondary);
  padding: 2vh 4vw;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

a {
  text-decoration: none !important;
  font-weight: 600;
}

.cover {
    cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-secondary);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 100%;
  opacity: 0.5;
  padding: 20px;
}

.cover:hover {
  opacity: 1;
}

.modal {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.296);
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    width: 100vw;
    height: 100vh;
}

.content {
    width: fit-content;
    padding: 2vh 2vw;
    display: flex;
    align-items: center;
    height: 10vh;
    border-radius: 20px;
    gap: 10px;
    background-color: var(--contrast);

}

.content {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.content button, .content input {
    border: none;
    outline: none;
}

.content button {
    background-color: var(--accent-color);
    border-radius: 10px;
    padding: 5px 15px;
    color: var(--bg-secondary);
}

.content button:hover {
  filter: brightness(1.2);
}

.content input[type="color"] {
  outline: none;
  border: none;
  height: 40px;
  width: 40px;
  border-radius: 10px;
}

@media (max-width: 1000px) {
  .bottomBar {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
