import React, { Component } from 'react';
import { View, FlatList, Text, TouchableHighlight, Image } from 'react-native';
import { inject, observer } from 'mobx-react';
import GestureRecognizer from 'react-native-swipe-gestures';


@inject('itemStore', 'itemImageStore', 'itemVoiceStore')
@observer
class BottomContainer extends Component {
  render() {
    const { bottomContainerStyle,
            selectingImageContainer,
            recorderContainerStyle,
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
          <FlatList
              data={itemImageStore.galleryImages}
              renderItem={renderImages}
              keyExtractor={item => item.uri}
              horizontal
          />
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
            <Text style={recorderTimerStyle}>
              {formatSeconds(itemVoiceStore.recordingVoiceTime)}
            </Text>
          </View>
        );
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
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
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
    color: '#e74c3c',
    fontSize: 18
  },
  selectingImagesStyle: {
    marginBottom: 10,
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15
  }
};

export default BottomContainer;
