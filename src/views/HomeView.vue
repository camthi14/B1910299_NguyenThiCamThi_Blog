<script>
import { defineComponent } from "@vue/runtime-core";
import CardHome from "../components/CardHome.vue";
import CardHomeRight from "../components/CardHomeRight.vue";
import Slides from "../components/Slides.vue";

export default defineComponent({
  components: {
    CardHome,
    CardHomeRight,
    Slides,
  },
  setup() {
    return {};
  },
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <Slides />
    </v-col>

    <v-col cols="12" sm="8">
      <v-sheet rounded="lg">
        <CardHome />
      </v-sheet>
    </v-col>
    <v-col cols="12" sm="4">
      <v-sheet rounded="lg">
        <CardHomeRight />
      </v-sheet>
    </v-col>
  </v-row>
</template>
