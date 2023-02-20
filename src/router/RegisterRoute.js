const registerRoute = [
  {
    path: "/register",
    component: () =>
      import(
        /* webpackChunkName: "LoginLayout" */ "../layouts/LoginLayout.vue"
      ),

    children: [
      {
        path: "",
        name: "register",
        component: () =>
          import(
            /* webpackChunkName: "FormRegister" */ "../components/FormRegister.vue"
          ),
      },
    ],
  },
];

export default registerRoute;
