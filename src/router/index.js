import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

const routes = [
  {
    path: "/",
    component: () =>
      import(
        /* webpackChunkName: "DefaultLayout" */ "../layouts/DefaultLayout.vue"
      ),

    children: [
      {
        path: "",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "HomeView" */ "../views/HomeView.vue"),
      },
      {
        path: "about",
        name: "about",
        component: () =>
          import(/* webpackChunkName: "AboutView" */ "../views/AboutView.vue"),
      },
      {
        path: "login",
        component: () =>
          import(
            /* webpackChunkName: "LoginLayout" */ "../layouts/LoginLayout.vue"
          ),

        children: [
          {
            path: "",
            name: "login",
            component: () =>
              import(
                /* webpackChunkName: "FormLogin" */ "../components/FormLogin.vue"
              ),
          },
        ],
      },
      {
        path: "manager",
        redirect: { name: "dashboard" },
        component: () =>
          import(
            /* webpackChunkName: "ManagerLayout" */ "../layouts/ManagerLayout.vue"
          ),
        children: [
          {
            path: "dashboard",
            name: "dashboard",
            component: () =>
              import(
                /* webpackChunkName: "Dashboard" */ "../pages/manager/Dashboard.vue"
              ),
            meta: {
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
                  auth: true,
                },
              },
              {
                path: "add",
                name: "add-category",
                component: () =>
                  import(
                    /* webpackChunkName: "CategoryAdd" */ "../pages/manager/category/CategoryAddEdit.vue"
                  ),
                meta: {
                  auth: true,
                },
              },
              {
                path: "add/children/:parentId",
                name: "add-category-children",
                component: () =>
                  import(
                    /* webpackChunkName: "CategoryAddChildren" */ "../pages/manager/category/CategoryAddEdit.vue"
                  ),
                meta: {
                  auth: true,
                },
              },
              {
                path: "update/:categoryId",
                name: "update-category",
                component: () =>
                  import(
                    /* webpackChunkName: "CategoryEdit" */ "../pages/manager/category/CategoryAddEdit.vue"
                  ),
                meta: {
                  auth: true,
                },
              },
            ],
          },
          {
            path: "post",
            children: [
              {
                path: "",
                name: "post",
                component: () =>
                  import(
                    /* webpackChunkName: "Post" */ "../pages/manager/post/Post.vue"
                  ),
                meta: {
                  auth: true,
                },
              },
              {
                path: "add",
                name: "add-post",
                component: () =>
                  import(
                    /* webpackChunkName: "PostAdd" */ "../pages/manager/post/PostAddEdit.vue"
                  ),
                meta: {
                  auth: true,
                },
              },
              {
                path: "update/:postId",
                name: "update-post",
                component: () =>
                  import(
                    /* webpackChunkName: "PostUpadte" */ "../pages/manager/post/PostAddEdit.vue"
                  ),
                meta: {
                  auth: true,
                },
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "/404",
    component: () =>
      import(
        /* webpackChunkName: "NotFoundLayout" */ "../layouts/NotFoundLayout.vue"
      ),

    children: [
      {
        path: "",
        name: "notfound",
        component: () =>
          import(
            /* webpackChunkName: "NotFoundView" */ "../views/NotFoundView.vue"
          ),
      },
    ],
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
