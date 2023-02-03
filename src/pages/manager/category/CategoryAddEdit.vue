<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import categoryApi from "../../../apis/categoryApi";
import FormCategoryAddEdit from "../../../components/manager/category/FormCategoryAddEdit.vue";

const route = useRoute();
const params = route.params;
const categorySelected = ref();

const isModeUpdate = computed(() => (params?.categoryId ? true : false));

const getCategoryById = async (id) => {
  try {
    const response = await categoryApi.getById(id);

    if (response && response.elements) {
      categorySelected.value = response.elements;
    }
  } catch (error) {
    console.log("Error getCategoryById:::", error);
  }
};

onMounted(() => {
  if (params?.categoryId) {
    getCategoryById(params.categoryId);
  }
});
</script>

<template>
  <v-row>
    <v-col>
      <h1 class="text-center my-4">
        {{ isModeUpdate ? "Cập nhật" : "Thêm" }} danh mục
      </h1>
      <div>
        <FormCategoryAddEdit
          :isModeUpdate="isModeUpdate"
          :selected="categorySelected ? categorySelected : {}"
        />
      </div>
    </v-col>
  </v-row>
</template>
