<script>
import { computed, defineComponent, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const posts = computed(() => store.state.post.posts);
    const filters = computed(() => store.state.post.filters);
    const pagination = computed(() => store.state.post.pagination);
    const isLoading = computed(() => store.state.post.isLoading);
    const URL = computed(() => process.env.VUE_APP_ENDPOINT_URL);

    onMounted(() => {
      store.dispatch("post/fetchAllPost", {
        ...filters.value,
        page: 1,
        limit: 10,
      });
    });

    const onChangePage = (value) => {
      store.dispatch("post/fetchAllPost", {
        ...filters.value,
        page: value,
      });
    };

    return {
      onChangePage,
      posts,
      pagination,
      isLoading,
      URL,
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
          color="green"
          indeterminate
          rounded
          height="3"
          class="position-absolute"
        />

        <v-table>
          <thead>
            <tr>
              <th class="text-left">Tên danh mục</th>
              <th class="text-center">Ảnh tiêu đề</th>
              <th class="text-center">Slug</th>
              <th class="text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post._id">
              <td style="width: 300px">
                <p class="text-truncate" style="max-width: 300px">
                  {{ post.title }}
                </p>
              </td>
              <td>
                <p class="text-truncate">
                  <v-sheet
                    class="rounded p-2"
                    max-width="100"
                    elevation="12"
                    height="100%"
                    width="100%"
                  >
                    <v-img :src="`${URL}/${post.image_title}`" />
                  </v-sheet>
                </p>
              </td>
              <td style="width: 400px">
                <p class="text-truncate" style="max-width: 300px">
                  {{ post.detail_html }}
                </p>
              </td>
              <td>
                <p class="text-truncate">
                  <v-btn>Sửa</v-btn>
                </p>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>

      <!-- <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="50%">
          <v-card>
            <v-card-title class="text-h5">Xác nhận trước khi xoá</v-card-title>
            <v-card-text
              >Bạn có muốn xoá danh mục <strong>"{{ selected.name }}"</strong>
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
      </v-row> -->

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
