<script setup>
import { useRoute } from "vue-router";
import { computed, markRaw, onMounted, ref, watch } from "vue";
import Toast from "./components/Toast.vue";
import { useStore } from "vuex";

const defaultLayout = "DefaultLayout";
const route = useRoute();
const layout = ref();
const store = useStore();

const text = computed(() => store.state.toast.text);
const color = computed(() => store.state.toast.color);
const open = computed(() => store.state.toast.open);

watch(
  () => store.state.toast.open,
  (open) => {
    if (open) {
      setTimeout(() => store.dispatch("toast/saveOpen", { open: false }), 1500);
    }
  }
);

watch(
  () => route.meta?.layout,
  async (metaLayout) => {
    try {
      let component;

      if (metaLayout) {
        component = await import(`./layouts/${metaLayout}.vue`);
      } else {
        component = await import(`./layouts/${defaultLayout}.vue`);
      }

      layout.value = markRaw(component?.default);
    } catch (e) {
      let component = await import(`./layouts/${defaultLayout}.vue`);
      layout.value = markRaw(component);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <component :is="layout">
      <router-view />

      <toast v-if="open" :open="open" :color="color" :text="text" />
    </component>
  </div>
</template>

<style>
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
