<script>
import { defineComponent, ref, watch } from "vue";
import authApi from "../apis/authApi";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const loading = ref(false);

    const dialog = ref(false);
    const emailForgotPass = ref("");
    const messageAlert = ref("");
    let errors = {};

    const emailRules = [(v) => /.+@.+\..+/.test(v) || "E-mail không hợp lệ"];

    const store = useStore();
    const router = useRouter();

    const handleSubmit = async () => {
      return new Promise(async (resolve, reject) => {
        // console.log({ email: email.value, password: password.value });

        const data = {
          email: email.value,
          password: password.value,
        };

        try {
          const response = await authApi.signIn(data);
          // console.log("check response login:::", response);

          if (response.elements) {
            //Thông báo khi đăng nhập thành công
            const payload = {
              text: "Đăng nhập thành công!",
              color: "success",
              open: true,
            };
            store.dispatch("toast/startToast", payload);
            //Lưu accessToken vào store
            store.dispatch(
              "auth/saveAccessToken",
              response.elements.accessToken
            );

            //Chuyển hướng tới trang dashboard
            router.push("/manager/dashboard");
          }
        } catch (error) {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.errors
          )
            errorMessage.value = error.response.data.errors.message;
          reject(error);
        }
      });
    };

    //Thực hiện chức năng quên mật khẩu
    const onOpenForgotPass = (value) => {
      dialog.value = true;
    };

    watch(emailForgotPass, (email) => {
      if (!/.+@.+\..+/.test(email)) {
        errors["email"] = true;
      } else {
        errors = {};
      }
    });

    const submitFormForgotPass = async () => {
      try {
        if (Object.keys(errors).length === 0) {
          loading.value = true;
          const response = await authApi.forgetPassword({
            email: emailForgotPass.value,
          });

          if (response) {
            loading.value = false;
            messageAlert.value = "Hãy kiểm tra email để có thể đổi mật khẩu!";
          }
          setTimeout(() => {
            dialog.value = false;
          }, 5000);
        }
      } catch (error) {
        loading.value = false;

        if (error.response) {
          const payload = {
            text: error.response.data.errors.message,
            color: "error",
            timeout: 2500,
            open: true,
          };
          store.dispatch("toast/startToast", payload);
        }
      }
    };

    return {
      submitFormForgotPass,
      onOpenForgotPass,
      handleSubmit,
      email,
      emailForgotPass,
      password,
      errorMessage,
      loading,
      emailRules,
      dialog,
      messageAlert,
    };
  },
});
</script>

<template>
  <v-form @submit.prevent="handleSubmit">
    <h1 class="mb-5">Đăng nhập hệ thống</h1>

    <v-alert class="mb-5" type="error" v-if="errorMessage">{{
      errorMessage
    }}</v-alert>

    <v-text-field v-model="email" label="E-mail" :rules="emailRules" />
    <v-text-field v-model="password" type="password" label="Mật khẩu" />

    <p
      class="text-error cursor-point d-inline-block ml-3"
      @click="onOpenForgotPass"
    >
      Quên mật khẩu
    </p>

    <v-btn
      type="submit"
      :disabled="!email || !password"
      color="success"
      class="mt-5 d-block"
    >
      Đăng nhập
    </v-btn>

    <!-- model forgot password -->
    <v-dialog v-model="dialog" persistent width="1024">
      <v-form class="form-forgot-pass" @submit.prevent="submitFormForgotPass">
        <h1 class="mb-5 text-center">Quên mật khẩu</h1>

        <v-alert v-if="messageAlert" type="success" class="mb-3">{{
          messageAlert
        }}</v-alert>

        <v-text-field
          v-model="emailForgotPass"
          label="E-mail"
          :rules="emailRules"
        />

        <div class="text-center">
          <v-btn
            class="mt-5"
            color="error"
            variant="text"
            @click="dialog = false"
          >
            Huỷ
          </v-btn>
          <v-btn
            type="submit"
            class="mt-5"
            :loading="loading"
            :disabled="!emailForgotPass || loading"
            color="success"
          >
            Gửi
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
        </div>
      </v-form>
    </v-dialog>
  </v-form>
</template>

<style crops>
.form-forgot-pass {
  padding: 40px;
  background: #f5f5f5;
}
</style>
