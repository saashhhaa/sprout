import { defineStore } from "pinia";
import { i18n } from "../lang";

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  image: string;
}
export interface Category {
  color: string;
  title: string;
  count: number;
  isCustom: boolean;
}

export interface CustomCategory {
  id: number;
  userId: number;
  title: string;
  color: string;
  count: number;
  isCustom: boolean;
}
export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    categories: [
      {
        color: "#ffb32f",
        title: "work",
        count: 0,
        isCustom: false,
      },
      {
        color: "#7fde82",
        title: "study",
        count: 0,
        isCustom: false,
      },
      {
        color: "#d574e6",
        title: "personal",
        count: 0,
        isCustom: false,
      },
    ] as Category[],
    customCategories: JSON.parse(
      localStorage.getItem("categories") || "[]",
    ) as CustomCategory[],
  }),
  actions: {
    addCategory(categotyTitle: string, categoryColor: string): void {
      const users = useUsersStore();
      if (!users.currentUser) {
        return;
      }
      const newCategory: CustomCategory = {
        id: Date.now(),
        userId: users.currentUser.id,
        title: categotyTitle,
        color: categoryColor,
        count: 0,
        isCustom: true,
      };
      this.customCategories.push(newCategory);
      localStorage.setItem("categories", JSON.stringify(this.customCategories));
    },
    deleteCategory(categoryId: number): void {
      this.customCategories = this.customCategories.filter(
        (category) => category.id != categoryId,
      );
      localStorage.setItem("categories", JSON.stringify(this.customCategories));
    },
  },
});


export const useUsersStore = defineStore("users", {
  state: () => ({
    users: JSON.parse(localStorage.getItem("users") || "[]") as User[],
    currentUser: JSON.parse(
      localStorage.getItem("currentUser") || "null",
    ) as User | null,
  }),
  actions: {
    registerUser(username: string, password: string, email: string): void {
      const newUser: User = {
        id: Date.now(),
        username,
        password,
        email,
        image: "",
      };
      this.users.push(newUser);
      this.currentUser = newUser;
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      localStorage.setItem("users", JSON.stringify(this.users));
    },
    loginUser(email: string, password: string): boolean {
      const foundUser = this.users.find(
        (user) => user.email == email && user.password == password,
      );
      if (foundUser) {
        this.currentUser = foundUser;
        localStorage.setItem("currentUser", JSON.stringify(foundUser));

        return true;
      } else {
        return false;
      }
    },
    logout(): void {
      this.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    editUser(newImage: string, newUsername: string): void {
      if (!this.currentUser) {
        return;
      }
      this.currentUser.username = newUsername;
      this.currentUser.image = newImage;
      const editedUserIndex = this.users.findIndex(
        (user) => user.id == this.currentUser?.id,
      );
      if (editedUserIndex != -1) {
        this.users[editedUserIndex].username = newUsername;
      }
      this.users[editedUserIndex].image = newImage;
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
      localStorage.setItem("users", JSON.stringify(this.users));
    },
  },
});

export const useLangStore = defineStore("language", {
  state: () => ({
    lang: ((): "en" | "ru" => {
      const stored = localStorage.getItem("lang");
      return stored === "ru" || stored === "en" ? stored : "en";
    })(),
  }),
  actions: {
    setLang(newLang: "en" | "ru"): void {
      this.lang = newLang;
      localStorage.setItem("lang", newLang);
      
      if (i18n.mode === 'legacy') {
        i18n.global.locale.value = newLang;
      } else {
        (i18n.global.locale as any).value = newLang;
      }
    },
    initLang(): void {
      this.setLang(this.lang);
    },
  },
});
