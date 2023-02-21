<script>
import {
  computed,
  defineComponent,
  onBeforeMount,
  watch,
} from "@vue/runtime-core";
import { useStore } from "vuex";
import CardHomeItem from "../components/CardHomeItem.vue";

export default defineComponent({
  components: {
    CardHomeItem,
  },
  setup() {
    const store = useStore();

    const posts = computed(() => store.state.post.posts);
    const filters = computed(() => store.state.post.filters);
    const pagination = computed(() => store.state.post.pagination);

    const fetchAllPost = ({ filters, page, totalRows }) => {
      if (page >= totalRows) return;
      store.dispatch("post/fetchAllPost", filters);
    };

    watch(filters, (filters) => {
      console.log(filters);
    });

    onBeforeMount(() => {
      fetchAllPost({
        filters: { ...filters.value, where: "", limit: 2, isHome: true },
        page: filters.value.page,
        totalRows: pagination.value.totalRows,
      });
    });

    const visibilityChanged = (isVisibilityChanged) => {
      if (!isVisibilityChanged) return;
      let oldPage = filters.value.page;

      if (oldPage >= pagination.value.totalRows) return;

      store.dispatch("post/changeFilter", {
        page: ++oldPage,
      });

      store.dispatch("post/fetchAllPost", {
        ...filters.value,
        isHome: true,
      });
    };
    return {
      visibilityChanged,
      posts,
    };
  },
});
</script>
<template>
  <v-card>
    <v-card-title>Danh sách bài viết</v-card-title>
    <v-container>
      <v-row dense>
        <CardHomeItem
          class="mb-3"
          v-for="post in posts"
          :key="post._id"
          :item="post"
        />
        <div v-if="posts.length" v-observe-visibility="visibilityChanged"></div>
      </v-row>
    </v-container>
  </v-card>
</template>
