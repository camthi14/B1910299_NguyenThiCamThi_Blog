<script>
import { defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
  props: {
    text: {
      type: String,
      default: "Không có thông báo",
    },
    timeout: {
      type: Number,
      default: 1500,
    },
    location: {
      type: String,
      default: "top right",
    },
    color: {
      type: String,
      default: "success",
    },
    open: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const snackbar = ref(props.open);

    return {
      snackbar,
    };
  },
});
</script>

<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    :location="location"
    :color="color"
  >
    {{ text }}

    <template v-slot:actions>
      <v-btn :color="primary" variant="text" @click="snackbar = false">
        <v-icon icon="mdi-close"></v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
