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
  <div>
    <v-card max-width="400">
      <div justify="center" class="text-center mt-1">
        <v-avatar class="" color="grey-darken-1" size="150">
          <img
            src="https://kenh14cdn.com/thumb_w/600/QuickNewsK14/1192745/2014/03/img_201403241515038868.jpg"
            alt=""
            class="img-avt"
          />
        </v-avatar>

        <v-card-item>
          <v-card-title>Về chúng tôi</v-card-title>

          <v-card-subtitle>
            <span class="me-1">Mykitches Ashley</span>

            <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          </v-card-subtitle>
        </v-card-item>
        <div class="d-flex" style="justify-content: center">
          <v-rating
            :model-value="4.5"
            color="amber"
            density="compact"
            half-increments
            readonly
            size="small"
          ></v-rating>

          <div class="text-grey ms-4">4.5 (413)</div>
        </div>

        <div class="text-subtitle-1">$ • Italian, Cafe</div>
        <v-card-text>
          <div>
            <p>
              Hi! Tớ là Ashley. Với tớ, nấu ăn không cần phải theo một công thức
              chuẩn nào cả vì mỗi người sẽ tự tìm cho mình một cách riêng. Đơn
              giản vì nó còn phụ thuộc vào cả cảm xúc và điều kiện của bạn khi
              nấu… Hãy nấu như bạn cảm nhận về món ăn đó nhé!
            </p>
            <p class="mt-2">
              <v-chip class="mr-2">Yêu thích nấu ăn</v-chip>
              <v-chip>Viết blog</v-chip>
            </p>
            <div class="mt-1">
              <v-btn
                class="ma-2"
                style="height: 40px"
                href="https://www.facebook.com/"
                icon="mdi-facebook"
                color="primary"
              ></v-btn>
              <v-btn
                class="ma-2"
                style="height: 40px"
                href="https://www.instagram.com/"
                icon="mdi-instagram"
                color="secondary"
              ></v-btn>
              <v-btn
                class="ma-2"
                style="height: 40px"
                href="https://translate.google.com/"
                icon="mdi-google"
                color="info"
              ></v-btn>
              <v-btn
                class="ma-2"
                style="height: 40px"
                href="https://www.twitter.com/"
                icon="mdi-twitter"
                color="success"
              ></v-btn>
            </div>
          </div>
        </v-card-text>
      </div>

      <v-divider class="mx-4 mb-1"></v-divider>
      <div justify="center" class="text-center">
        <v-btn to="/about-me" color="deep-purple-lighten-2" variant="text">
          Xem thêm
        </v-btn>
      </div>
    </v-card>
    <v-card class="mt-3 pa-2">
      <v-form @submit.prevent="handleSubmit">
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

        <v-text-field
          v-model="fullName"
          label="Họ và Tên"
          class="text-center"
        />
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
  </div>
</template>
