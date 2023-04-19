<script>
import MenuList from "../../../components/manager/MenuList.vue";
import { useStore } from "vuex";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import categoryApi from "../../../apis/categoryApi";
import Toast from "../../../components/Toast.vue";

export default defineComponent({
  components: {
    MenuList,
  },

  setup() {
    const store = useStore();
    const categories = computed(() => store.state.category.categories);
    const isLoading = computed(() => store.state.category.isLoading);
    const filters = computed(() => store.state.category.filters);
    const pagination = computed(() => store.state.category.pagination);
    const selected = ref();
    const dialog = ref(false);
    const back = ref(false);

    onMounted(() => {
      store.dispatch("category/fetchAllCategory", filters.value);
    });

    watch(
      () => store.state.category.filters,
      (filters) => {
        store.dispatch("category/fetchAllCategory", filters);
      }
    );

    const handleOpenDelete = (category) => {
      selected.value = category;
      dialog.value = true;
    };

    const handleDelete = async (category) => {
      try {
        dialog.value = false;
        const response = await categoryApi.delete({ id: category._id });

        if (response) {
          const payload = {
            text: "Xoá danh mục thành công!",
            color: "success",
            open: true,
          };
          store.dispatch("toast/startToast", payload);
          store.dispatch("category/fetchAllCategory", {
            ...filters.value,
            page: 1,
          });
        }
      } catch (error) {
        console.log("HandleDelete error:::", error);
      }
    };

    const changePage = (newPage) => {
      store.dispatch("category/changeFilter", {
        ...filters.value,
        page: newPage,
      });
    };

    const handleShowChildren = (category) => {
      back.value = true;
      store.dispatch("category/changeFilter", {
        ...filters.value,
        page: 1,
        where: "parent_id," + category._id,
        isCategory: true,
      });
    };

    const handleBack = () => {
      back.value = false;
      store.dispatch("category/changeFilter", {
        ...filters.value,
        page: 1,
        where: "level,1",
      });
    };

    return {
      handleBack,
      handleOpenDelete,
      handleDelete,
      handleShowChildren,
      changePage,
      categories,
      isLoading,
      filters,
      pagination,
      selected,
      dialog,
      back,
    };
  },
});
</script>

<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between my-4">
        <h1>Quản lý danh mục</h1>

        <router-link to="/manager/category/add" class="text-decoration-none">
          <v-btn>Thêm danh mục</v-btn>
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
              <th class="text-left">Slug</th>
              <th class="text-left">Level</th>
              <th class="text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in categories" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.slug }}</td>
              <td>{{ item.level }}</td>
              <td>
                <MenuList
                  :selected="item"
                  :onOpenDelete="handleOpenDelete"
                  :onShowChildren="handleShowChildren"
                />
              </td>
            </tr>
          </tbody>
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
        <v-pagination
          v-model="pagination.page"
          :length="pagination.totalRows"
          @update:modelValue="changePage"
        ></v-pagination>
      </div>
    </v-col>
  </v-row>
</template>
