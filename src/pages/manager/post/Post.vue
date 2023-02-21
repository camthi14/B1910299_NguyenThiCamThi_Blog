<script>
import {
  computed,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
} from "@vue/runtime-core";
import { useStore } from "vuex";
import { emptyObject } from "../../../utils/function";

export default defineComponent({
  setup() {
    const store = useStore();
    const posts = computed(() => store.getters["post/getPost"]);
    const filters = computed(() => store.state.post.filters);
    const pagination = computed(() => store.state.post.pagination);
    const isLoading = computed(() => store.state.post.isLoading);
    const URL = computed(() => process.env.VUE_APP_ENDPOINT_URL);
    const selected = ref();
    const dialog = ref(false);

    const user = computed(
      () => !emptyObject(store.state.auth.user) && store.state.auth.user
    );

    const fetchAllPost = (filters) => {
      if (user.value && user.value?.role.toLowerCase() !== "admin")
        filters = {
          ...filters,
          where: "user_id," + user.value._id,
        };
      store.dispatch("post/fetchAllPost", filters);
    };

    onBeforeUnmount(() => {
      console.log("OnBeforeUnmount post admin");
      store.dispatch("post/reset");
    });

    onBeforeMount(() => {
      fetchAllPost({
        ...filters.value,
        page: 1,
        limit: 5,
      });
    });

    const onOpenDialogDelete = (post) => {
      selected.value = post;
      dialog.value = true;
    };

    const handleDelete = (post) => {
      dialog.value = false;
      fetchAllPost({ id: post._id, isDelete: false });
    };

    const onChangePage = (value) => {
      fetchAllPost({
        ...filters.value,
        page: value,
      });
    };

    return {
      onOpenDialogDelete,
      handleDelete,
      onChangePage,
      posts,
      pagination,
      isLoading,
      URL,
      dialog,
      selected,
      user,
    };
  },
});
</script>
<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between my-4">
        <h1>Quản lý bài viết</h1>

        <router-link to="/manager/post/add" class="text-decoration-none">
          <v-btn>Thêm bài viết</v-btn>
        </router-link>
      </div>

      <v-btn v-if="back" @click="handleBack" class="mb-5">Quay trở lại</v-btn>

      <div class="position-relative">
        <v-progress-linear
          v-if="isLoading"
          color="green"
          indeterminate
          rounded
          height="3"
          class="position-absolute"
          style="top: -5px"
        />

        <v-table fixed-header>
          <thead>
            <tr>
              <th class="text-left">Tiêu đề</th>
              <th class="text-left">Nội dung</th>
              <th class="text-left">Tác giả</th>
              <th class="text-left">Danh mục</th>
              <th class="text-left">Thời gian tạo</th>
              <th class="text-left">Hành động</th>
            </tr>
          </thead>
          <tbody v-if="posts.length">
            <tr v-for="post in posts" :key="post._id">
              <td class="py-3 px-2">
                <v-row no-gutters>
                  <v-col cols="3">
                    <v-sheet
                      class="rounded mx-0"
                      max-width="100"
                      elevation="12"
                      height="100%"
                      width="100%"
                    >
                      <v-img :src="`${URL}/${post.image_title}`" />
                    </v-sheet>
                  </v-col>
                  <v-col cols="9">
                    <p class="text-truncate pl-3">
                      {{ post.title }}
                    </p>
                  </v-col>
                </v-row>
              </td>
              <td class="py-3 px-2">
                <p class="text-truncate">
                  {{ post.detail_html }}
                </p>
              </td>
              <td class="py-3 px-2">
                <p class="text-truncate">
                  {{ post.user_id?.email }}
                </p>
              </td>
              <td class="py-3 px-2">
                <p class="text-truncate">
                  {{ post.category_id?.name }}
                </p>
              </td>
              <td class="py-3 px-2">
                <p class="text-truncate">
                  {{ post.createdAt }}
                </p>
              </td>
              <td class="py-3 px-2">
                <div class="d-flex">
                  <router-link
                    :to="`/manager/post/update/${post._id}`"
                    class="text-decoration-none text-primary mx-4"
                  >
                    <v-icon icon="mdi-pencil-box-outline" class="text-h4">
                    </v-icon>
                  </router-link>
                  <div
                    class="text-error cursor-point mx-4"
                    @click="onOpenDialogDelete(post)"
                  >
                    <v-icon icon="mdi-delete" class="text-h4"> </v-icon>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>

          <p v-else>Bạn chưa đăng bài viết nào.</p>
        </v-table>
      </div>

      <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="50%">
          <v-card>
            <v-card-title class="text-h5">Xác nhận trước khi xoá</v-card-title>
            <v-card-text
              >Bạn có muốn xoá bài viết <strong>"{{ selected.title }}"</strong>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" variant="text" @click="dialog = false">
                Huỷ
              </v-btn>
              <v-btn
                color="green-darken-1"
                variant="text"
                @click="handleDelete(selected)"
              >
                Xoá
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <div class="text-center mt-5">
        <v-pagination
          v-model="pagination.page"
          :length="pagination.totalRows"
          @update:modelValue="onChangePage"
        ></v-pagination>
      </div>
    </v-col>
  </v-row>
</template>

<style>
.v-table > .v-table__wrapper > table {
  table-layout: fixed;
}
</style>
