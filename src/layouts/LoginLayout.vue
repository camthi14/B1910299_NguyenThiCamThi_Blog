<script setup>
import { ref } from "vue";
const theme = ref("light");
function onClick() {
  theme.value = theme.value === "light" ? "dark" : "light";
}
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
      <router-link to="/login" class="text-decoration-none text-success">
        <v-btn variant="outlined">Đăng nhập</v-btn>
      </router-link>
    </v-app-bar>

    <v-main>
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
