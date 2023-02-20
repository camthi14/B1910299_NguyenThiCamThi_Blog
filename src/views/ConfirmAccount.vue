<script>
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import authApi from "../apis/authApi";
import OverlayCustom from "../components/OverlayCustom.vue";

export default defineComponent({
  components: {
    OverlayCustom,
  },
  setup() {
    const route = useRoute();
    const loading = ref(false);
    const { email } = route.params;
    const { token } = route.query;
    console.log(route.query);
    const message = ref("");
    const open = ref(false);

    const verifyAccount = async ({ email, token }) => {
      try {
        loading.value = true;
        await authApi.verifyAccount({ email, token });
        loading.value = false;
      } catch (error) {
        loading.value = false;
        if (error.response) {
          message.value = error.response.data.errors.message;
        }
      }
    };

    const handleResendEmail = async () => {
      try {
        if (email) {
          loading.value = true;
          const response = await authApi.resendEmail({ email });

          if (response) {
            loading.value = false;
            open.value = true;
          }
        }
      } catch (error) {
        loading.value = false;
        console.log("VerifyAccount error:::", error);
        if (error.response) {
          message.value = error.response.data.errors.message;
        }
      }
    };

    onMounted(async () => {
      if (email && token) {
        verifyAccount({ email, token });
      }
    });

    return {
      handleResendEmail,
      verifyAccount,
      loading,
      message,
      open,
    };
  },
});
</script>

<template>
  <v-row justify="center" align="center" style="min-height: 80vh">
    <v-col cols="6" aligh-self="center">
      <v-sheet class="pa-2 ma-2">
        <v-alert
          v-if="open"
          class="mb-5"
          type="success"
          title="Gửi mail"
          text="Gửi lại mail thành công vui lòng kiểm tra và xác nhận!"
        ></v-alert>
        <div v-if="!message">
          <v-alert
            variant="outlined"
            type="success"
            prominent
            border="top"
            title="Xác thực tài khoản thành công!"
          >
          </v-alert>
          <v-btn to="/login" class="mt-5">Đăng nhập</v-btn>
        </div>
        <div v-else>
          <v-alert
            variant="outlined"
            type="warning"
            prominent
            border="top"
            title="Xác thực tài khoản không thành công!"
            :text="message"
          >
          </v-alert>
          <v-btn class="mt-5" @click="handleResendEmail">Gửi lại</v-btn>
        </div>
        <OverlayCustom :open="loading" />
      </v-sheet>
    </v-col>
  </v-row>
</template>
