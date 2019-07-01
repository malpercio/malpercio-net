<template>
  <v-container fluid>
    <v-layout>
      <Face :time="remainingTime" :countdown="countdown" />
      <Controls
        v-model="controlStatus"
        @play="startCountdown"
        @pause="pause"
        @stop="stop"
      />
    </v-layout>

    <v-layout>
      <Slider :readonly="!!timer || freeze" v-model="remainingTime" />
    </v-layout>

    <v-layout justify-center>
      <SongSelection v-model="player" :disabled="!stopped" />
    </v-layout>
  </v-container>
</template>

<script>
import Slider from "./Slider";
import Controls from "./Controls";
import Face from "./Face";
import SongSelection from "./SongSelection";

export default {
  name: "Main",
  model: {
    prop: "value",
    event: "changeRemainingTime"
  },
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  components: { Slider, Controls, Face, SongSelection },
  data() {
    return {
      timer: null,
      remainingSeconds: 0,
      remainingMinutes: 0,
      remainingTimeFormatted: "00:00",
      countdown: false,
      freeze: false,
      player: "stop"
    };
  },
  computed: {
    stopped() {
      return !this.remainingTime && !this.timer;
    },
    remainingTime: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("changeRemainingTime", value);
      }
    },
    controlStatus() {
      return {
        playDisabled: !this.remainingTime || this.freeze,
        stopDisabled: this.stopped || this.freeze,
        isPaused: !this.timer
      };
    }
  },
  methods: {
    play() {
      this.player = "start";
      this.timer = setInterval(this.clock, 1000);
    },
    pause(action = "pause") {
      this.player = action;
      clearInterval(this.timer);
      this.timer = null;
      this.countdown = false;
    },
    startCountdown() {
      let countdown = 3;
      this.freeze = true;
      const interval = setInterval(() => {
        if (countdown == 0) {
          this.countdown = this.__("titles.start");
          this.play();
          this.freeze = false;
        } else if (countdown <= -1) {
          this.countdown = false;
          clearInterval(interval);
        } else {
          this.countdown = countdown;
        }
        countdown--;
      }, 1000);
    },
    clock() {
      this.remainingTime -= 1000;
      if (this.remainingTime <= 0) {
        this.stop("finish");
      }
    },
    stop(action = "stop") {
      clearInterval(this.timer);
      this.timer = null;
      this.countdown = false;
      this.pause(action);
      this.remainingTime = 0;
    }
  }
};
</script>
