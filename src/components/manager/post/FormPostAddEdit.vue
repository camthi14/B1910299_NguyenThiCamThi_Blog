<script>
import {
  computed,
  defineComponent,
  onBeforeMount,
  ref,
  watch,
} from "@vue/runtime-core";
import slugify from "slugify";
import { useStore } from "vuex";
import CKeditorCustom from "./CKeditorCustom.vue";

export default defineComponent({
  components: {
    CKeditorCustom,
  },
  props: {
    isModeAdd: {
      type: Boolean,
    },
  },
  setup(props) {
    const store = useStore();
    const title = ref("");
    const slug = ref("");
    const max = 200;
    const errorMessage = ref("");
    const ruleTitle = [
      (v) => !!v || "Tên tiêu đề là trường bắt buộc",
      (v) =>
        (v && v.length <= max) || `Tên tiêu đề không vượt quá ${max} kí tự`,
    ];
    let errors = {};
    const categoryId = ref("");
    const editorData = ref("");

    const user = computed(() => store.state.auth.user);
    const categories = computed(() => [
      { _id: "", name: "Vui lòng chọn danh mục" },
      ...store.state.category.categories,
    ]);

    onBeforeMount(() => {
      store.dispatch("category/fetchAllCategory", { page: 1, limit: 100 });
    });

    watch(
      [categoryId, title, editorData],
      ([categoryId, titleNew, editorData]) => {
        !categoryId ? (errors["categoryId"] = true) : (errors = { ...errors });

        slug.value = slugify(titleNew, { locale: "vi" });
        titleNew.length >= max
          ? (errors["title"] = true)
          : (errors = { ...errors });

        !editorData ? (errors["editorData"] = true) : (errors = { ...errors });
      }
    );

    const handleSubmit = () => {
      if (Object.keys(errors).length === 0) {
        const data = {
          title: title.value,
          slug: slug.value,
          detail_html: editorData.value,
          categoryId: categoryId.value,
          userId: user.value._id,
        };

        //* call api save bai viet
        console.log(data);
      }
    };

    const onChangeEditor = (value) => {
      editorData.value = value;
    };

    return {
      handleSubmit,
      onChangeEditor,
      title,
      slug,
      max,
      errorMessage,
      ruleTitle,
      errors,
      categoryId,
      user,
      categories,
      editorData,
    };
  },
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <v-alert class="mb-5" type="error" v-if="errorMessage">
      {{ errorMessage }}
    </v-alert>

    <v-text-field
      type="text"
      label="Tên bài viết"
      v-model="title"
      :counter="max"
      :rules="ruleTitle"
    />

    <v-text-field v-model="slug" type="text" label="Slug bài viết" disabled />
    <v-select
      v-model="categoryId"
      label="Danh mục"
      :items="categories"
      item-title="name"
      item-value="_id"
    ></v-select>

    <CKeditorCustom
      :editorData="editorData"
      @update:modelValue="onChangeEditor"
    />

    <v-btn
      type="submit"
      :disabled="!title || !categoryId || !editorData"
      color="success"
      class="mt-5 d-block"
    >
      {{ isModeAdd ? "Tạo bài viết" : "Lưu bài viết" }}
    </v-btn>
  </form>
</template>
