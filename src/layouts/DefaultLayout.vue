<script>
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import SideBar from "../components/Sidebar.vue";
import image from "../../public/img/Ashley can cook.png";
import { useRoute } from "vue-router";

export default defineComponent({
  component: { SideBar },
  setup() {
    const store = useStore();
    const theme = ref(localStorage.getItem("theme") || "light");
    const route = useRoute();

    const slug = computed(() => route.params.slug);

    function onClick() {
      theme.value = theme.value === "light" ? "dark" : "light";
      localStorage.setItem("theme", theme.value);
    }

    const categories = computed(() => store.state.category.categories);
    onBeforeMount(() => {
      store.dispatch("category/fetchAllWithChildrenCategory");
    });

    const icons = [
      "mdi-facebook",
      "mdi-twitter",
      "mdi-linkedin",
      "mdi-instagram",
    ];

    return {
      onClick,
      theme,
      categories,
      image,
      slug,
      icons,
    };
  },
});
</script>

<template>
  <v-app id="inspire" :theme="theme">
    <v-app-bar class="px-5">
      <v-avatar color="grey-darken-1" size="32">
        <img :src="image" alt="avt" class="img-avt" />
      </v-avatar>
      <v-toolbar-title>
        <router-link to="/" class="text-decoration-none text-black"
          >Mykitches Ashley</router-link
        >
      </v-toolbar-title>

      <div style="display: flex">
        <v-menu
          open-on-hover
          v-for="category in categories"
          :key="category._id"
          link
        >
          <template v-slot:activator="{ props }">
            <router-link
              v-bind="props"
              :to="`/category/${category.slug}`"
              class="text-decoration-none d-flex"
            >
              <v-btn
                :class="
                  slug === category.slug ? 'v-list-item--active' : 'text-black'
                "
              >
                <v-icon
                  v-if="category?.childrens && category?.childrens.length > 0"
                  icon="mdi-menu-down"
                  class="mr-2 py-2"
                ></v-icon>
                <v-list-item-title class="text-capitalize">
                  {{ category.name }}
                </v-list-item-title>
              </v-btn>
            </router-link>
          </template>

          <v-list
            v-if="category?.childrens && category?.childrens.length > 0"
            class="listCate"
          >
            <v-list-item v-for="sub in category.childrens" :key="sub._id" link>
              <router-link
                :to="`/category/${sub.slug}`"
                class="text-decoration-none d-flex text-black"
              >
                <v-list-item-title> {{ sub.name }} </v-list-item-title>
              </router-link>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-btn
        :prepend-icon="
          theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
        "
        @click="onClick"
      >
      </v-btn>
      <div>
        <v-btn
          to="/about-me"
          color="red-lighten-2"
          class="mr-2"
          variant="outlined"
        >
          ABOUT ME
        </v-btn>
        <v-btn to="/manager/dashboard" class="text-success" variant="outlined">
          Đăng bài
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <router-view />
        </v-row>
      </v-container>
    </v-main>

    <v-footer style="background: #1c2124; z-index: 2">
      <div class="text-white mx-auto" width="800">
        <v-row>
          <v-col
            cols="6"
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            "
          >
            <v-avatar color="grey-darken-1" size="150">
              <img :src="image" alt="avt" class="img-avt" />
            </v-avatar>
            <div>
              <v-btn
                v-for="icon in icons"
                :key="icon"
                class="mx-4"
                :icon="icon"
                variant="text"
              ></v-btn>
            </div>
          </v-col>
          <v-col
            cols="6"
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            "
          >
            <p class="my-2">
              <v-icon icon="mdi-map-marker"></v-icon>
              <span class="address-name">Address: Dai Hoc Can Tho</span>
            </p>
            <div>
              <p class="my-4">
                <v-icon class="mr-2" icon="mdi-cellphone-basic"></v-icon>
                <router-link class="text-white" to="tel:+20-800-33-000"
                  >+20-800-33-000</router-link
                ><br />
              </p>
              <p class="my-4">
                <v-icon class="mr-2" icon="mdi-email-outline"></v-icon>
                <router-link class="text-white" s to="mailto:Ashley@gmail.com"
                  >Ashley@gmail.com</router-link
                >
              </p>
            </div>
          </v-col>

          <v-col cols="12" class="text-white text-center">
            {{ new Date().getFullYear() }} — <strong>Design by Cẩm Thi</strong>
          </v-col>
        </v-row>
      </div>
    </v-footer>
  </v-app>
</template>
