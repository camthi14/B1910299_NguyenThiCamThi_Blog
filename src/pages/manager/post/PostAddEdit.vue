<script>
import { computed, defineComponent, onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import FormPostAddEdit from "../../../components/manager/post/FormPostAddEdit.vue";
import postApi from "../../../apis/postApi";

export default defineComponent({
  components: {
    FormPostAddEdit,
  },
  setup(props) {
    const route = useRoute();
    const isModeAdd = computed(() => (!route.params?.postId ? true : false));
    const postSelected = ref();

    const getPostById = async (postId) => {
      try {
        const response = await postApi.getById(postId);

        if (response && response.elements) {
          return response.elements;
        }
      } catch (error) {
        console.log("Error getPostById:::", error);
      }
    };

    onMounted(async () => {
      if (!route.params?.postId) return;
      postSelected.value = await getPostById(route.params.postId);
    });
    return {
      getPostById,
      isModeAdd,
      postSelected,
    };
  },
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-center my-4">
          {{ isModeAdd ? "Thêm" : "Cập nhật" }} bài viết
        </h1>
      </v-col>
    </v-row>
    <div>
      <FormPostAddEdit v-if="isModeAdd" :isModeAdd="isModeAdd" />
      <FormPostAddEdit
        v-else
        :isModeAdd="isModeAdd"
        :postSelected="postSelected ? postSelected : {}"
      />
    </div>
  </v-container>
</template>
