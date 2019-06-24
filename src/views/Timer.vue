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
        <v-btn
          flat
          large
          color="secondary"
          :disabled="!remainingTime || freeze"
          @click.prevent="toggle"
        >
          <v-icon large
            >{{ timer ? __("icons.pause", "none") : __("icons.play", "none") }}
          </v-icon>
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
          :readonly="!!timer || freeze"
          max="600000"
        >
        </v-slider>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs3>
        <v-select
          v-model="song"
          :items="songNames"
          label="Select"
          :disabled="!stopped"
          single-line
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { Howl } from "howler";
export default {
  name: "Timer",
  props:{
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      timer: null,
      remainingTime: this.value,
      remainingSeconds: 0,
      remainingMinutes: 0,
      remainingTimeFormatted: "00:00",
      countdown: false,
      freeze: false,
      song: "originalRags",
      playing: null,
      catalogue: {
        originalRags: this.getHowl("1518929"),
        maybeItWasTrue: this.getHowl("1560438"),
        sonataSatanica: this.getHowl("1133758"),
      },
      songNames: [
        {
          text: "Original Rags",
          value: "originalRags"
        },
        {
          text: "Maybe it was true",
          value: "maybeItWasTrue"
        },
        {
          text: "Sonata Satanica",
          value: "sonataSatanica"
        },
        {
          text: "None",
          value: "none"
        }
      ]
    };
  },
  computed: {
    stopped() {
      return !this.remainingTime && !this.timer;
    },
    paused() {
      return this.remainingTime && !this.timer;
    },
    running() {
      return this.remainingTime && this.timer;
    }
  },
  methods: {
    play() {
      if (this.catalogue[this.song]) {
        this.playing = this.catalogue[this.song];
        this.playing.play();
      }
      this.timer = setInterval(this.clock, 1000);
    },
    pause() {
      this.playing && this.playing.pause();
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
    toggle() {
      if (this.running) {
        this.pause();
      } else {
        this.startCountdown();
      }
    },
    clock() {
      this.remainingTime -= 1000;
      this.$emit('input',this.remainingTime)
      if (this.remainingTime <= 0) {
        this.stop();
      }
    },
    stop() {
      this.playing && this.playing.stop();
      this.pause();
      this.remainingTime = 0;
      this.$emit('input',this.remainingTime)
    },
    getHowl(id){
      return new Howl({
        src: [
          `https://api.jamendo.com/v3.0/tracks/file?client_id=3f977b40&id=${id}&audioformat=ogg`
        ],
        format: ["ogg"],
        loop: true
      })
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
  destroyed() {
    this.playing && this.playing.stop();
  }
};
</script>
