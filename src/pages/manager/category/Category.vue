<script setup>
import MenuList from "../../../components/manager/MenuList.vue";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import categoryApi from "../../../apis/categoryApi";

const store = useStore();
const categories = computed(() => store.state.category.categories);
const isLoading = computed(() => store.state.category.isLoading);
const selected = ref();

onMounted(() => {
  store.dispatch("category/fetchAllCategory");
});

const page = 1;
const dialog = ref(false);

const handleOpenDelete = (category) => {
  selected.value = category;
  dialog.value = true;
};

const handleDelete = async (category) => {
  try {
    dialog.value = false;
    const response = await categoryApi.delete({ id: category._id });
    if (response) {
      store.dispatch("category/fetchAllCategory");
    }
  } catch (error) {
    console.log("HandleDelete error:::", error);
  }
};

const items = [
  { title: "Thêm danh mục con", icon: "mdi-clock" },
  { title: "Hiển thị danh mục con", icon: "mdi-account" },
  { title: "Sửa danh mục", icon: "mdi-flag" },
  { title: "Xoá danh mục", icon: "mdi-flag" },
];
</script>

<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between my-4">
        <h1>Danh mục</h1>

        <router-link to="/manager/category/add" class="text-decoration-none">
          <v-btn>Thêm danh mục</v-btn>
        </router-link>
      </div>

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
              <v-btn>Thêm danh mục con</v-btn>
              <v-btn color="blue">Hiện danh mục con</v-btn>
              <router-link
                :to="`/manager/category/update/${item._id}`"
                class="text-decoration-none"
              >
                <v-btn color="primary">Sửa danh mục </v-btn>
              </router-link>
              <v-btn color="error" @click="handleOpenDelete(item)"
                >Xoá danh mục
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>

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
        <v-pagination v-model="page" :length="6"></v-pagination>
      </div>
    </v-col>
  </v-row>
</template>
