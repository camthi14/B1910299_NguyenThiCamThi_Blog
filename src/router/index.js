import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "HomeView" */ "../views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "AboutView" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "FormLogin" */ "../components/FormLogin.vue"),
    meta: {
      layout: "LoginLayout",
    },
  },
  {
    path: "/manager",
    name: "manager",
    redirect: { name: "dashboard" },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () =>
          import(
            /* webpackChunkName: "Dashboard" */ "../pages/manager/Dashboard.vue"
          ),
        meta: {
          layout: "ManagerLayout",
          auth: true, //*Kiểm tra xem người dùng có đăng nhập chưa
        },
      },
      {
        path: "category",
        children: [
          {
            path: "",
            name: "category",
            component: () =>
              import(
                /* webpackChunkName: "Category" */ "../pages/manager/category/Category.vue"
              ),
            meta: {
              layout: "ManagerLayout",
              auth: true,
            },
          },
          {
            path: "add",
            name: "add-category",
            component: () =>
              import(
                /* webpackChunkName: "CategoryAddEdit" */ "../pages/manager/category/CategoryAddEdit.vue"
              ),
            meta: {
              layout: "ManagerLayout",
              auth: true,
            },
          },
          {
            path: "update/:categoryId",
            name: "update-category",
            component: () =>
              import(
                /* webpackChunkName: "CategoryAddEdit" */ "../pages/manager/category/CategoryAddEdit.vue"
              ),
            meta: {
              layout: "ManagerLayout",
              auth: true,
            },
          },
        ],
      },
    ],
  },
  {
    path: "/404",
    name: "notfound",
    component: () =>
      import(
        /* webpackChunkName: "NotFoundView" */ "../views/NotFoundView.vue"
      ),
    meta: {
      layout: "NotFoundLayout",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "notfound" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, form, next) => {
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
  next();
});

export default router;
