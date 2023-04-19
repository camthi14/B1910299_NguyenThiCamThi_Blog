<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const theme = ref("light");
    const onClick = () => {
      theme.value = theme.value === "light" ? "dark" : "light";
    };
    // const handleLogout = () => {};
    return {
      onClick,
      theme,
    };
  },
});
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar>
      <v-spacer></v-spacer>

      <v-btn
        :prepend-icon="
          theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
        "
        @click="onClick"
      >
      </v-btn>
      <v-btn to="/login" class="text-success mr-2" variant="outlined">
        Đăng nhập
      </v-btn>
      <v-btn to="/register" color="primary" variant="outlined"> Đăng Ký </v-btn>
    </v-app-bar>

    <v-main class="loginLayout">
      <v-container>
        <v-row>
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.loginLayout {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
