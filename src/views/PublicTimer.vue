<template>
  <v-container>
    <Timer v-model="remainingTime"></Timer>
    <Extras v-model="remainingTime"></Extras>
  </v-container>
</template>

<script>
import { Timer } from "@/components";
import { Extras } from "@/components/timer";

export default {
  name: "PublicTimer",
  components: { Timer, Extras },
  data() {
    return { remainingTime: 0 };
  }
};
</script>
