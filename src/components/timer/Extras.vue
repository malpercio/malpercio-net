<template>
  <v-container fluid>
    <v-layout>
      <v-flex text-xs-left>
        <span
          :class="{
            'display-3': $vuetify.breakpoint.smAndUp,
            'display-1': $vuetify.breakpoint.xs
          }"
          v-text="remainingTimeFormatted"
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
      <v-flex text-xs-right>
        <v-btn
          flat
          :size="$vuetify.breakpoint.smAndUp ? '36px' : '16px'"
          color="secondary"
          :disabled="!remainingTime || freeze"
          @click.prevent="toggle"
        >
          <v-icon :size="$vuetify.breakpoint.smAndUp ? '36px' : '16px'"
            >{{ timer ? __("icons.pause", "none") : __("icons.play", "none") }}
          </v-icon>
        </v-btn>
        <v-btn
          flat
          :size="$vuetify.breakpoint.smAndUp ? '36px' : '16px'"
          color="error"
          :disabled="stopped || freeze"
          @click.prevent="stop"
        >
          <v-icon :size="$vuetify.breakpoint.smAndUp ? '36px' : '16px'">{{
            __("icons.stop", "none")
          }}</v-icon>
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
import Pizzicato from "pizzicato";

const defaultTracks = [
  { name: "Conquest 8 Bit", id: "loop" },
  { name: "Amen (Organ)", id: "amen" },
  { name: "Dark Bells", id: "dark-bells" }
];

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
  data() {
    return {
      timer: null,
      remainingSeconds: 0,
      remainingMinutes: 0,
      remainingTimeFormatted: "00:00",
      countdown: false,
      freeze: false,
      sign: new Pizzicato.Sound(require(`@/assets/timer_music/airhorn.wav`)),
      song: "loop",
      playing: null,
      catalogue: {},
      songNames: []
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
    },
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
    play() {
      if (this.catalogue[this.song]) {
        this.playing = this.catalogue[this.song];
        this.playing.play(2);
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
          this.sign.play();
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
      if (this.remainingTime <= 0) {
        this.sign.play();
        this.stop();
      }
    },
    stop() {
      this.playing && this.playing.stop();
      this.pause();
      this.remainingTime = 0;
    },
    async getTrack(id) {
      return new Promise(resolve => {
        const sound = new Pizzicato.Sound(
          {
            source: "file",
            options: {
              loop: true,
              path: require(`@/assets/timer_music/${id}.wav`)
            }
          },
          function() {
            resolve(sound);
          }
        );
      });
    },
    async getTracks(songListing) {
      const songs = await Promise.all(
        songListing.map(({ id }) => this.getTrack(id))
      );
      for (let i in songs) {
        songListing[i].file = songs[i];
      }
      this.catalogue = songListing.reduce((obj, song) => {
        obj[song.id] = song.file;
        return obj;
      }, {});
      this.songNames = songListing.map(song => ({
        text: song.name,
        value: song.id
      }));
      this.songNames.push({
        text: "None",
        value: "none"
      });
      this.song = this.songNames[0].value;
    }
  },
  watch: {
    value() {
      const time = this.value;
      this.remainingMinutes = Math.floor(time / 1000 / 60);
      this.remainingSeconds = Math.floor(
        this.value / 1000 - this.remainingMinutes * 60
      );
      this.remainingTimeFormatted = `${this.remainingMinutes < 10 ? "0" : ""}${
        this.remainingMinutes
      }:${this.remainingSeconds < 10 ? "0" : ""}${this.remainingSeconds}`;
    }
  },
  destroyed() {
    this.playing && this.playing.stop();
  },
  async created() {
    const songs = this.getTracks(defaultTracks);
    this.$loading(songs);
  }
};
</script>
