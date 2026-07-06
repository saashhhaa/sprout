import { createI18n } from "vue-i18n";

export const lang = {
  en: {
    login: {
      quote: "«Any big goal starts with one small task.»",
      hint: "Keep track of things as naturally as a plant grows - step by step, day by day.",
      password: "Password",
      logInButton: "Log In",
      hint2: "First time here?",
      linkRegis: "Create account",
      welcomeBack: "Welcome back",
      hint3: "Log in to continue care for your tasks.",
    },
    register: {
      title: "Register",
      hint1: "Register to start caring for your tasks.",
      name: "Name",
      namePlaceholder: "Sprouty",
      repeatPassword: "Repeat password",
      hint2: "Already in a team?",
      linkLogin: "Log in!",
      buttonRegis: "Create",
    },
    errors: {
      errorNoData: "please, write your data",
      errorPasswordMatch: "passwords do not match",
      errorPasswordValid: "password must be at least 6 symbols",
      errorUsernameTaken: "this username is taken",
      errorUsernameValid: "usersname must be at least 2 symbols",
      errorNoSuchAcc: "no such account or wrong password",
    },
    sideBar:{
      search: "Find task",
      homepage: "Homepage",
      calendar: "Calendar",
      categories: {
        title: "Categories",
        work: "work",
        personal: "personal",
        study: "study",
        addCategory: "Add category",
        newCatName: 'category name'
      },
    },
  },
  ru: {
    login: {
      quote: "«Любая большая цель начинается с одной маленькой задачи.»",
      hint: "Отслеживайте дела так же естественно, как растёт растение — шаг за шагом, день за днём.",
      password: "Пароль",
      logInButton: "Войти",
      hint2: "Впервые здесь?",
      linkRegis: "Создать аккаунт",
      welcomeBack: "С возвращением",
      hint3: "Войдите, чтобы продолжить ухаживать за своими задачами.",
    },
    register: {
      title: "Регистрация",
      hint1: "Зарегистрируйтесь, чтобы начать ухаживать за своими задачами.",
      name: "Имя",
      namePlaceholder: "Спрути",
      repeatPassword: "Повторить пароль",
      hint2: "Уже в команде?",
      linkLogin: "Войти!",
      buttonRegis: "Создать",
    },

    errors: {
      errorNoData: "пожалуйста, заполните поля",
      errorPasswordMatch: "пароли не совпадают",
      errorPasswordValid: "пароль дожен быть минимум из 6 символов",
      errorUsernameTaken: "этот никнейм занят",
      errorUsernameValid: "никнейм должен быть минимум из 2 символов",
      errorNoSuchAcc: "пользователь не найден или неверный пароль",
    },
    sideBar: {
      search: "Найти задачу",
      homepage: "Главная",
      calendar: "Календарь",
      categories: {
        title: "Категории",
        work: "работа",
        personal: "личное",
        study: "учеба",
        addCategory: "Добавить категорию",
        newCatName: 'назови категорию'
      },
    },
  },
};

export const i18n = createI18n({
  legacy: false,
  locale: "ru",
  fallbackLocale: "ru",
  messages: lang,
});
