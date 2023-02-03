import { createStore } from "vuex";
import auth from "../store/modules/auth";
import category from "../store/modules/category";

export default createStore({
  modules: {
    auth,
    category,
  },

  devtools: process.env.NODE_ENV !== "production",
});
