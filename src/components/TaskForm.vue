<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import {
  useCategoriesStore,
  useTasksSStore,
  useUsersStore,
} from "../stores/store";
import dayjs from "dayjs";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const isModalVisible = ref(false);

const tasks = useTasksSStore();
const users = useUsersStore();
const categoriesStore = useCategoriesStore();
const newTaskTitle = ref("");
const newTaskDeadline = ref("");
const newTaskCategory = ref("work");

const { t } = useI18n();

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

function getTranslatedTitle(title: string): string {
  switch (title) {
    case "work":
      return t("sideBar.categories.work");
    case "study":
      return t("sideBar.categories.study");
    case "personal":
      return t("sideBar.categories.personal");
    default:
      return title;
  }
}

const modalRef = ref(null);
onClickOutside(modalRef, () => {
  isModalVisible.value = false;
});
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
        <!-- Основные дефолтные категории -->
        <div
          v-for="category in categoriesStore.categories"
          :key="category.title"
          class="category"
          :class="{ active: newTaskCategory === category.title }"
          @click="newTaskCategory = category.title"
        >
          <div
            :style="{ backgroundColor: category.color }"
            class="catCol"
          ></div>
          <div>{{ getTranslatedTitle(category.title) }}</div>
        </div>

        <div
          v-if="categoriesStore.customCategories.length > 0"
          class="custom-cat-wrapper"
          ref="modalRef"
        >
          <div
            v-if="
              categoriesStore.customCategories.some(
                (cat) => cat.title === newTaskCategory,
              )
            "
            class="category active custom-selected-badge"
          >
            <div
              :style="{
                backgroundColor: categoriesStore.customCategories.find(
                  (cat) => cat.title === newTaskCategory,
                )?.color,
              }"
              class="catCol"
            ></div>
            <div>{{ newTaskCategory }}</div>
            <span class="clear-custom" @click.stop="newTaskCategory = 'work'"
              >×</span
            >
          </div>

          <p
            v-else
            @click.stop="isModalVisible = !isModalVisible"
            class="moreCategories"
          >
            {{ $t("taskManager.more") }} ▾
          </p>

          <div v-if="isModalVisible" class="custom-popover">
            <div class="popover-content">
              <div
                v-for="category in categoriesStore.customCategories"
                :key="category.title"
                class="category popover-item"
                :class="{ active: newTaskCategory === category.title }"
                @click="
                  newTaskCategory = category.title;
                  isModalVisible = false;
                "
              >
                <div
                  :style="{ backgroundColor: category.color }"
                  class="catCol"
                ></div>
                <div>{{ category.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="taskDateCover">
        <label for="date"
          ><img src="../assets/homepage/calendar.svg" alt=""
        /></label>
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
.custom-cat-wrapper {
  position: relative;
  display: inline-block;
}

.moreCategories {
  background-color: var(--bg-secondary);
  border: 1.5px solid var(--bg-secondary2);
  color: var(--text-secondary);
  padding: 5px 20px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  margin: 0;
}

.moreCategories:hover {
  filter: brightness(0.95);
  color: var(--text-main);
}

.custom-selected-badge {
  padding-right: 12px !important;
  animation: fadeIn 0.2s ease;
}

.clear-custom {
  margin-left: 6px;
  font-size: 18px;
  font-weight: bold;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  transition: background-color 0.1s;
}

.clear-custom:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: var(--text-main);
}

.custom-popover {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background-color: var(--blocks);
  border: 1.5px solid var(--bg-secondary2);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  min-width: 220px;
  z-index: 110;
  padding: 12px;
  animation: slideDown 0.15s ease;
}

.popover-header {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
  padding-left: 4px;
}

.popover-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 160px;
  overflow-y: auto;
}

.popover-item {
  width: 100%;
  box-sizing: border-box;
  justify-content: flex-start;
  padding: 8px 14px;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.addTaskBar {
  margin-top: 2vh;
  border-radius: 20px;
  padding: 2vh 20px;
  background-color: var(--blocks);
  border: 1.5px solid var(--bg-secondary2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}
.taskTitle {
  background-color: transparent;
  color: var(--text-main);
}

.moreCategories {
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  padding: 5px 20px;
  border-radius: 50px;
  opacity: 0.7;
  cursor: pointer;
}
.moreCategories:hover {
  opacity: 1;
}
.addTaskBar {
  margin-top: 2vh;
  border-radius: 20px;
  padding: 2vh 20px;
  /* width: 100%; */
   background-color: var(--contrast);

  border: 1.5px solid var(--bg-secondary2);
  box-shadow: 0 0px 5px rgba(29, 51, 28, 0.076);
}
.taskTitle {
  width: 100%;
  height: 100%;
  font-size: 20px;
}

input {
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
  align-items: center;
}

.category {
  background-color: var(--bg-secondary);
  border: 1.5px solid var(--bg-secondary2);
  color: var(--text-secondary);
}

.taskDateCover,
.category,
select {
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

.taskDateCover input {
  background-color: transparent;
  font-size: 14px !important;
  color: var(--text-secondary);
}

.taskDateCover img {
  opacity: 0.5;
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
  border-color: rgba(167, 208, 167, 0.463);
}
</style>
