<script setup lang="ts">
import { useI18n } from "vue-i18n";
import LangSwincher from "../components/LangSwincher.vue";
import { useThemeStore, useUsersStore } from "../stores/store";
import { computed, ref } from "vue";
import defaulProfileImage from "../assets/profile.svg";

const { t } = useI18n();
const usersStore = useUsersStore();

const newUsernameInput = ref(usersStore.currentUser?.username || "");
const newEmailInput = ref(usersStore.currentUser?.email || "");
const previewImage = ref(usersStore.currentUser?.image || "");

const themeStore = useThemeStore();

const checkForEdits = computed(() => {
  const isNameChanged =
    newUsernameInput.value !== usersStore.currentUser?.username;
  const isEmailChanged = newEmailInput.value !== usersStore.currentUser?.email;
  const isImageChanged = previewImage.value !== usersStore.currentUser?.image;

  return !(isNameChanged || isEmailChanged || isImageChanged);
});

const fileInputRef = ref<HTMLInputElement | null>(null);

function triggerFileInput() {
  fileInputRef.value?.click();
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    if (e.target?.result) {
      previewImage.value = e.target.result as string;
    }
  };
  reader.readAsDataURL(file);
}

function editUser() {
  usersStore.editUser(
    previewImage.value,
    newUsernameInput.value,
    newEmailInput.value,
  );
}

function logOut(): void {
  usersStore.logout();
  themeStore.switchTheme("light");
  window.location.href = "/login";
}

function handleSwitch(mode: "light" | "dark"): void {
  themeStore.switchTheme(mode);
}
</script>

<template>
  <div class="settings">
    <div class="cover top">
      <div class="cover">
        <RouterLink to="/homepage"
          ><div class="backIcon">
            <img src="../assets/settings/arrow.svg" alt="" /></div
        ></RouterLink>
        <h1>{{ $t("settings.title") }}</h1>
      </div>

      <LangSwincher />
    </div>
    <div class="section profile">
      <h2>{{ $t("settings.profile") }}</h2>
      <div class="cover">
        <div class="avatar-container" @click="triggerFileInput">
          <img
            :src="previewImage || defaulProfileImage"
            alt="Avatar"
            class="profileImage"
          />
          <div class="avatar-hover-overlay">
            <span>⁺</span>
          </div>
        </div>

        <input
          type="file"
          ref="fileInputRef"
          style="display: none"
          accept="image/*"
          @change="onFileChange"
        />

        <div class="box">
          <p class="strong">{{ usersStore.currentUser?.username }}</p>
          <p class="hint">{{ $t("settings.hint1") }}</p>
        </div>
      </div>

      <div class="cover input">
        <div class="box">
          <label for="name">{{ $t("settings.name") }}</label> <br />
          <input
            :placeholder="usersStore.currentUser?.username"
            v-model="newUsernameInput"
            type="text"
            id="name"
          />
        </div>
        <div class="box">
          <label for="email">Email</label> <br />
          <input
            :placeholder="usersStore.currentUser?.email"
            v-model="newEmailInput"
            type="text"
            id="email"
          />
        </div>
      </div>
      <button @click="editUser" :disabled="checkForEdits">
        {{ $t("settings.save") }}
      </button>
    </div>

    <div class="section styling">
      <h2>{{ $t("settings.styling") }}</h2>
      <div class="cover">
        <div
          @click="handleSwitch('light')"
          class="box"
          :class="{ active: themeStore.theme == 'light' }"
        >
          <div class="box2 light"></div>
          <p>{{ $t("settings.light") }}</p>
        </div>
        <div
          @click="handleSwitch('dark')"
          class="box"
          :class="{ active: themeStore.theme == 'dark' }"
        >
          <div class="box2 dark"></div>
          <p>{{ $t("settings.dark") }}</p>
        </div>
      </div>
    </div>

    <div class="section exit">
      <h2>{{ $t("settings.account") }}</h2>
      <div class="cover">
        <div class="box">
          <p class="strong">{{ $t("settings.exitAcc") }}</p>
          <p class="hint">{{ $t("settings.hint2") }}</p>
        </div>
        <div @click="logOut" class="exitButton">
          <img src="../assets/settings/exit.svg" alt="" />
          <div class="">{{ $t("settings.exit") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top {
  margin-bottom: 2vh;
  align-self: self-start;
  width: 100%;
  justify-content: space-between;
}

h1 {
  font-size: 24px;
}

input {
  color: var(--text-main);
}

.backIcon {
  display: flex;
  align-items: center;
  border-radius: 100px;
  padding: 5px;
    background-color: var(--contrast);

  border: 1.5px solid var(--bg-secondary2);
}

.backIcon img {
  opacity: 0.5;
}

.backIcon:hover img {
  opacity: 1;
}

h2 {
  font-size: 14px;
  margin-bottom: 2vh;
  font-weight: 500;
}

.hint {
  opacity: 0.5;
}
.strong {
  font-weight: 600;
  color: var(--text-main);
}

.cover {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 2vh;
}

label {
  font-size: 14px;
}

input {
  margin-top: 5px;
  width: 100% !important;
  padding: 5px 20px;
  border: 1.5px solid var(--bg-secondary2);

  border-radius: 5px;
}

.profile button {
  padding: 10px 20px;
  border-radius: 10px;
  color: white;
  background-color: var(--accent-color);
  border: none;
}

.box {
  width: 100% !important;
}

.section {
  width: 100%;
    background-color: var(--contrast) !important;
  border: 1.5px solid var(--bg-secondary2);
  color: var(--text-secondary);
  padding: 2vh 2vw;
  border-radius: 20px;
  margin-bottom: 2vh;
}

.settings {
  background-color: var(--bg-main);
  border-radius: 30px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  width: 60vw;
  padding: 5vh 10vw;
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  min-height: 85vh;
  margin-top: -3vh;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.exitButton {
  cursor: pointer;
  color: #b85b48;
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 5px 20px;
  border: 1.5px solid #b85b48d3;
  border-radius: 10px;
  width: 25%;
  opacity: 0.5;
}
.exitButton:hover {
  opacity: 1;
}

.exitButton img {
  width: 20px;
}

.active {
  border: 1.5px solid var(--accent-color) !important;
  opacity: 1 !important;
}

.styling .box {
  cursor: pointer;
  opacity: 0.7;
  border: 1.5px solid var(--bg-secondary2);
  border-radius: 20px;
  padding: 10px 20px;
}

.box2 {
  background-color: var(--bg-secondary2);
  height: 10vh;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
}

.dark {
  background-color: black;
}

/* Контейнер для аватарки */
.avatar-container {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid var(--bg-secondary2);
  flex-shrink: 0;
}

.profileImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.avatar-hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.avatar-hover-overlay span {
  color: white;
  font-size: 28px;
  font-weight: 300;
  margin-top: 20px;
}

.avatar-container:hover .avatar-hover-overlay {
  opacity: 1;
}

.section,
.backIcon {
  background-color: var(--blocks);
}

@media (max-width: 1200px) {
   .settings {
    padding: 3vh 4vw;
    display: flex;
  border-radius: 0px;
  width: 100vw;
  justify-content: center;
  min-height: 95vh;
  margin-top: 0vh;
}
}

@media (max-width: 695px) {
  .styling .cover, .input, .exit .cover {
    flex-direction: column;
  }
  .section {
    padding: 2vh 3vw;
  }

  .exitButton {
    width: 100%;
  }
}
</style>
