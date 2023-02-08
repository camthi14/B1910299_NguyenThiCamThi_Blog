<script>
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import categoryApi from "../../../apis/categoryApi";
import FormCategoryAddEdit from "../../../components/manager/category/FormCategoryAddEdit.vue";

export default defineComponent({
  components: {
    FormCategoryAddEdit,
  },

  setup() {
    const route = useRoute();
    const params = route.params;
    const categorySelected = ref();
    const parentSelected = ref();

    const isModeUpdate = computed(() => (params?.categoryId ? true : false));
    const isModeAddChildren = computed(() => (params?.parentId ? true : false));

    const getCategoryById = async (id) => {
      try {
        const response = await categoryApi.getById(id);

        if (response && response.elements) {
          return response.elements;
        }
      } catch (error) {
        console.log("Error getCategoryById:::", error);
      }
    };

    onMounted(async () => {
      if (params?.categoryId) {
        categorySelected.value = await getCategoryById(params.categoryId);
      }

      if (params?.parentId) {
        parentSelected.value = await getCategoryById(params.parentId);
      }
    });
    return {
      getCategoryById,
      isModeUpdate,
      isModeAddChildren,
      params,
      categorySelected,
      parentSelected,
    };
  },
});
</script>

<template>
  <v-row>
    <v-col>
      <h1 class="text-center my-4">
        {{ isModeUpdate ? "Cập nhật" : "Thêm" }} danh mục
        {{ isModeAddChildren ? "con" : "" }}
      </h1>
      <div>
        <FormCategoryAddEdit
          v-if="isModeUpdate"
          :selected="categorySelected ? categorySelected : {}"
        />
        <FormCategoryAddEdit
          v-else-if="parentSelected"
          :parent="parentSelected"
        />
        <FormCategoryAddEdit v-else />
      </div>
    </v-col>
  </v-row>
</template>
