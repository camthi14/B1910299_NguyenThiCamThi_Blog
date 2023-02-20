<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    open: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<template>
  <v-overlay :model-value="open" class="align-center justify-center">
    <v-progress-circular
      color="primary"
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>
