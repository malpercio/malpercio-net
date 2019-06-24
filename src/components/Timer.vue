<template>
  <Timer  v-model="remainingTime" @input=”remainingTime = $event.target.value”></Timer>
</template>

<script>
import { Timer } from "@/components";

export default {
  name: "Timer",
  components: {Timer},
  data() {
    return {remainingTime: 0}
  },
  watch:{
    remainingTime(
      console.log(this.remainingTime)
    )
  }
};
</script>
