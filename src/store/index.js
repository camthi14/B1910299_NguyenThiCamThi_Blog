import { createStore } from "vuex";
import auth from "../store/modules/auth";
import category from "../store/modules/category";
import toast from "../store/modules/toast";
import post from "../store/modules/post";

export default createStore({
  modules: {
    auth,
    category,
    toast,
    post,
  },

  devtools: process.env.NODE_ENV !== "production",
});
