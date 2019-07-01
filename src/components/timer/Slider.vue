<template>
  <v-flex>
    <v-slider v-model="remainingTime" min="0" :readonly="readonly" max="600000">
    </v-slider>
  </v-flex>
</template>

<script>
export default {
  name: "Slider",
  model: {
    prop: "value",
    event: "changeRemainingTime"
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    readonly: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    remainingTime: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("changeRemainingTime", value);
      }
    }
  }
};
</script>
