<script>
import { computed, defineComponent } from "@vue/runtime-core";
import moment from "moment";

export default defineComponent({
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup({ post }) {
    const timeStamp = computed(() => moment(post.createAt).fromNow());
    return { timeStamp };
  },
});
</script>

<template>
  <v-container>
    <div>
      <div>
        <v-btn variant="text" :to="`/category/${post.category.parent.slug}`">
          {{ post.category.parent.name }}
        </v-btn>
        <span>/</span>

        <v-btn variant="text" disabled="true">
          {{ post.category.name }}
        </v-btn>
      </div>

      <div class="my-3">
        <v-card-title class="text-h4">{{ post.title }}</v-card-title>
        <v-card-subtitle class="font-weight-bold text-h6">
          {{ post.author }}
          <span>{{ timeStamp }}</span>
        </v-card-subtitle>

        <v-card-text>{{ post.detail_text }}</v-card-text>
        <v-card-text v-html="post.detail_html"></v-card-text>
      </div>
    </div>
  </v-container>
</template>
