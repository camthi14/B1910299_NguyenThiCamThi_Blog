<script>
import { computed, defineComponent, watch } from "vue";
import Toast from "./components/Toast.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Toast,
  },

  setup() {
    const store = useStore();

    const text = computed(() => store.state.toast.text);
    const color = computed(() => store.state.toast.color);
    const open = computed(() => store.state.toast.open);
    const duration = computed(() => store.state.toast.timeout);

    watch(
      () => store.state.toast.open,
      (open) => {
        if (open) {
          setTimeout(
            () => store.dispatch("toast/saveOpen", { open: false }),
            duration.value + 5
          );
        }
      }
    );

    return {
      text,
      color,
      open,
    };
  },
});
</script>

<template>
  <div>
    <router-view />
    <toast v-if="open" :open="open" :color="color" :text="text" />
  </div>
</template>
