<template>
  <v-flex>
    <span
      :class="{
        'display-3': $vuetify.breakpoint.smAndUp,
        'display-1': $vuetify.breakpoint.xs
      }"
      v-text="formatted"
      v-show="!countdown"
    ></span>
    <span
      :class="{
        'warning--text': true,
        'display-3': $vuetify.breakpoint.smAndUp,
        'display-1': $vuetify.breakpoint.smAndDown
      }"
      v-text="countdown"
      v-show="countdown"
    ></span>
  </v-flex>
</template>

<script>
export default {
  name: "Face",
  props: {
    time: {
      type: Number,
      default: 0
    },
    countdown: {
      type: [Boolean, String, Number],
      required: true
    }
  },
  computed: {
    formatted() {
      const time = this.time;
      const remainingMinutes = Math.floor(time / 1000 / 60);
      const remainingSeconds = Math.floor(time / 1000 - remainingMinutes * 60);
      return `${remainingMinutes < 10 ? "0" : ""}${remainingMinutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`;
    }
  }
};
</script>
