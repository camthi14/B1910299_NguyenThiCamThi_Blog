<script setup>
import { defineProps } from "vue";

defineProps({
  items: {
    type: [Object],
    required: true,
  },
});
</script>

<template>
  <v-menu open-on-hover transition="scale-transition">
    <template v-slot:activator="{ props }">
      <button v-bind="props">
        <v-icon>mdi-dots-vertical</v-icon>
      </button>
    </template>

    <v-list density="compact">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        active-color="primary"
        variant="plain"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
