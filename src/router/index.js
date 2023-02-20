import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import homeRoute from "./homeRoute";
import passwordRoute from "./passwordRoute";
import notFoundRoute from "./notFoundRoute";
import managerRoute from "./managerRoute";
import loginRoute from "./loginRoute";
import registerRoute from "./RegisterRoute";
import confirmRoute from "./confirmRoute";

const routes = [
  ...homeRoute,
  ...passwordRoute,
  ...loginRoute,
  ...registerRoute,
  ...confirmRoute,
  ...managerRoute,
  ...notFoundRoute,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView({ behavior: "smooth" });
  },
});

router.beforeEach((to, form, next) => {
  if (to.meta?.auth) {
    const isLoggedIn = store.getters["auth/isLoggedIn"];
    if (to.path !== "/login" && !isLoggedIn) {
      next({
        name: "login",
      });
    }

    if (to.path === "/login" && isLoggedIn) {
      next({
        name: "dashboard",
      });
    }
  }
  next();
});

export default router;
