<script>
import { computed, defineComponent } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();

    // console.log(route.params);

    const slug = computed(() => route.params?.slug);

    // console.log(slug);
    return {
      slug,
    };
  },
});
</script>

<template>
  <div class="mt-5">Category with slug = {{ slug }}</div>
</template>
