<script setup>
import { useI18n } from "vue-i18n";
import eye from "../assets/loginPage/eye.svg";
import eyeSlash from "../assets/loginPage/eye-slash.svg";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "../stores/store.ts";
import LangSwincher from "../components/LangSwincher.vue";
import Logotype from "../components/Logotype.vue";
const { t } = useI18n();

const isPasswordVisible = ref(false);
const isRegisterVisible = ref(false);

const passwordInput = ref("");
const passwordCheckInput = ref("");
const emailInput = ref("");
const usernameInput = ref("");
const router = useRouter();
const message = ref("");

const usersStore = useUsersStore();

function createUser() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const passwordCheck = passwordCheckInput.value.trim();
  const email = emailInput.value.trim();

  const isNameTaken = usersStore.users?.some(
    (user) => user.username == username,
  );

  if (email.length === 0 || username.length === 0 || password.length === 0) {
    message.value = t("errors.errorNoData");
  } else if (username.length < 2) {
    message.value = t("errors.errorUsernameValid");
  } else if (password.length < 6) {
    message.value = t("errors.errorPasswordValid");
  } else if (password !== passwordCheck) {
    message.value = t("errors.errorPasswordMatch");
  } else if (isNameTaken) {
    message.value = t("errors.errorUsernameTaken");
  } else {
    message.value = "";
    usersStore.registerUser(username, password, email);
    router.push("/homepage");
  }
}

function validate() {
  if (
    emailInput.value.trim().length == 0 ||
    passwordInput.value.trim().length == 0
  ) {
    message.value = t("errors.errorNoData");
  } else {
    const success = usersStore.loginUser(emailInput.value, passwordInput.value);

    if (success) {
      router.push("/homepage");
    } else {
      message.value = t("errors.errorNoSuchAcc");
    }
  }
}
</script>

<template>
  <div class="container login">
    <div class="box heroBox">
      <div class="logotype-desktop"><Logotype /></div>
      <img class="heroImage" src="../assets/backImage.svg" />
      <div class="quote">
        <h2>{{ t("login.quote") }}</h2>
        <p>{{ t("login.hint") }}</p>
      </div>
    </div>
    <!-- ВХОД -->
    <div v-if="!isRegisterVisible" class="box loginBox">
      <div class="logotype-mobile"><Logotype /></div>

      <h1>{{ t("login.welcomeBack") }}</h1>
      <p class="hint">{{ t("login.hint3") }}</p>
      <div class="input">
        <label for="email">Email</label> <br />
        <div class="cover">
          <label for="email" class="labelImg"
            ><img src="../assets/loginPage/email.svg"
          /></label>

          <input
            required
            v-model="emailInput"
            type="email"
            id="email"
            placeholder="email@example.com"
          />
        </div>
      </div>
      <div class="input">
        <label for="password">{{ t("login.password") }}</label> <br />
        <div class="cover">
          <label for="password" class="labelImg">
            <img src="../assets/loginPage/password.svg"
          /></label>
          <input
            v-model="passwordInput"
            :type="isPasswordVisible ? 'text' : 'password'"
            id="password"
            placeholder="123password"
            required
          />
          <img
            @click="isPasswordVisible = !isPasswordVisible"
            :src="isPasswordVisible ? eyeSlash : eye"
            class="eye"
          />
        </div>
      </div>
      <p class="error">{{ message }}</p>

      <button :disabled="emailInput.trim()=='' || passwordInput.trim()==''" @click="validate()">
        {{ t("login.logInButton") }} <img src="../assets/arrow.svg" />
      </button>
      <p class="hint2">
        {{ t("login.hint2") }}
        <span @click="isRegisterVisible = true">{{
          t("login.linkRegis")
        }}</span>
      </p>
      <div class="langSwitcher">
        <LangSwincher />
      </div>
    </div>
    <!-- РЕГИСТРАЦИЯ -->

    <div v-else class="box loginBox">
      <div class="logotype-mobile"><Logotype /></div>

      <h1>{{ t("register.title") }}</h1>
      <p class="hint">{{ t("register.hint1") }}</p>
      <div class="input">
        <label for="name">{{ t("register.name") }}</label> <br />
        <div class="cover">
          <label for="name" class="labelImg"
            ><img src="../assets/loginPage/user.svg"
          /></label>
          <input
            required
            v-model="usernameInput"
            type="text"
            id="name"
            :placeholder="t('register.namePlaceholder')"
          />
        </div>
      </div>
      <div class="input">
        <label for="email">Email</label> <br />
        <div class="cover">
          <label for="email" class="labelImg"
            ><img src="../assets/loginPage/email.svg"
          /></label>
          <input
            required
            v-model="emailInput"
            type="email"
            id="email"
            placeholder="email@example.com"
          />
        </div>
      </div>
      <div class="input">
        <label for="password">{{ t("login.password") }}</label> <br />
        <div class="cover">
          <label for="password" class="labelImg">
            <img src="../assets/loginPage/password.svg"
          /></label>
          <input
            required
            v-model="passwordInput"
            :type="isPasswordVisible ? 'text' : 'password'"
            id="password"
            placeholder="123password"
          />
          <img
            @click="isPasswordVisible = !isPasswordVisible"
            :src="isPasswordVisible ? eyeSlash : eye"
            class="eye"
          />
        </div>
      </div>
      <div class="input">
        <label for="password">{{ t("register.repeatPassword") }}</label>
        <br />
        <div class="cover">
          <input
            required
            v-model="passwordCheckInput"
            :type="isPasswordVisible ? 'text' : 'password'"
            id="password"
            placeholder="123password"
          />
        </div>
      </div>
      <p class="error">{{ message }}</p>
      <button @click="createUser()" :disabled="emailInput.trim()=='' || passwordInput.trim()=='' || passwordCheckInput.trim()=='' || usernameInput.trim()==''">
        {{ t("register.buttonRegis") }} <img src="../assets/arrow.svg" />
      </button>
      <p class="hint2">
        {{ t("register.hint2") }}
        <span @click="isRegisterVisible = false">{{
          t("register.linkLogin")
        }}</span>
      </p>
      <div class="langSwitcher">
        <LangSwincher />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Great+Vibes&family=Jost:ital,wght@0,100..900;1,100..900&display=swap");

