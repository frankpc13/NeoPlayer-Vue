<template>
  <div>
    <h1>Hello there music player coming soon...</h1>
    <v-row>
      <v-col cols="4"></v-col>
      <v-col cols="4">
        <v-img> </v-img>
        <h3>{{ song.name }}</h3>
        <v-slider
          label="Duration"
          v-model="currentDuration"
          :min="minDuration"
          :max="maxDuration"
        >
        </v-slider>
        <div class="text-center">
          <v-btn
            @click="skipToPrevious"
            class="ma-2"
            fab
            dark
            color="indigo"
          >
            <v-icon>mdi-skip-previous</v-icon>
          </v-btn>
          <v-btn
            v-if="isPlaying"
            @click="togglePlayingState"
            class="ma-2"
            large
            fab
            dark
            color="indigo"
          >
            <v-icon>mdi-pause</v-icon>
          </v-btn>
          <v-btn
            v-else
            class="ma-2"
            @click="togglePlayingState"
            large
            fab
            dark
            color="indigo"
          >
            <v-icon>mdi-play</v-icon>
          </v-btn>
          <v-btn class="ma-2" @click="skipToNext" fab dark color="indigo">
            <v-icon>mdi-skip-next</v-icon>
          </v-btn>
        </div>
        <v-slider
          label="Volume"
          v-model="volume"
          append-icon="mdi-volume-high"
          prepend-icon="mdi-volume-medium"
          :min="min"
          :max="max"
        ></v-slider>
      </v-col>
      <v-col cols="4"></v-col>
    </v-row>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { Howl, Howler } from "howler";
import Player from "../classes/Player";
export default {
  data() {
    return {
      song: [
        {
          name: "Mirai he hyoku",
          file:
            "/[얼티메이트] [140730] THE IDOLM@STER LIVE THE@TER HARMONY 02 (320K)/MP3/06. 未来飛行.mp3",
          imageCover: "",
          howl: null
        },
        {
          name: "Vivid Imagination",
          file:
            "/[얼티메이트] [140730] THE IDOLM@STER LIVE THE@TER HARMONY 02 (320K)/MP3/03. VIVID イマジネーション.mp3",
          imageCover: "",
          howl: null
        },
        {
          name: "",
          file:
          "/THE IDOLM@STER LIVE THE@TER HARMONY 06/06.ホントウノワタシ.mp3",
          imageCover: "",
          howl: null
        }
      ],
      currentSong: "",
      min: 0,
      max: 100,
      volume: 15,
      isPlaying: false,
      sound: "",
      currentDuration: 0,
      maxDuration: 0,
      minDuration: 0,
      player: ""
    };
  },
  mounted() {
    this.player = new Player(this.song);
  },
  methods: {
    async togglePlayingState() {
      this.isPlaying = !this.isPlaying;
    },
    async toggleProgressBar() {
      setInterval(this.player.getProgress(), 1000)
    },
    async skipToNext() {
      this.player.skip("next");
      this.maxDuration = this.player.getMaxDuration();
    },
    async skipToPrevious() {
      this.player.skip("prev");
      this.maxDuration = this.player.getMaxDuration();
    },
    async play() {
      this.player.play();
      this.maxDuration = this.player.duration();
      await this.toggleProgressBar()
      this.currentSong = this.player.getCurrentSong();
    },
  },
  watch: {
    currentDuration: function(val) {
      this.currentDuration = val;
    },
    volume: function(val) {
      let aux = val / 100;
      Howler.volume(aux);
    },
    isPlaying: function(val) {
      console.log(val);
      if (val) {
        this.player.play();
      } else {
        this.player.pause();
      }
    }
  }
};
</script>

<style scoped></style>
