import React, { Component } from 'react';
import { View, FlatList, Text, TouchableHighlight, Image } from 'react-native';
import { inject, observer } from 'mobx-react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Icon } from '../common';

@inject('itemStore', 'itemImageStore', 'itemVoiceStore')
@observer
class BottomContainer extends Component {
  render() {
    const { bottomContainerStyle,
            selectingImageContainer,
            recorderContainerStyle,
            imageContainerStyle,
            moreTextStyle,
            recorderTimerStyle } = styles;
    const { itemImageStore, itemStore, itemVoiceStore } = this.props;
    const renderImages = ({ item }) => {
        return (
          <TouchableHighlight
            onPress={() => {
              console.log(Array.prototype.slice.call(itemStore.images));
              const checkDuplicate = itemStore.images.filter((i) => {
                  return i.uri === item.uri;
              });
              if (checkDuplicate.length === 0) {
                itemImageStore.showGallerySelector = false;
                itemImageStore.mapImageToState({ ...item });
              }
              }}
            underlayColor='transparent'
          >
          <Image
            style={styles.selectingImagesStyle}
            source={{ uri: item.uri }}
          />
        </TouchableHighlight>
      );
    };
    const showImages = () => {
      if (itemImageStore.showGallerySelector) {
        return (
          <View style={imageContainerStyle}>
            <FlatList
              data={itemImageStore.galleryImages}
              renderItem={renderImages}
              keyExtractor={item => item.uri}
              horizontal
            />
            <Text
              onPress={() => itemImageStore.imageContainerSwipeUp()}
              style={moreTextStyle}
            >...
            </Text>
          </View>
        );
      }
    };
    const showRecordingVoice = () => {
      const formatSeconds = (totalSeconds) => {
        let seconds = totalSeconds % 60;
        let minutes = (totalSeconds - seconds) / 60;
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
        if (minutes < 10) {
          minutes = `0${minutes}`;
        }
        return `${minutes}:${seconds}`;
      };
      if (itemVoiceStore.recordingVoiceStat === 'started') {
        itemVoiceStore.startVoiceTimer();
        return (
          <View style={recorderContainerStyle}>
            <Icon name="voice" size={21} color="#7b75f9" />
            <Text style={recorderTimerStyle}>
              {formatSeconds(itemVoiceStore.recordingVoiceTime)}
            </Text>
          </View>
        );
      } else if (itemVoiceStore.recordingVoiceStat === 'stopped') {
        clearInterval(this.voiceTimer);
      }
    };
    return (
      <View style={bottomContainerStyle}>
        <View style={selectingImageContainer}>
          <GestureRecognizer onSwipeUp={() => itemImageStore.imageContainerSwipeUp()}>
              {showImages()}
          </GestureRecognizer>
          </View>
          {showRecordingVoice()}
      </View>
    );
  }
}

const styles = {
  bottomContainerStyle: {
    position: 'relative',
    flex: 1
  },
  selectingImageContainer: {
    paddingTop: 5,
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    backgroundColor: 'white'
  },
  recorderContainerStyle: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingBottom: 10,
    paddingTop: 10
  },
  recorderTimerStyle: {
    fontFamily: 'IS_Med',
    color: '#7b75f9',
    fontSize: 18
  },
  imageContainerStyle: {
    padding: 5,
    paddingTop: 0,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center'
  },
  selectingImagesStyle: {
    marginBottom: 10,
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15
  },
  moreTextStyle: {
    fontSize: 20,
    fontFamily: 'IS_Bold',
    paddingLeft: 8,
    marginTop: -26,
    paddingTop: 8,
    paddingRight: 8
  }
};

export default BottomContainer;
