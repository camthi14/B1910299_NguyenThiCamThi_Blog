<script>
import { defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import categoryApi from "../../../apis/categoryApi";
import slugify from "slugify";
import { useStore } from "vuex";

export default defineComponent({
  // Định nghĩa thuộc tính
  props: {
    selected: {
      type: Object,
      default: {},
      // reqiured: true,
    },
    parent: {
      type: Object,
      default: {},
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const name = ref("");
    const slug = ref("");
    const max = 40;
    const errorMessage = ref("");
    const ruleName = [
      (v) => !!v || "Tên danh mục là trường bắt buộc",
      (v) =>
        (v && v.length <= max) || `Tên danh mục không vượt quá ${max} kí tự`,
    ];
    let errors = {};

    watch(name, (nameNew, nameOld) => {
      slug.value = slugify(nameNew, { locale: "vi" });
      nameNew.length >= max ? (errors["name"] = true) : (errors = {});
    });

    watch(
      () => props.selected,
      (selected) => {
        name.value = selected.name;
        slug.value = slugify(selected.name, { locale: "vi" });
      }
    );

    const handleSubmit = async () => {
      if (Object.keys(errors).length === 0) {
        //khi thay đổi giá trị thì sử dụng let
        let data = {
          name: name.value,
          slug: slug.value,
        };
        try {
          let response;
          const selectedEmpty = Object.keys(props.selected).length === 0;
          const parentEmpty = Object.keys(props.parent).length === 0;

          //isModeUpdate là object không thể sử dụng ! để so sánh
          if (selectedEmpty) {
            if (!parentEmpty) {
              data = {
                ...data,
                level: +props.parent.level + 1,
                parentId: props.parent._id,
              };
            }
            response = await categoryApi.create(data);
          } else {
            response = await categoryApi.update({
              id: props.selected._id,
              data,
            });
          }

          if (response && response.elements) {
            const payload = {
              text: `${selectedEmpty ? "Thêm" : "Cập nhật"} danh mục ${
                parentEmpty ? "con" : ""
              } thành công!`,
              color: "success",
              open: true,
            };
            store.dispatch("toast/startToast", payload);
            router.push("/manager/category");
          }
        } catch (error) {
          if (error && error.response && error.response.data) {
            errorMessage.value = error.response.data.errors.message;
          }
        }
      }
    };

    return {
      handleSubmit,
      name,
      slug,
      max,
      errorMessage,
      ruleName,
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
      label="Tên danh mục"
      v-model="name"
      :counter="max"
      :rules="ruleName"
    />

    <v-text-field v-model="slug" type="text" label="Slug danh mục" disabled />

    <v-btn type="submit" :disabled="!name" color="success" class="mt-5 d-block">
      Lưu
    </v-btn>
  </form>
</template>
