// eslint-disable-next-line no-unused-vars
import { Howl, Howler } from "howler";
export default class Player {
  playlist = [];
  index = null;
  duration = 0;
  isPlaying = false;
  progress = 0;

  constructor(playlist) {
    this.playlist = playlist;
    console.log("the current playlist");
    console.log(playlist);
    this.index = 0;
  }

  getMaxDuration() {
    return this.duration;
  }

  getProgress() {
    return this.progress;
  }
  setProgress(val) {
    this.progress = val;
  }

  play(index) {
    let self = this;
    let sound;

    index = typeof index === "number" ? index : self.index;
    //the current song is selected by the index parameter
    var data = self.playlist[index];
    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: [data.file],
        html5: true,
        onplay: function() {
          console.log(self.playlist[index]);
          self.setProgress(sound.seek());
          self.setProgress(setInterval(sound.seek(), 1000));
        },
        onload: function() {
          self.duration = sound.duration();
        },
        onend: function() {
          self.skip("next");
        }
      });
    }
    //begin the sound :v
    sound.play();
    //keep track the current played song
    self.index = index;
  }

  pause() {
    let self = this;
    //get current howl want to stop
    let sound = self.playlist[self.index].howl;

    //pause the shit
    sound.pause();
  }
  skip(direction) {
    let self = this;

    let index = 0;
    if (direction === "prev") {
      index = self.index - 1;
      if (index < 0) {
        index = self.playlist.length - 1;
      }
    } else {
      index = self.index + 1;
      if (index >= self.playlist.length) {
        index = 0;
      }
    }
    self.skipTo(index);
  }
  skipTo(index) {
    let self = this;

    //stop current track;
    if (self.playlist[self.index].howl) {
      self.playlist[self.index].howl.stop();
    }
    self.play(index);
  }
  volume(val) {
    // eslint-disable-next-line no-unused-vars
    let self = this;

    Howler.volume(val);
  }
}
