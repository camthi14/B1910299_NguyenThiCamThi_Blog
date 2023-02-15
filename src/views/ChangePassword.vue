<script>
import { computed, defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import authApi from "../apis/authApi";

export default defineComponent({
  setup() {
    const route = useRoute();
    const params = route.params;
    const query = route.query;
    const loading = ref(false);
    const password = ref("");
    const store = useStore();
    const router = useRouter();

    const email = computed(() => params?.email);
    const token = computed(() => query?.token);

    const handleSubmit = async () => {
      if (!password.value) return;

      try {
        const response = await authApi.changePassword({
          data: { password: password.value },
          email: email.value,
          token: token.value,
        });

        console.log(response);

        if (response) {
          const payload = {
            text: "Thay đổi mật khẩu thành công!",
            color: "success",
            timeout: 2500,
            open: true,
          };
          store.dispatch("toast/startToast", payload);

          router.push("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      handleSubmit,
      loading,
      password,
    };
  },
});
</script>

<template>
  <v-form class="form-forgot-pass" @submit.prevent="handleSubmit">
    <h1 class="mb-5 text-center">Thay đổi mật khẩu</h1>

    <v-alert v-if="messageAlert" type="success" class="mb-3">{{
      messageAlert
    }}</v-alert>

    <v-text-field v-model="password" label="Mật khẩu mới" />

    <div class="text-center">
      <v-btn
        type="submit"
        class="mt-5"
        :loading="loading"
        :disabled="!password || loading"
        color="success"
      >
        Lưu
        <template v-slot:loader>
          <span class="custom-loader">
            <v-icon light>mdi-cached</v-icon>
          </span>
        </template>
      </v-btn>
    </div>
  </v-form>
</template>
