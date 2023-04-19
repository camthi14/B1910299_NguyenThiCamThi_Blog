<script>
import {
  computed,
  defineComponent,
  onBeforeMount,
  watch,
} from "@vue/runtime-core";
import { useStore } from "vuex";
import CardHomeItem from "../components/CardHomeItem.vue";
import OverlayCustom from "../components/OverlayCustom.vue";

export default defineComponent({
  components: {
    CardHomeItem,
    OverlayCustom,
  },
  setup() {
    const store = useStore();
    const posts = computed(() => store.state.post.posts);
    const filters = computed(() => store.state.post.filters);
    const pagination = computed(() => store.state.post.pagination);
    const loading = computed(() => store.state.post.isLoading);

    const fetchAllPost = ({ filters, page, totalRows }) => {
      if (page >= totalRows) return;
      store.dispatch("post/fetchAllPost", filters);
    };

    onBeforeMount(() => {
      fetchAllPost({
        filters: { ...filters.value, where: "", limit: 5, isHome: true },
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
      loading,
    };
  },
});
</script>
<template>
  <v-card>
    <v-card-title>Danh sách bài viết mới</v-card-title>
    <OverlayCustom :open="loading" />
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
