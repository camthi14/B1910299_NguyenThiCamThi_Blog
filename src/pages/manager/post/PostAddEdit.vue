<script>
import { computed, defineComponent } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import FormPostAddEdit from "../../../components/manager/post/FormPostAddEdit.vue";

export default defineComponent({
  components: {
    FormPostAddEdit,
  },
  setup(props) {
    const route = useRoute();
    const isModeAdd = computed(() => (!route.params?.postId ? true : false));
    return {
      isModeAdd,
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
      <FormPostAddEdit :isModeAdd="isModeAdd" />
    </div>
  </v-container>
</template>
