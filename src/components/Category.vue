<script setup lang="ts">
import { ref } from "vue";
import { useCategoriesStore } from "../stores/store";

interface Props {
  id?: number;
  title: string;
  color: string;
  count: number;
  isCustom?: boolean;
  doneCount: number;
}

const props = defineProps<Props>();

const categories = useCategoriesStore();
const isClicked = ref(false);
function deleteCategory(): void {
  if (props.id) {
    categories.deleteCategory(props.id);
    isClicked.value = true;
  }
}
</script>

<template>
  <div class="category">
    <div class="category-icon" :style="{ backgroundColor: props.color }"></div>
    <div>{{ props.title }}</div>
    <img
      v-if="isCustom"
      @click="deleteCategory"
      class="delete"
      src="../assets/homepage/delete.svg"
      alt=""
    />
    <div class="box" v-else></div>
    <div class="category-count">{{props.doneCount}}/{{ props.count }}</div>
  </div>
</template>

<style scoped>
* {
    font-size: 15px;
}
.category {
  display: grid;
  grid-template-columns: 10% 50% 10% 10%;
  gap: 10px;
  align-items: center;
  border-radius: 10px;
  padding: 10px 20px;
  width: 100%;
  background-color: white;
  border: 1.5px solid var(--bg-secondary2);
  margin-bottom: 10px;
}

.delete {
  opacity: 0;
}

.active {
  background-color: rgba(215, 229, 250, 0.316) !important;
  border: 1px solid rgba(255, 255, 255, 0.477);
}

.box,
.delete {
  width: 20px;
  height: 20px;
}

.category:hover .delete {
  opacity: 0.5;
}

.delete:hover {
  opacity: 1;
}

.category-icon {
  width: 20px;
  height: 20px;
  border-radius: 5px;
}

.category-count {
  /* text-align: end; */
  opacity: .5;
}

.category:hover {
  cursor: pointer;
}

</style>