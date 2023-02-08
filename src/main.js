import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import "./assets/css/styles.css";
import CKEditor from "@ckeditor/ckeditor5-vue";

createApp(App).use(store).use(router).use(vuetify).use(CKEditor).mount("#app");
