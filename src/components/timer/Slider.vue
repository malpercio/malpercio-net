<template>
  <v-flex>
    <v-slider v-model="remainingTime" min="0" :readonly="readonly" :max="max">
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
    return { max: 600000 };
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
  },
  watch: {
    remainingTime(newValue) {
      if (newValue >= this.max) {
        this.max *= 1.5;
      } else if (newValue <= 600000) {
        this.max = 600000;
      }
    }
  }
};
</script>
