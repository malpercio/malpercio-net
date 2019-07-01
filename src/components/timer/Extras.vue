<template>
  <v-flex xs12 text-xs-center>
    <v-btn
      v-for="button in buttons"
      :key="button.value"
      medium
      @click.prevent="add(button.value)"
    >
      {{ __(button.label) }}
    </v-btn>
  </v-flex>
</template>
<script>
export default {
  name: "Extras",
  model: {
    prop: "value",
    event: "changeRemainingTime"
  },
  data() {
    return {
      buttons: [
        {
          label: "buttons.plusOneSecond",
          value: 1000
        },
        {
          label: "buttons.minusOneSecond",
          value: -1000
        },
        {
          label: "buttons.plusFiveSeconds",
          value: 5000
        },
        {
          label: "buttons.minusFiveSeconds",
          value: -5000
        },
        {
          label: "buttons.plusOneMinute",
          value: 60000
        },
        {
          label: "buttons.minusOneMinute",
          value: -60000
        },
        {
          label: "buttons.plusFiveMinutes",
          value: 300000
        },
        {
          label: "buttons.minusFiveMinutes",
          value: -300000
        }
      ]
    };
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
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
  methods: {
    add(value) {
      this.remainingTime += value;
    }
  }
};
</script>
