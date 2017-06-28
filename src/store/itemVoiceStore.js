import { observable } from 'mobx';
import { Vibration, Animated } from 'react-native';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import { itemImageStore, itemStore } from './';

class Voice {
  @observable recordingVoiceTime = 0;
  @observable recordingVoiceStat = 'stopped';
  @observable voicePathCounter = 1;
  startVoiceTimer() {
    this.voiceTimer = setTimeout(() => {
      this.recordingVoiceTime += 1;
    }, 1000);
  }
  startRecordingVoice() {
      Vibration.vibrate([0, 50, 25, 0]);
      const path = `${AudioUtils.DocumentDirectoryPath}/voice${this.voicePathCounter}.aac`;
      AudioRecorder.prepareRecordingAtPath(path, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: 'Low',
        AudioEncoding: 'aac'
      });
      AudioRecorder.startRecording();
      itemImageStore.showGallerySelector = false;
      this.recordingVoiceStat = 'started';
  }
  saveVoice() {
    Vibration.vibrate([0, 50, 25, 0]);
    const that = this;
    const path = `${AudioUtils.DocumentDirectoryPath}/voice${this.voicePathCounter}.aac`;
    AudioRecorder.stopRecording();
    this.recordingVoiceTime = 0;
    this.recordingVoiceStat = 'stopped';
    this.recordingVoiceTime = 0;
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
                  sound
                });
                that.voicePathCounter += 1;
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
           this.setState({ itemsToBeRendered: updatedState });
           RNFS.unlink(path);
  }
}

const itemVoiceStore = new Voice;

export { itemVoiceStore };
