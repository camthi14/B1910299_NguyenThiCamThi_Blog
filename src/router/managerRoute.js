const managerRoute = [
  {
    path: "/manager",
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
];

export default managerRoute;
