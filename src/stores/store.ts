import { defineStore } from "pinia";
import { i18n } from "../lang";

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  image: string;
}

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
