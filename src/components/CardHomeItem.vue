<script>
import { computed, defineComponent } from "@vue/runtime-core";
import moment from "moment";
import "moment/locale/vi";

export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup({ item }) {
    const timeStamp = computed(() => moment(item.createAt).fromNow());
    const URL_IMG = computed(
      () => process.env.VUE_APP_ENDPOINT_URL + "/" + item.image_title
    );
    return {
      item,
      URL_IMG,
      timeStamp,
    };
  },
});
</script>

<template>
  <v-card class="mx-auto card_post" max-width="600">
    <v-img class="align-end text-white" height="200" :src="URL_IMG" cover>
    </v-img>

    <v-card-title class="text-h6">{{ item.title }}</v-card-title>

    <v-card-subtitle style="padding: 0 16px">
      {{ item.detail_text }}
    </v-card-subtitle>

    <v-card-text color="deep-purple-lighten-2" variant="text">
      <div class="font-weight-bold text-h7">
        Tác giả:
        {{
          item.user_id && !item.user_id.full_name
            ? "Ẩn danh"
            : item.user_id.full_name
        }}
      </div>
      <div class="font-weight-thin">Thời gian đăng: {{ timeStamp }}</div>
    </v-card-text>

    <v-card-actions style="padding: 10px 12px">
      <v-btn color="orange"> {{ item.category_id.name }}</v-btn>

      <v-btn :to="`/post/${item.slug}`" color="orange"> Khám Phá </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style>
.card_post:hover {
  box-shadow: 0 25px 45px rgba(1, 2, 2, 0.1215686275);
}
</style>
