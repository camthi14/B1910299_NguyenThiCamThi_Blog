<script>
import {
  computed,
  defineComponent,
  onBeforeMount,
  ref,
} from "@vue/runtime-core";
import { useStore } from "vuex";
import CardHomeItem from "../components/CardHomeItem.vue";

export default defineComponent({
  components: { CardHomeItem },
  setup() {
    const store = useStore();
    let onboarding = ref(0);

    const posts = computed(() => store.state.post.posts);

    onBeforeMount(() => {
      store.dispatch("post/fetchAllPostSlide");
    });
    return {
      onboarding,
      posts,
    };
  },
});
</script>
<template>
  <v-window v-model="onboarding" show-arrows>
    <v-window-item
      continuous
      v-for="post in posts"
      reverse
      mandatory="force"
      touch
      :key="post._id"
      height="200"
    >
      <v-img
        class="align-end text-white"
        height="200"
        src="https://defaultcustomheadersdata.files.wordpress.com/2016/07/food.jpg?resize=1440,221"
        cover
        style="border-radius: 5px"
      >
        <v-card
          class="mx-auto"
          variant="outlined"
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
          height="200"
        >
          <v-card-item class="text-center">
            <div class="text-overline mb-1 text-h1 font-weight-bold">
              {{ post.title }}
            </div>
            <div class="text-caption" style="padding: 0 50px">
              {{ post.detail_text }}
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn variant="outlined">Khám phá </v-btn>
          </v-card-actions>
        </v-card>
      </v-img>
    </v-window-item>
  </v-window>
</template>
