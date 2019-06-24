<template>
  <v-container fluid>
    <v-layout>
      <v-flex text-xs-left>
        <span class="display-3" v-text="remainingTimeFormatted"></span>
      </v-flex>
      <v-flex text-xs-center>
        <span
          class="display-3 warning--text"
          v-text="countdown"
          v-show="!!countdown"
        ></span>
      </v-flex>
      <v-flex text-xs-right>
        <v-btn flat large color="secondary">
          <v-icon
            large
            :disabled="!remainingTime || freeze"
            @click.prevent="toggle"
            >{{
              timer ? __("icons.pause", "none") : __("icons.play", "none")
            }}</v-icon
          >
        </v-btn>
        <v-btn
          flat
          large
          color="error"
          :disabled="stopped || freeze"
          @click.prevent="stop"
        >
          <v-icon large>{{ __("icons.stop", "none") }}</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-slider
          v-model="remainingTime"
          min="0"
          :readonly="!!timer"
          max="600000"
        >
        </v-slider>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Timer",
  data() {
    return {
      timer: null,
      remainingTime: 0,
      remainingSeconds: 0,
      remainingMinutes: 0,
      remainingTimeFormatted: "00:00",
      countdown: false,
      freeze: false
    };
  },
  computed: {
    stopped() {
      return !this.remainingTime && !this.timer;
    },
    paused() {
      return this.remainingTime && !this.timer;
    },
    playing() {
      return this.remainingTime && this.timer;
    }
  },
  methods: {
    play() {
      this.timer = setInterval(this.clock, 1000);
    },
    pause() {
      clearInterval(this.timer);
      this.timer = null;
      this.countdown = false;
    },
    startCountdown() {
      let countdown = 3;
      this.freeze = true;
      const interval = setInterval(() => {
        if (countdown == 0) {
          this.countdown = "Start";
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
    toggle() {
      if (this.playing) {
        this.pause();
      } else {
        this.startCountdown();
      }
    },
    clock() {
      this.remainingTime -= 1000;
      if (this.remainingTime <= 0) {
        this.stop();
      }
    },
    stop() {
      this.pause();
      this.remainingTime = 0;
    }
  },
  watch: {
    remainingTime() {
      const time = this.remainingTime;
      this.remainingMinutes = Math.floor(time / 1000 / 60);
      this.remainingSeconds = Math.floor(
        this.remainingTime / 1000 - this.remainingMinutes * 60
      );
      this.remainingTimeFormatted = `${this.remainingMinutes < 10 ? "0" : ""}${
        this.remainingMinutes
      }:${this.remainingSeconds < 10 ? "0" : ""}${this.remainingSeconds}`;
    }
  },
  mounted() {
    this.remainingTime = 5000;
  }
};
</script>
