<template>
  <v-container fill-height>
    <v-layout align-center>
      <v-flex>
        <Timer v-model="remainingTime"></Timer>

        <Extras v-model="remainingTime"></Extras>
      </v-flex>
    </v-layout>
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
