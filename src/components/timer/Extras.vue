<template>
  <v-layout wrap>
    <v-flex text-xs-center v-for="(buttons, index) in buttonList" :key="index">
      <v-btn
        medium
        round
        :class="{ primary: button.value > 0, error: button.value < 0 }"
        @click.prevent="add(button.value)"
        v-for="(button, index) in buttons"
        :key="index"
      >
        {{ __(button.label) }}
      </v-btn>
      <v-spacer />
    </v-flex>
  </v-layout>
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
      buttonList: [
        [
          {
            label: "buttons.plusOneSecond",
            value: 1000
          },
          {
            label: "buttons.minusOneSecond",
            value: -1000
          }
        ],
        [
          {
            label: "buttons.plusFiveSeconds",
            value: 5000
          },
          {
            label: "buttons.minusFiveSeconds",
            value: -5000
          }
        ],
        [
          {
            label: "buttons.plusOneMinute",
            value: 60000
          },
          {
            label: "buttons.minusOneMinute",
            value: -60000
          }
        ],
        [
          {
            label: "buttons.plusFiveMinutes",
            value: 300000
          },
          {
            label: "buttons.minusFiveMinutes",
            value: -300000
          }
        ]
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
