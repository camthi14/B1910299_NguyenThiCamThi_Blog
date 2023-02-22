<script>
import { computed, defineComponent } from "@vue/runtime-core";
import moment from "moment";
import "moment/locale/vi";

export default defineComponent({
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup({ post }) {
    const timeStamp = computed(() => moment(post.createdAt).fromNow());
    return { timeStamp };
  },
});
</script>

<template>
  <v-card>
    <div class="text-center">
      <v-btn
        v-if="post.category.parent"
        variant="text"
        :to="`/category/${post.category.parent.slug}`"
      >
        {{ post.category.parent.name }}
      </v-btn>
      <span v-if="post.category.parent">/</span>

      <v-btn variant="text" disabled="true">
        {{ post.category.name }}
      </v-btn>

      <v-card-title class="text-h4">{{ post.title }}</v-card-title>
      <v-card-subtitle class="font-weight-bold text-h6">
        {{ post.author }} -
        <span>{{ timeStamp }}</span>
      </v-card-subtitle>
    </div>

    <div class="my-3">
      <v-card-text>{{ post.detail_text }}</v-card-text>
      <v-card-text v-html="post.detail_html"></v-card-text>
    </div>
  </v-card>
</template>
