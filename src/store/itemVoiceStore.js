import { observable } from 'mobx';
import { Vibration, Animated } from 'react-native';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import { itemImageStore, itemStore } from './';

class Voice {
  @observable recordingVoiceTime = 0;
  @observable recordingVoiceStat = 'stopped';
  @observable voicePathCounter = 0;
  @observable timelineWidth = 0;
  startVoiceTimer() {
    this.voiceTimer = setTimeout(() => {
      this.recordingVoiceTime += 1;
    }, 1000);
  }
  getVoiceLayout(e) {
    this.timelineWidth = e.nativeEvent.layout.width;
  }
  startRecordingVoice() {
      this.recordingVoiceStat = 'started';
      Vibration.vibrate([0, 50, 25, 0]);
      this.voicePathCounter = new Date().getTime();
      const path = `${AudioUtils.DocumentDirectoryPath}/voice${this.voicePathCounter}.aac`;
      AudioRecorder.prepareRecordingAtPath(path, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: 'Low',
        AudioEncoding: 'aac'
      });
      AudioRecorder.startRecording();
      itemImageStore.showGallerySelector = false;
  }
  saveVoice() {
    this.recordingVoiceTime = 0;
    this.recordingVoiceStat = 'stopped';
    clearInterval(this.voiceTimer);
    Vibration.vibrate([0, 50, 25, 0]);
    const that = this;
    const path = `${AudioUtils.DocumentDirectoryPath}/voice${this.voicePathCounter}.aac`;
    AudioRecorder.stopRecording();
    const sound = new Sound(path, Sound.MAIN_BUNDLE, (error) => {
              if (error) {
                  console.log('failed to load the sound', error);
              } else if (sound.getDuration() >= 1) {
                itemStore.voices.push({
                  type: 'voice',
                  duration: sound.getDuration(),
                  playingVoiceTime: new Animated.Value(0),
                  status: 'stopped',
                  timestamp: new Date().getTime(),
                  pathNum: that.voicePathCounter,
                  sound
                });
                that.voicePathCounter = 0;
              }
          });
  }
  removeVoice(timestamp, pathNum) {
    const updatedState = itemStore.voices.filter(item => {
       if (item.timestamp === timestamp) {
        item.sound.stop();
        return false;
      }
        return true;
    });
    const path = `${AudioUtils.DocumentDirectoryPath}/voice${pathNum}.aac`;
    itemStore.voices = updatedState;
    RNFS.unlink(path);
  }
  playAndPauseVoice(duration, timestamp) {
      const selectedVoice = itemStore.voices.filter(item => {
        return item.timestamp === timestamp;
      })[0];
      const updatedState = (nextStatus, currentStatus) => {
        return itemStore.voices.map(item => {
          if (item.timestamp === timestamp) {
            item.status = nextStatus;
              if (currentStatus === 'stopped') {
              item.sound = item.sound.play();
            } else {
              item.sound = item.sound.pause();
              item.playingVoiceTime.stopAnimation();
            }
          }
          return item;
        });
      };
      if (selectedVoice.status !== 'started') {
        itemStore.voices = updatedState('started', 'stopped');
        selectedVoice.sound.getCurrentTime(seconds => {
          console.log((duration - seconds) * 1000);
          Animated.sequence([
            Animated.timing(selectedVoice.playingVoiceTime, {
              duration: ((duration - seconds) * 1000) + 0.100,
              toValue: 1,
              Easing: 'linear'
            }),
            Animated.timing(selectedVoice.playingVoiceTime, {
              duration: 0,
              toValue: 0
            })
          ]).start(() => {
            itemStore.voices = updatedState('stopped', 'started');
          });
        });
      } else {
        itemStore.voices = updatedState('paused', 'started');
      }
  }
  progressTimeline(item) {
        const width = item.playingVoiceTime.interpolate({
          inputRange: [0, 1],
          outputRange: [0, this.timelineWidth]
        });
        return { width };
    }
}

const itemVoiceStore = new Voice;

export { itemVoiceStore };
