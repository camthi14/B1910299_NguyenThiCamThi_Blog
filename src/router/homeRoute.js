const homeRoute = [
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
        path: "category/:slug",
        name: "category.slug",
        component: () =>
          import(
            /* webpackChunkName: "HomeView" */ "../views/CategorySlug.vue"
          ),
      },
    ],
  },
];
export default homeRoute;
