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
          :max="maxDuration">
        </v-slider>
        <div class="text-center">
          <v-btn class="ma-2" large fab dark color="indigo">
            <v-icon>mdi-skip-previous</v-icon>
          </v-btn>
          <v-btn
            v-if="isPlaying"
            @click="toogle"
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
            @click="toogle"
            large
            fab
            dark
            color="indigo"
          >
            <v-icon>mdi-play</v-icon>
          </v-btn>
          <v-btn class="ma-2" @click="skipNext" fab dark color="indigo">
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
export default {
  data() {
    return {
      song: [
        {
          name: "Mirai he hyoku",
          file:
            "/[얼티메이트] [140730] THE IDOLM@STER LIVE THE@TER HARMONY 02 (320K)/MP3/06. 未来飛行.mp3",
          imageCover: ""
        },
        {
          name: "Vivid Imagination",
          file:
            "/[얼티메이트] [140730] THE IDOLM@STER LIVE THE@TER HARMONY 02 (320K)/MP3/03. VIVID イマジネーション.mp3",
          imageCover: ""
        }
      ],
      min: 0,
      max: 100,
      volume: 35,
      isPlaying: false,
      sound: "",
      currentDuration: 0,
      maxDuration: 0,
      minDuration: 0
    };
  },
  mounted() {
    let mutagScript = document.createElement("script");
    mutagScript.setAttribute("src", "../node_modules/mutag/dist/mutag.min.js");
    document.head.appendChild(mutagScript);
    this.mediaPlayer();
    this.skipNext();
    this.currentDuration = setInterval(this.skipNext, 1000);
  },
  methods: {
    async toogle() {
      this.isPlaying = !this.isPlaying;
    },
    async skipNext() {
      this.currentDuration = this.sound.seek();
    },
    async getImageFromFile() {
      /*let mu = window.mutag;
      mu.fetch(this.song.file).then(tags => {
        console.log(tags);
      });*/
      // eslint-disable-next-line no-unused-vars
    },
    async mediaPlayer() {
      this.sound = new Howl({
        src: this.song.map(a => a.file).reverse(),
        onload: () => {
          this.maxDuration = self.formatTime(Math.round(this.song.duration()));
          console.log("Im loaded maxduration :" + this.maxDuration)
        },
        onplay: () => {
          this.isPlaying = true;
          console.log("Im getting played!");
        },
        onend: () => {
          this.isPlaying = false;
          console.log("My bad im finished" + this.isPlaying)
        }
      });
      console.log(this.song.map(a => a.file));
      this.maxDuration = this.sound.duration();
      await this.sound.play();
      this.isPlaying = true;
      console.log(await this.sound.duration());
    }
  },
  watch: {
    currentDuration: function() {
      this.currentDuration = this.sound.seek();
    },
    volume: function(val) {
      let aux = val / 100;
      Howler.volume(aux);
      console.log(aux);
    },
    isPlaying: function(val) {
      console.log(val);
      if (val) {
        this.sound.play();
      } else {
        this.sound.pause();
      }
    }
  }
};
</script>

<style scoped></style>
