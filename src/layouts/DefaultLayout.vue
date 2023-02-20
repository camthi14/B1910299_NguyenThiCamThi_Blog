<script>
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import SideBar from "../components/Sidebar.vue";

export default defineComponent({
  component: { SideBar },
  setup() {
    const drawer = ref(null);
    const store = useStore();
    const theme = ref(localStorage.getItem("theme") || "light");

    function onClick() {
      theme.value = theme.value === "light" ? "dark" : "light";
      localStorage.setItem("theme", theme.value);
    }

    const categories = computed(() => store.state.category.categories);
    onBeforeMount(() => {
      store.dispatch("category/fetchAllWithChildrenCategory");
    });

    return {
      onClick,
      theme,
      categories,
      drawer,
    };
  },
});
</script>

<template>
  <v-app id="inspire" :theme="theme">
    <v-app-bar>
      <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-avatar color="grey-darken-1" size="32">
        <img
          cover
          src="https://media.istockphoto.com/id/1167874731/vi/vec-to/minh-h%E1%BB%8Da-vector-logo-nh%C3%A0-m%C3%A0u-xanh-l%C3%A1-c%C3%A2y.jpg?s=170667a&w=0&k=20&c=di7n-MsjsbX0Qay-jsptKEromWek21QNVevcy3pmmyQ="
          alt="avt"
        />
      </v-avatar>
      <v-toolbar-title>
        <router-link to="/" class="text-decoration-none"
          >Mykitches Ashley</router-link
        >
      </v-toolbar-title>

      <v-tabs centered color="grey-darken-2">
        <v-tab v-for="category in categories" :key="category._id" link>
          <router-link
            :to="`/category/${category.slug}`"
            class="text-decoration-none d-flex"
          >
            <v-list-item-title class="text-capitalize">
              {{ category.name }}
            </v-list-item-title>
          </router-link>
        </v-tab>
      </v-tabs>
      <v-btn
        :prepend-icon="
          theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
        "
        @click="onClick"
      >
      </v-btn>

      <div>
        <v-btn to="/manager/dashboard" class="text-success" variant="outlined">
          Đăng bài
        </v-btn>
      </div>
    </v-app-bar>
    <!-- <SideBar :drawer="drawer" /> -->

    <v-main>
      <v-container>
        <v-row>
          <router-view />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
