<template>
  <v-flex xs3>
    <v-select
      v-model="song"
      :items="songNames"
      :disabled="disabled"
      single-line
    ></v-select>
  </v-flex>
</template>

<script>
import Pizzicato from "pizzicato";

const defaultTracks = [
  { name: "Conquest 8 Bit", id: "loop" },
  { name: "Amen (Organ)", id: "amen" },
  { name: "Dark Bells", id: "dark-bells" }
];

export default {
  name: "SongSelection",
  model: {
    prop: "state",
    event: "togglePlay"
  },
  props: {
    state: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      alarm: new Pizzicato.Sound(require(`@/assets/timer_music/airhorn.wav`)),
      song: "loop",
      catalogue: {},
      songNames: []
    };
  },
  computed: {
    currentSong() {
      return this.catalogue[this.song];
    }
  },
  methods: {
    play() {
      this.currentSong && this.currentSong.play(2);
    },
    alert() {
      this.alarm.play();
    },
    finish() {
      this.stop();
      this.alert();
    },
    start() {
      this.alert();
      this.play();
    },
    pause() {
      this.currentSong && this.currentSong.pause();
    },
    stop() {
      this.currentSong && this.currentSong.stop();
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
    state(newValue) {
      this[newValue] && this[newValue]();
    }
  },
  destroyed() {
    this.currentSong && this.currentSong.stop();
  },
  async created() {
    const songs = this.getTracks(defaultTracks);
    this.$loading(songs);
  }
};
</script>
