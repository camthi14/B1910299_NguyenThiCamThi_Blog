const passwordRoute = [
  {
    path: "/password",
    component: () =>
      import(
        /* webpackChunkName: "LoginLayout" */ "../layouts/LoginLayout.vue"
      ),
    children: [
      {
        path: "change/:email",
        name: "change-password",
        component: () =>
          import(
            /* webpackChunkName: "ForgotPassword" */ "../views/ChangePassword.vue"
          ),
      },
    ],
  },
];

export default passwordRoute;
