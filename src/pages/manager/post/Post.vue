<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  setup() {
    return {};
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
        />

        <v-table>
          <thead>
            <tr>
              <th class="text-left">Tên danh mục</th>
              <th class="text-left">Ảnh tiêu đề</th>
              <th class="text-left">Slug</th>
              <th class="text-left">Hành động</th>
            </tr>
          </thead>
          <tbody></tbody>
        </v-table>
      </div>

      <v-row justify="center">
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
      </v-row>

      <div class="text-center mt-5">
        <!-- <v-pagination
          v-model="pagination.page"
          :length="pagination.totalRows"
          @update:modelValue="changePage"
        ></v-pagination> -->
      </div>
    </v-col>
  </v-row>
</template>
