<template>
  <Timer v-model="remainingTime"></Timer>
</template>

<script>
import { Timer } from "@/components";

export default {
  name: "PublicTimer",
  components: { Timer },
  data() {
    return { remainingTime: 0 };
  }
};
</script>
