<script>
import { computed, defineComponent, onBeforeMount, ref, watch } from "vue";
import slugify from "slugify";
import { useStore } from "vuex";
import CKeditorCustom from "./CKeditorCustom.vue";
import uploadApi from "../../../apis/uploadApi";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    CKeditorCustom,
  },
  props: {
    isModeAdd: {
      type: Boolean,
    },
    postSelected: {
      type: Object,
      default: {},
    },
  },

  setup(props) {
    const store = useStore();
    const router = useRouter();
    const title = ref("");
    const slug = ref("");
    const max = 200;
    const min = 20;
    const errorMessage = ref("");
    const ruleTitle = [
      (v) => !!v || "Tên tiêu đề là trường bắt buộc",
      (v) =>
        (v && v.length <= max) || `Tên tiêu đề không vượt quá ${max} kí tự`,
      (v) => (v && v.length >= min) || `Tên tiêu đề ít nhất ${min} kí tự`,
    ];
    const ruleImage = [
      (value) =>
        !value ||
        !value.length ||
        value[0].size < 2000000 ||
        "Kích thước ảnh nhỏ hơn 2 MB!",
    ];
    let errors = {};
    const categoryId = ref("");
    const categorySubId = ref("");
    const editorData = ref("");

    const image = ref(undefined);
    const imgUrl = ref("");
    const loading = ref(false);

    const user = computed(() => store.state.auth.user);
    const URL = computed(() => process.env.VUE_APP_ENDPOINT_URL);

    watch(
      () => props.postSelected,
      (post) => {
        if (post) {
          title.value = post.title;
          slug.value = slugify(post.title, { locale: "vi" });
          imgUrl.value = `${URL.value}/${post.image_title}`;
          editorData.value = post.detail_html;

          if (post?.category_id.parent_id) {
            categoryId.value = post?.category_id.parent_id;
            store.dispatch("category/fetchAllCategory", {
              page: 1,
              limit: 100,
              where: `parent_id, ${post?.category_id.parent_id}`,
            });
            categorySubId.value = post?.category_id._id;
          } else {
            categoryId.value = post?.category_id._id;
          }
        }
      }
    );

    watch(
      [categoryId, title, editorData],
      ([categoryId, titleNew, editorData]) => {
        !categoryId
          ? (errors["categoryId"] = true)
          : delete errors["categoryId"];

        slug.value = slugify(titleNew, { locale: "vi" });
        titleNew.length >= max || titleNew.length <= min
          ? (errors["title"] = true)
          : delete errors["title"];

        !editorData
          ? (errors["editorData"] = true)
          : delete errors["editorData"];
      }
    );

    const categories = computed(() => [
      { _id: "", name: "Vui lòng chọn danh mục" },
      ...store.state.category.categories,
    ]);
    const categorySub = computed(() => [
      { _id: "", name: "Vui lòng chọn danh mục con" },
      ...store.state.category.categorySub,
    ]);

    const isExistCategorySub = computed(() => categorySub.value.length > 1);

    onBeforeMount(() => {
      store.dispatch("category/fetchAllCategory", {
        page: 1,
        limit: 100,
        where: "level,1",
      });
    });

    const handleSubmit = async () => {
      if (Object.keys(errors).length === 0) {
        loading.value = true;

        let data = {
          title: title.value,
          slug: slug.value,
          detail_html: editorData.value,
          categoryId: categoryId.value,
          userId: user.value._id,
        };

        if (image.value) {
          // * trước khi tạo bài viết phải upload lên server
          const resImg = await uploadApi.image(image.value[0]);
          data = {
            ...data,
            image_title: resImg?.filename,
          };
        }

        if (categorySubId.value) {
          data = {
            ...data,
            categoryId: categorySubId.value,
          };
        }
        if (props.isModeAdd) {
          //* call api save bai viet
          store
            .dispatch("post/fetchCreatePost", data)
            .then((value) => {
              if (value) {
                loading.value = false;
                router.push("/manager/post");
              }
            })
            .catch((_) => (loading.value = false));
        } else {
          //* call api update bai viet
          store
            .dispatch("post/fetchUpdatePost", {
              id: props.postSelected._id,
              data,
            })
            .then((value) => {
              if (value) {
                loading.value = false;
                router.push("/manager/post");
              }
            })
            .catch((_) => (loading.value = false));
        }
      } else {
        store.dispatch("toast/startToast", {
          text: "Vui lòng điền chính xác các thông tin",
          color: "error",
          open: true,
          timeout: 3000,
        });
      }
    };

    const onChangeEditor = (value) => {
      editorData.value = value;
    };

    const onChangeSelect = (value) => {
      if (!value) {
        store.dispatch("category/changeSubCategory", []);
        return;
      }
      categorySubId.value = "";
      store.dispatch("category/fetchAllCategory", {
        page: 1,
        limit: 100,
        where: `parent_id,${value}`,
      });
    };

    const createImage = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        imgUrl.value = e.target.result;
      };
      reader.readAsDataURL(file);
    };

    const onFileChange = (files) => {
      if (!files[0]) {
        imgUrl.value = "";
        return;
      }
      createImage(files[0]);
    };

    return {
      createImage,
      onFileChange,
      onChangeSelect,
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
      isExistCategorySub,
      isModeAdd: props.isModeAdd,
      categorySubId,
      categorySub,
      editorData,
      image,
      imgUrl,
      ruleImage,
      loading,
    };
  },
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <v-row>
      <v-col>
        <v-alert class="mb-5" type="error" v-if="errorMessage">
          {{ errorMessage }}
        </v-alert>
      </v-col>

      <v-col cols="12">
        <v-text-field
          type="text"
          label="Tên bài viết"
          v-model="title"
          :counter="max"
          :rules="ruleTitle"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="slug"
          type="text"
          label="Slug bài viết"
          disabled
        />
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <v-select
          v-model="categoryId"
          label="Danh mục"
          :items="categories"
          item-title="name"
          item-value="_id"
          @update:modelValue="onChangeSelect"
        ></v-select>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <v-select
          v-if="isExistCategorySub"
          v-model="categorySubId"
          label="Danh mục con"
          :items="categorySub"
          item-title="name"
          item-value="_id"
        ></v-select>
      </v-col>
    </v-row>

    <v-col v-if="imgUrl" cols="12" sm="12" justify="center">
      <v-sheet
        class="rounded p-2 mx-auto"
        max-width="800"
        elevation="12"
        height="100%"
        width="100%"
      >
        <v-img :src="imgUrl" />
      </v-sheet>
    </v-col>

    <v-col cols="12">
      <v-file-input
        :rules="ruleImage"
        label="Ảnh tiêu đề"
        accept="image/png, image/jpeg, image/bmp"
        outlined
        dense
        v-model="image"
        @update:modelValue="onFileChange"
      ></v-file-input>
    </v-col>

    <v-col cols="12">
      <CKeditorCustom
        :editorData="editorData"
        @update:modelValue="onChangeEditor"
      />
    </v-col>

    <v-col cols="12">
      <v-btn
        type="submit"
        :loading="loading"
        :disabled="
          !title ||
          !categoryId ||
          !editorData ||
          !imgUrl ||
          (isExistCategorySub && !categorySubId) ||
          loading
        "
        color="success"
      >
        {{ isModeAdd ? "Tạo bài viết" : "Lưu bài viết" }}
        <template v-slot:loader>
          <span class="custom-loader">
            <v-icon light>mdi-cached</v-icon>
          </span>
        </template>
      </v-btn>
    </v-col>
  </form>
</template>
