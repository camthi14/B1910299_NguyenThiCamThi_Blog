<script>
import { defineComponent, reactive, ref, watch } from "vue";
import authApi from "../apis/authApi";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import OverlayCustom from "../components/OverlayCustom.vue";

export default defineComponent({
  components: {
    OverlayCustom,
  },
  setup() {
    const email = ref("");
    const fullName = ref("");
    const password = ref("");
    const countMaxPass = 32;
    const loading = ref(false);

    const messageAlert = reactive({
      text: "",
      type: "",
    });
    let errors = {};

    const emailRules = [
      (v) => !!v || "Email là trường bắt buộc",
      (v) => /.+@.+\..+/.test(v) || "E-mail không hợp lệ",
    ];
    const passRules = [
      (v) => !!v || "Password là trường bắt buộc",
      (v) =>
        (v && v.length <= countMaxPass) ||
        `Mật khẩu không vươt quá ${countMaxPass} kí tự`,
      (v) => (v && v.length >= 4) || `Mật ít nhất ${4} kí tự`,
    ];

    const store = useStore();
    const router = useRouter();

    watch([email, fullName, password], ([email, fullName, password]) => {
      messageAlert.text = "";
      messageAlert.type = "";
      if (!/.+@.+\..+/.test(email)) {
        errors["email"] = true;
      } else {
        errors = {};
      }

      !fullName ? (errors["fullName"] = true) : (errors = {});

      if (!password || password.length > countMaxPass) {
        errors["password"] = true;
      } else {
        errors = {};
      }
    });

    const handleSubmit = async () => {
      try {
        if (Object.keys(errors).length === 0) {
          loading.value = true;
          const data = {
            email: email.value,
            full_name: fullName.value,
            password: password.value,
          };
          const response = await authApi.signUp(data);
          if (response) {
            loading.value = false;
            const payload = {
              text: "Đăng ký thành công! Vui lòng xác nhận email.",
              color: "success",
              timeout: 3500,
              open: true,
            };
            messageAlert.text = "Đăng ký thành công! Vui lòng xác nhận email.";
            messageAlert.type = "success";
            store.dispatch("toast/startToast", payload);
          }
        }
      } catch (error) {
        loading.value = false;

        if (error.response) {
          const payload = {
            text: error.response.data.errors.message,
            color: "error",
            timeout: 3500,
            open: true,
          };
          messageAlert.text = error.response.data.errors.message;
          messageAlert.type = "error";
          store.dispatch("toast/startToast", payload);
        }
      }
    };
    return {
      handleSubmit,
      email,
      fullName,
      password,
      loading,
      emailRules,
      passRules,
      countMaxPass,
      loading,
      errors,
      messageAlert,
    };
  },
});
</script>

<template>
  <v-card style="width: 600px" class="cardRes mx-auto">
    <v-form @submit.prevent="handleSubmit" style="width: 80%">
      <div class="text-center mt-5">
        <v-icon
          icon="mdi-pencil-box-outline text-h3"
          class="font-weight-thin"
        ></v-icon>
        <h1 class="font-weight-light">Đăng ký tài khoản</h1>
        <p class="font-weight-thin text-h7 my-2">Great to have back!</p>
      </div>

      <v-alert
        class="mb-5"
        :type="messageAlert.type"
        v-if="messageAlert.text"
        >{{ messageAlert.text }}</v-alert
      >

      <v-text-field v-model="fullName" label="Họ và Tên" class="text-center" />
      <v-text-field v-model="email" label="E-mail" :rules="emailRules" />
      <v-text-field
        v-model="password"
        :counter="countMaxPass"
        :rules="passRules"
        type="password"
        label="Mật khẩu"
      />

      <div class="center mb-5">
        <v-btn
          type="submit"
          :disabled="!email || !password || !fullName || loading"
          :loading="loading"
          color="grey-darken-4"
          class="mt-3 d-block"
        >
          Đăng ký
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
      </div>
      <OverlayCustom :open="loading" />
    </v-form>
  </v-card>
</template>

<style scoped>
.cardRes {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 25px 45px rgb(1 2 2 / 12%);
}
</style>
