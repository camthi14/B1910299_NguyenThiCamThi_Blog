<script>
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const store = useStore();
    const open = ref(false);
    const categories = computed(() => store.state.category.categories);

    watch(
      () => props.drawer,
      (drawer) => {
        open.value = drawer;
      }
    );
    return {
      categories,
      open,
    };
  },
});
</script>

<template>
  <v-navigation-drawer v-model="open" temporary>
    <v-list-item v-for="category in categories" :key="category._id" link>
      <router-link
        :to="`/category/${category.slug}`"
        class="text-decoration-none d-flex"
      >
        <v-icon icon="mdi-menu-right" class="pr-2"></v-icon>
        <!-- <v-icon icon="mdi-menu-down" class="mr-2 py-2"></v-icon> -->
        <v-list-item-title class="text-capitalize">
          {{ category.name }}
        </v-list-item-title>
      </router-link>

      <div v-if="category?.childrens && category?.childrens.length > 0">
        <v-list-item v-for="sub in category.childrens" :key="sub._id" link>
          <router-link
            :to="`/category/${sub.slug}`"
            class="text-decoration-none d-flex"
          >
            <v-icon icon="mdi-plus-circle-outline" class="mr-2 py-2"></v-icon>
            <v-list-item-title> {{ sub.name }} </v-list-item-title>
          </router-link>
        </v-list-item>
      </div>
    </v-list-item>
    <!-- <v-tabs style="position: relative">
        <v-tab v-for="category in categories" :key="category._id" link>
          <router-link
            :to="`/category/${category.slug}`"
            class="text-decoration-none d-flex"
          >
            <v-list-item-title class="text-capitalize">
              {{ category.name }}
            </v-list-item-title>
          </router-link>
        </v-tab>
      </v-tabs> -->
  </v-navigation-drawer>
</template>
