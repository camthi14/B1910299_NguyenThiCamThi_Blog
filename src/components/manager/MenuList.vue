<script setup>
import { defineProps } from "vue";

defineProps({
  selected: {
    type: [Object],
    required: true,
  },
  onOpenDelete: {
    type: Function,
  },
  onShowChildren: {
    type: Function,
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
      <!-- eslint-disable -->
      <v-list-item active-color="primary" variant="plain" class="cursor-point">
        <router-link
          :to="`/manager/category/add/children/${selected._id}`"
          class="text-decoration-none d-flex text-error"
        >
          <v-icon icon="mdi-plus-circle-outline" class="mr-2"></v-icon>
          <v-list-item-title v-text="`Thêm danh mục con`"></v-list-item-title>
        </router-link>
      </v-list-item>

      <v-list-item
        active-color="primary"
        variant="plain"
        class="cursor-point text-success"
      >
        <div class="d-flex">
          <v-icon icon="mdi-clipboard-text" class="mr-2"></v-icon>
          <v-list-item-title
            v-text="`Hiện danh mục con`"
            @click="onShowChildren(selected)"
          ></v-list-item-title>
        </div>
      </v-list-item>

      <v-list-item
        active-color="primary"
        variant="plain"
        class="cursor-point text-primary"
      >
        <router-link
          :to="`/manager/category/update/${selected._id}`"
          class="text-decoration-none d-flex"
        >
          <v-icon icon="mdi-pencil-box-outline" class="mr-2"></v-icon>
          <v-list-item-title v-text="`Sửa danh mục`"></v-list-item-title>
        </router-link>
      </v-list-item>

      <v-list-item active-color="primary" variant="plain" class="cursor-point">
        <div class="d-flex">
          <v-icon icon="mdi-delete" class="mr-2"></v-icon>
          <v-list-item-title
            v-text="`Xoá danh mục`"
            @click="onOpenDelete(selected)"
          ></v-list-item-title>
        </div>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
