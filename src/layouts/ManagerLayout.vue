<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import authApi from "../apis/authApi";

const drawer = ref(null);
const links = ref([
  ["mdi-inbox-arrow-down", "Dashboard", "/manager/dashboard"],
  ["mdi-clipboard-text", "Category", "/manager/category"],
]);
const store = useStore();
const router = useRouter();
const theme = ref(localStorage.getItem("theme") || "light");
function onClick() {
  theme.value = theme.value === "light" ? "dark" : "light";
  localStorage.setItem("theme", theme.value);
}

const user = computed(() =>
  Object.keys(store.state.auth.user).length === 0 ? null : store.state.auth.user
);

store.dispatch("auth/getCurrentUserLogin").catch(async (error) => {
  if (
    error.response &&
    error.response.data &&
    error.response.data.errors &&
    error.response.data.errors.message !== "jwt expired"
  ) {
    await handleLogout();
  }
});

const handleLogout = async () => {
  try {
    const response = await authApi.signOut();

    if (response) {
      store.dispatch("auth/remove");
      router.push("/login");
    }
  } catch (error) {
    console.log("error handleLogout:::", error);
    throw new Error(error.message);
  }
};
</script>

<template>
  <v-app id="inspire" :theme="theme">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Hello, {{ user && user.email }}</v-toolbar-title>

      <v-btn
        :prepend-icon="
          theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
        "
        @click="onClick"
      >
        Toggle Theme
      </v-btn>

      <v-btn variant="outlined" @click="handleLogout">Đăng xuất</v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list-item v-for="[icon, text, to] in links" :key="icon" link>
        <router-link :to="to" class="text-decoration-none d-flex">
          <v-icon class="mr-3">{{ icon }}</v-icon>
          <v-list-item-title> {{ text }} </v-list-item-title>
        </router-link>
      </v-list-item>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-row>
          <slot />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
