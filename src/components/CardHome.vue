<script>
import { computed, defineComponent, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import CardHomeItem from "../components/CardHomeItem.vue";

export default defineComponent({
  components: {
    CardHomeItem,
  },
  setup() {
    const store = useStore();

    const posts = computed(() => store.state.post.posts);

    onMounted(() => {
      store.dispatch("post/fetchAllPost", { page: 1, limit: 10 });
    });
    return {
      posts,
    };
  },
});
</script>
<template>
  <div>
    <CardHomeItem v-for="post in posts" :key="post._id" :item="post" />
  </div>
</template>
