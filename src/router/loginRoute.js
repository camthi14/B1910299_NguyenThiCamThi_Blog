const loginRoute = [
  {
    path: "/login",
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
        meta: {
          auth: true,
        },
      },
    ],
  },
];

export default loginRoute;
