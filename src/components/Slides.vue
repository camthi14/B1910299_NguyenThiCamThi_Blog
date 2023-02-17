<script>
import { computed, defineComponent, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import CardHomeItem from "../components/CardHomeItem.vue";

export default defineComponent({
  components: { CardHomeItem },
  setup() {
    const store = useStore();
    let onboarding = ref(0);

    const posts = computed(() => store.state.post.posts);

    onMounted(() => {
      store.dispatch("post/fetchAllPost", { page: 1, limit: 5 });
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
            <div class="text-overline mb-1">{{ post.title }}</div>
            <div class="text-caption">
              {{ post.user_id.email }}
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