button:disabled{
  opacity: 0.5;
  cursor: not-allowed;
}
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: var(--bg-main);
  border-radius: 30px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  width: 80vw;
  min-height: 85vh;
  margin-top: -3vh;
}

.logotype2 {
  display: block;
}
.box {
  padding: 4vh 4vw;

  display: flex;
  flex-direction: column;
}

.quote {
  width: 70%;
}

.quote h2 {
  line-height: 1;
  font-weight: 400;
  font-family: "EB Garamond";
  font-size: 2rem;
  margin-bottom: 2vh;
}

.quote p {
  color: var(--text-secondary);
}

.heroImage {
  width: 15vw;
  height: auto;
  margin: 10vh 0;
  align-self: center;
}

.heroBox {
  background: linear-gradient(-90deg, #dfebdf 0%, transparent 100%);
}

.loginBox {
  display: flex;
  align-self: center;
  justify-self: center;
  width: 70%;
  text-align: start;
  gap: 1vh;
}

h1 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: -2vh;
}

p,
label {
  color: var(--text-secondary);
}

label {
  font-weight: 500;
}

input {
  background-color: transparent;
}

.cover {
  margin-top: 1vh;
  background-color: white;
  padding: 7px 20px;
  border-radius: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 30px;
  border: 1px solid var(--bg-secondary2);
}

.cover:hover {
  box-shadow: 0px 2px 10px rgba(25, 83, 47, 0.1);
}

.cover img {
  filter: brightness(0.5);
  cursor: pointer;
}

.hint {
  margin: 2vh 0;
}

button {
  background-color: var(--accent-color);
  color: white;

  border-radius: 50px;
  padding: 10px 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

input,
button {
  border: none;
  width: 100%;

  outline: none;
}

button img {
  filter: brightness(0) invert(1);
}

.hint2 {
  text-align: center;
  padding-top: 1vh;
  margin-top: 1vh;
  border-top: 2px solid var(--bg-secondary2);
}

.hint2 span {
  color: var(--accent-color);
  font-weight: 600;
  cursor: pointer;
}

.hint2 span:hover {
  text-decoration: underline;
}

.error {
  color: rgba(255, 0, 0, 0.62);
  text-align: center;
}

.langSwitcher {
  align-self: center;
  margin-top: 1vh;
  justify-self: flex-end !important;
}

.logotype-desktop {
  display: block;
}

.logotype-mobile {
  display: none;
}

@media (max-width: 650px) {
  .heroBox {
    display: none;
  }
  .container {
    display: flex;
    flex-direction: column;
    padding: 2vh 5vw;
    justify-content: center;
  }
  .logotype-mobile {
    display: flex;
    margin-bottom: 2vh;
  }
}

@media (max-width: 1134px) {
  * {
    font-size: small;
  }
  .loginBox {
    width: 100%;
  }
  h1,
  h2 {
    font-size: 1.2rem !important;
  }
  .cover img,
  .cover .labelImg {
    display: none;
  }
}
</style>
