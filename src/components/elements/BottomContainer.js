import React, { Component } from 'react';
import { View, FlatList, Text, TouchableHighlight, Image } from 'react-native';
import { inject, observer } from 'mobx-react';
import GestureRecognizer from 'react-native-swipe-gestures';
import ImagePicker from 'react-native-image-picker';

@inject('itemStore')
@observer
class BottomContainer extends Component {
  constructor(props) {
    super(props);
    this.imageContainerSwipeUp = this.imageContainerSwipeUp.bind(this);
    this.renderImages = this.renderImages.bind(this);
  }
  imageContainerSwipeUp() {
    const ImagePickerOptions = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    const { itemStore } = this.props;
    ImagePicker.showImagePicker(ImagePickerOptions, (response) => {
      const checkDuplicate = itemStore.images.filter((i) => {
          return i.uri === response.uri;
      });
      if (response.didCancel ||
          response.error ||
          response.customButton ||
          checkDuplicate.length > 0) {
        return false;
      }
      itemStore.updateValue({ prop: 'showGallerySelector', value: !itemStore.showGallerySelector });
      itemStore.addImage({ uri: response.uri, width: response.width, height: response.height });
      });
  }
  renderImages({ item }) {
    const { itemStore } = this.props;
      return (
        <TouchableHighlight
          onPress={() => {
            // checks for duplication
            const checkDuplicate = itemStore.images.filter((i) => {
                return i.uri === item.uri;
            });
            if (checkDuplicate.length === 0) {
              itemStore.updateValue({ prop: 'showGallerySelector', value: false });
              itemStore.addImage({ ...item });
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
  }
  render() {
    const { bottomContainerStyle,
            selectingImageContainer,
            recorderContainerStyle,
            recorderTimerStyle } = styles;
    const { itemStore } = this.props;
    const showImages = () => {
      if (itemStore.showGallerySelector) {
        return (
          <FlatList
              data={itemStore.galleryImages}
              renderItem={this.renderImages}
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
      if (itemStore.recordingVoiceStat === 'started') {
        return (
          <View style={recorderContainerStyle}>
            <Text style={recorderTimerStyle}>
              {formatSeconds(itemStore.recordVoiceTime)}
            </Text>
          </View>
        );
      }
    };
    return (
      <View style={bottomContainerStyle}>
        <View style={selectingImageContainer}>
          <GestureRecognizer onSwipeUp={this.imageContainerSwipeUp}>
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
