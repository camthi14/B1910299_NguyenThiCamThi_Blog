<script>
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import authApi from "../apis/authApi";
import { emptyObject } from "../utils/function";
import image from "../../public/img/Ashley can cook.png";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const theme = ref(localStorage.getItem("theme") || "light");

    function onClick() {
      theme.value = theme.value === "light" ? "dark" : "light";
      localStorage.setItem("theme", theme.value);
    }

    const user = computed(() =>
      emptyObject(store.state.auth.user) ? null : store.state.auth.user
    );

    const role = computed(
      () => !emptyObject(store.state.auth.user) && store.state.auth.user.role
    );

    const linkPrivate = [
      ["mdi-account-box-outline", "Thông tin của bạn", "/manager/dashboard"],
      ["mdi-palette-advanced", "Quản lý danh mục", "/manager/category"],
      ["mdi-clipboard-text", "Quản lý bài viết", "/manager/post"],
    ];
    const linkPublic = [
      ["mdi-clipboard-text", "Quản lý bài viết", "/manager/post"],
    ];

    const links = computed(() =>
      role.value && role.value.toLowerCase() !== "admin"
        ? linkPublic
        : linkPrivate
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

    return {
      onClick,
      handleLogout,
      theme,
      user,
      links,
      image,
    };
  },
});
</script>

<template>
  <v-app id="inspire" :theme="theme">
    <v-navigation-drawer>
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        "
        class="ma-2"
      >
        <router-link to="/">
          <v-avatar size="64">
            <img :src="image" alt="avt" class="img-avt" />
          </v-avatar>
        </router-link>
        <v-toolbar-title>Hello, {{ user && user.full_name }}</v-toolbar-title>
      </div>
      <v-list class="mt-5">
        <v-list-item
          v-for="[icon, text, to] in links"
          :key="icon"
          link
          :to="to"
        >
          <template v-slot:prepend>
            <v-icon class="mr-3">{{ icon }}</v-icon>
          </template>
          <v-list-item-title> {{ text }} </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-app-bar>
            <v-row>
              <v-col>
                <v-btn to="/" class="text-success font-weight-light"
                  >Home</v-btn
                >
              </v-col>
              <v-col
                style="display: flex; justify-content: end; margin-right: 18px"
              >
                <v-btn
                  :prepend-icon="
                    theme === 'light'
                      ? 'mdi-weather-sunny'
                      : 'mdi-weather-night'
                  "
                  @click="onClick"
                >
                </v-btn>

                <v-btn variant="outlined" @click="handleLogout"
                  >Đăng xuất</v-btn
                >
              </v-col>
            </v-row>
          </v-app-bar>
          <v-main>
            <router-view />
          </v-main>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
