<script setup>
import { useI18n } from "vue-i18n";
import { useTasksSStore, useUsersStore } from "../stores/store";
import { computed } from "vue";
import dayjs from "dayjs";

const todayDate = computed(() => dayjs().format("YYYY-MM-DD"));
const { locale, t } = useI18n();

const date = computed(() => {
  const currentLocale = locale.value === "en" ? "en-US" : "ru-RU";
  const today = new Date();
  return new Intl.DateTimeFormat(currentLocale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(today);
});
const tasksStore = useTasksSStore();
const usersStore = useUsersStore();
</script>
<template>
  <div class="greeting">
    <div class="cover todayTasks">
      <img src="../assets/logotype.svg" alt="" />
      <div class="box">
        <h2>
          {{
            tasksStore.tasks.filter((task) => task.deadlineDate == todayDate)
              .length
          }}
        </h2>
        <p>{{ $t("taskManager.tasksForToday") }}</p>
      </div>
    </div>

    <div class="cover left">
      <div class="box">
        <p>{{ date }}</p>
        <h2>
          {{ $t("taskManager.greeting") }}
          {{ usersStore.currentUser?.username }}
        </h2>
      </div>
      <img src="../assets/backImage.svg" alt="" />
    </div>
  </div>
</template>

<style scoped>
.greeting {
  width: 100%;
  border-radius: 20px;
  border: 1px solid rgba(74, 139, 88, 0.153);
  background: linear-gradient(to right, #cae4cb, transparent);
  padding: 2vh 2vw;
  display: flex;
  justify-content: space-between;
}

.cover {
    display: flex;
    align-items: center;
    gap: 20px;
}

.todayTasks {
      border-radius: 10px;
  padding: 5px 20px;
  /* width: 100%; */
  background-color: white;
  border: 1.5px solid var(--bg-secondary2);

}

.todayTasks p {
    font-size: 14px;
    opacity: .5;

}

.todayTasks img{
    width: 35px;
    height: 35px;
    filter: brightness(0.6);
}

.todayTasks h2 {
    font-size: 20px;
}

.left {
    display: flex;
}

.left img {
    width: 70px;
    height: 70px;
}

.left h2 {
    font-size: 24px;
    font-weight: 500;
}
.left p {
    opacity: .5;
}

</style>
