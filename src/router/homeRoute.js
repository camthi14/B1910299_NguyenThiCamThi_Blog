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
        path: "/about-me",
        name: "about-me",
        component: () =>
          import(/* webpackChunkName: "HomeView" */ "../views/AboutMe.vue"),
      },
      {
        path: "category/:slug",
        name: "category.slug",
        component: () =>
          import(
            /* webpackChunkName: "CategorySlug" */ "../views/CategorySlug.vue"
          ),
      },
      {
        path: "post/:slug",
        name: "post.slug",
        component: () =>
          import(/* webpackChunkName: "PostSlug" */ "../views/PostSlug.vue"),
      },
    ],
  },
];
export default homeRoute;
