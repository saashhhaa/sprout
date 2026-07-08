import { createRouter, createWebHashHistory } from "vue-router";
import Homepage from "../pages/Homepage.vue";
import Login from "../pages/Login.vue";
import Calendar from "../pages/Calendar.vue";
import Settings from "../pages/Settings.vue";
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/homepage",
      name: "homepage",
      component: Homepage,
    },
    {
      path: "/calendar",
      name: "calendar",
      component: Calendar,
    },
     {
      path: "/settings",
      name: "settings",
      component: Settings,
    },
  ],
});

export default router;