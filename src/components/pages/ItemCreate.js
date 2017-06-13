import React, { Component } from 'react';
import { View,
        Image,
        TouchableHighlight,
        FlatList, ScrollView,
        Picker,
        Text,
        StyleSheet,
        TouchableWithoutFeedback,
        LayoutAnimation,
        UIManager } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import { BoxShadow } from 'react-native-shadow';
import ImagePicker from 'react-native-image-picker';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-simple-modal';
import { Actions } from 'react-native-router-flux';
import { Navigation, Input, ItemSection, Icon } from '../common';
import ItemAddons from '../elements/ItemAddons';

const audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';
const ImagePickerOptions = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class ItemCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsToBeRendered: [],
      images: [],
      showGallerySelector: false,
      showImageModal: false,
      selectedInput: 'ورزشی',
      openedImage: { node: { image: { uri: ' ', width: 0, height: 0 } } },
      marker: { coordinate: { latitude: 35.690298, longitude: 51.384343 } },
      showMapModal: false,
      recordVoiceTime: 0,
      recordingVoiceStat: 'stopped'
    };
    // enable animation

    UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
    // bindings

    this.addImage = this.addImage.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.renderAllItems = this.renderAllItems.bind(this);
    this.imageContainerSwipeUp = this.imageContainerSwipeUp.bind(this);
    this.openImageModal = this.openImageModal.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.handleMapPress = this.handleMapPress.bind(this);
    this.addLocation = this.addLocation.bind(this);
    this.addMapToList = this.addMapToList.bind(this);
    this.removeMap = this.removeMap.bind(this);
    this.addVoice = this.addVoice.bind(this);
    this.startVoiceTimer = this.startVoiceTimer.bind(this);
    this.cancelVoice = this.cancelVoice.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      switch (this.state.recordingVoiceStat) {
        case 'started':
          this.startVoiceTimer();
          break;
        default:
      }
    }
  }
  // open gallery on swipe
  imageContainerSwipeUp() {
    ImagePicker.showImagePicker(ImagePickerOptions, (response) => {
      if (response.didCancel || response.error || response.customButton) {
        return false;
      }
      this.setState({
        itemsToBeRendered: [
                ...this.state.itemsToBeRendered,
                { type: 'image', node: { image: { uri: response.uri } } }
              ],
            showGallerySelector: false
            });
      });
  }
  itemsKeyExtractor(item) {
    switch (item.type) {
      case 'image':
        return item.node.image.uri;
      case 'map':
        return item.coordinate.longitude + item.coordinate.latitude;
    }
  }
  // this func will expand image in modal

  openImageModal(image) {
      this.setState({ showImageModal: true, openedImage: image });
  }
  // this func will remove image
  removeImage(uri) {
    const selectedImages = this.state.itemsToBeRendered.filter((item) => {
      if (item.type !== 'image') {
        return true;
      }
      return item.node.image.uri !== uri;
    });
    this.setState({ itemsToBeRendered: selectedImages });
  }
  // this will show up images section on icon press
  removeMap() {
    const updatedState = this.state.itemsToBeRendered.filter((item) => {
      return item.type !== 'map';
    });
    this.setState({
      itemsToBeRendered: updatedState
    });
  }
  addImage(images) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      images,
      showGallerySelector: !this.state.showGallerySelector
    });
  }


  handleMapPress(e) {
    this.setState({
      marker: {
        coordinate: e.nativeEvent.coordinate
      }
    });
  }

  // this will render images from gallery

  renderImages({ item }) {
      return (
        <TouchableHighlight
          onPress={() => {
            // checks for duplication
            const checkDuplicate = this.state.itemsToBeRendered.filter((i) => {
              if (i.type === 'image') {
                return i.node.image.uri === item.node.image.uri;
              }
              return false;
            });
            if (checkDuplicate.length > 0) {
              return false;
            }
            this.setState({
              itemsToBeRendered: [...this.state.itemsToBeRendered, { ...item, type: 'image' }],
              showGallerySelector: false
            });
            }}
          underlayColor='transparent'
        >
        <Image
          style={styles.selectingImagesStyle}
          source={{ uri: item.node.image.uri }}
        />
      </TouchableHighlight>
    );
  }
  addLocation() {
    this.setState({
      showMapModal: true,
      showGallerySelector: false
    });
  }
  addMapToList() {
    const mapExist = this.state.itemsToBeRendered.filter(item => {
      return item.type === 'map';
    });
    if (mapExist.length > 0) {
      const updatedMap = {
        ...this.state.marker,
         type: 'map'
      };
      const updatedState = this.state.itemsToBeRendered.map(item => {
          if (item.type === 'map') {
            item = updatedMap;
          }
        return item;
        });
      this.setState({
        showMapModal: false,
        itemsToBeRendered: updatedState
      });
    }
    else {
      this.setState({
        showMapModal: false,
        itemsToBeRendered: [...this.state.itemsToBeRendered, {
          ...this.state.marker,
          type: 'map'
        }]
      });
    }
  }

  addVoice() {
      AudioRecorder.prepareRecordingAtPath(audioPath, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: 'Low',
        AudioEncoding: 'aac'
      });
      this.setState({
        showGallerySelector: 'false',
        recordingVoiceStat: 'started'
      });
  }
  startVoiceTimer() {
    this.voiceTimer = setTimeout(() => {
      const newCount = this.state.recordVoiceTime + 1;
      this.setState({ recordVoiceTime: newCount });
    }, 1000);
  }
  cancelVoice() {
    clearInterval(this.voiceTimer);
    this.setState({
      recordVoiceTime: 0,
      recordingVoiceStat: 'stopped'
    });
  }
  // this will render all items such as voice location alarm and images

  renderAllItems({ item }) {
    switch (item.type) {
      case 'image':
        return (
          <TouchableHighlight
            onPress={() => this.openImageModal(item)}
            onLongPress={() => this.removeImage(item.node.image.uri)}
          >
              <View style={{ position: 'relative' }}>
                <View style={styles.filterContainerStyle}>
                  <View style={styles.blackFilterStyle} />
                  <Icon name="picture" size={27} color="white" />
                </View>
                <Image
                  style={styles.imageStyle}
                  source={{ uri: item.node.image.uri }}
                />
              </View>
            </TouchableHighlight>
          );
    case 'map': {
      return (
        <View style={{ flex: 1, height: 70 }}>
          <MapView
            style={{
              ...StyleSheet.absoluteFillObject,
            }}
            onLongPress={this.removeMap}
            onPress={this.handleMapPress}
            initialRegion={{
              latitude: this.state.marker.coordinate.latitude + 0.001,
              longitude: this.state.marker.coordinate.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }}
          >
            <Marker {...this.state.marker}>
              <BoxShadow setting={shadowOpt}>
              <View style={styles.markerStyle} />
              </BoxShadow>
            </Marker>
          </MapView>
        </View>
      );
    }
    default:
      return false;
    }
  }
  render() {
    const { sectionStyle,
            selectingImageContainer,
            openedImageStyle,
            imageModalStyle,
            markerStyle,
            mapModalStyle,
            recorderContainerStyle,
            recorderTimerStyle,
            recorderRejectStyle,
            bottomContainerStyle,
            mapModalTextStyle,
            mapModalTitleStyle,
            imageModalTextStyle } = styles;
    const swipeConfig = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
      };
    const showImages = () => {
      if (this.state.showGallerySelector) {
        return (
          <FlatList
              data={this.state.images}
              renderItem={this.renderImages}
              keyExtractor={item => item.node.image.uri}
              horizontal
          />
        );
      }
    };
    const openedImage = this.state.openedImage.node.image;
    const showMapPoint = () => {
      if (Object.keys(this.state.marker).length !== 0) {
        return (
            <Marker {...this.state.marker}>
              <BoxShadow setting={shadowOpt}>
              <View style={markerStyle} />
              </BoxShadow>
            </Marker>

        );
      }
    };

    const mapSaveAndCloseToggle = () => {
      if (Object.keys(this.state.marker).length !== 0) {
        return (
          <TouchableWithoutFeedback onPress={this.addMapToList}>
            <View style={styles.modalBottomContainerStyle}>
              <Text style={mapModalTextStyle}>ذخیره</Text>
              <Icon name="checkmark" size={17} color="#0087ed" />
            </View>
          </TouchableWithoutFeedback>
        );
      }
      return (
        <TouchableWithoutFeedback onPress={() => this.setState({ showMapModal: false })}>
          <View style={styles.modalBottomContainerStyle}>
            <Text style={[imageModalTextStyle, { color: 'black' }]}>بستن</Text>
            <Icon name="close" size={11} color="black" />
          </View>
        </TouchableWithoutFeedback>
      );
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
      if (this.state.recordingVoiceStat === 'started') {
        return (
          <View style={recorderContainerStyle}>
            <Text style={recorderTimerStyle}>
              {formatSeconds(this.state.recordVoiceTime)}
            </Text>
            <Text style={recorderRejectStyle}>برای لغو انگشتتون رو بالا بکشید!</Text>
          </View>
        );
      }
    };
    return (
      <View style={{ flex: 1 }}>

        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Navigation
              rightInfo="ذخیره"
              rightInfoColor="#0288eb"
              leftIcon="back"
              onLeftButtonPress={() => Actions.category()}
            />
          <ScrollView>
            <View style={{ paddingRight: 10 }}>
              <ItemSection style={{ ...sectionStyle, borderTopWidth: 0 }}>
                <Input
                  align="right"
                  placeholder="تیتر"
                  bordered
                  size={15}
                />
              </ItemSection>

              <ItemSection style={sectionStyle}>
                <Input
                  align="right"
                  placeholder="توضیح کوتاه"
                  bordered
                  size={15}
                />
              </ItemSection>

              <ItemSection style={sectionStyle}>
                <Picker
                selectedValue={this.state.selectedInput}
                onValueChange={(itemValue) => this.setState({ selectedInput: itemValue })}
                >
                  <Picker.Item label="ورزشی" value="varzeshi" />
                  <Picker.Item label="مطالعه" value="motalee" />
                </Picker>
              </ItemSection>

              <ItemSection style={sectionStyle}>
                <Input
                  align="right"
                  placeholder="لینک"
                  bordered
                  size={15}
                />
              </ItemSection>
            </View>
            <FlatList
                data={this.state.itemsToBeRendered}
                renderItem={this.renderAllItems}
                keyExtractor={this.itemsKeyExtractor}
            />
          </ScrollView>
          <View style={bottomContainerStyle}>
            <View style={selectingImageContainer}>
              <GestureRecognizer
                imageContainerSwipeUp={(state) => this.imageContainerSwipeUp(state)}
                config={swipeConfig}
              >
                  {showImages()}
                </GestureRecognizer>
              </View>
              {showRecordingVoice()}
          </View>
          <ItemAddons
            addVoice={this.addVoice}
            cancelVoice={this.cancelVoice}
            addLocation={this.addLocation}
            addImage={this.addImage}
          />
        </View>
        <Modal
          open={this.state.showImageModal}
          modalDidClose={() => this.setState({ showImageModal: false })}
          modalStyle={imageModalStyle}
        >
          <Image
            style={openedImageStyle}
            source={{ uri: openedImage.uri }}
          />
          <TouchableWithoutFeedback onPress={() => this.setState({ showImageModal: false })}>
            <View style={styles.modalBottomContainerStyle}>
              <Text style={imageModalTextStyle}>بستن</Text>
              <Icon name="close" size={11} color="white" />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Modal
          open={this.state.showMapModal}
          modalDidClose={() => this.setState({ showMapModal: false })}
          modalStyle={mapModalStyle}
        >
          <Text style={mapModalTitleStyle}>مکان خودتون رو انتخاب کنید!</Text>
          <View style={{ flex: 1, height: 70 }}>
            <MapView
              style={{
                ...StyleSheet.absoluteFillObject,
              }}
              onPress={this.handleMapPress}
              initialRegion={{
                latitude: this.state.marker.coordinate.latitude,
                longitude: this.state.marker.coordinate.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            >
              {showMapPoint()}
            </MapView>
          </View>
            {mapSaveAndCloseToggle()}
        </Modal>
      </View>
    );
  }
}
const shadowOpt = {
	width: 15,
	height: 15,
	color: '#0087ed',
	border: 0,
	radius: 5,
	opacity: 0.12,
	x: 0,
	y: 3,
	style: { marginVertical: 5 }
};
const styles = {
  sectionStyle: {
    paddingTop: 4,
    paddingBottom: 4,
    borderTopColor: 'rgba(0,0,0,.07)'
  },
  bottomContainerStyle: {
    position: 'relative',
    flex: 1
  },
  selectingImageContainer: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white'
  },
  selectingImagesStyle: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15
  },
  imageStyle: {
    flex: 1,
    height: 70,
    resizeMode: 'cover'
  },
  openedImageStyle: {
    flex: 1,
    height: 260,
    marginBottom: 10,
    resizeMode: 'cover'
  },
  filterContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    flex: 1,
    height: 70,
    top: 0,
    right: 0,
    left: 0,
    zIndex: 2
  },
  imageModalStyle: {
    height: 250,
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    backgroundColor: 'transparent'
  },
  imageModalTextStyle: {
     alignSelf: 'center',
     color: 'white',
     fontFamily: 'IS_Bold',
     fontSize: 16,
     marginRight: 5,
     marginTop: 5
  },
  blackFilterStyle: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5
  },
  markerStyle: {
    backgroundColor: '#0087ed',
    width: 15,
    height: 15,
    borderRadius: 15
  },
  modalBottomContainerStyle: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center'
  },
  mapModalStyle: {
    height: 400,
    paddingRight: 0,
    paddingLeft: 0
  },
  mapModalTextStyle: {
    alignSelf: 'center',
    color: '#0087ed',
    fontFamily: 'IS_Bold',
    fontSize: 16,
    marginRight: 5,
    marginTop: 5
  },
  mapModalTitleStyle: {
    alignSelf: 'center',
    color: 'black',
    fontFamily: 'IS_Reg',
    fontSize: 15,
    marginBottom: 5
  },
  recorderContainerStyle: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white'
  },
  recorderTimerStyle: {
    fontFamily: 'IS_Med',
    color: '#e74c3c',
    fontSize: 18
  },
  recorderRejectStyle: {
    fontFamily: 'IS_Reg',
    color: '#3a3a3a',
    fontSize: 13
  }
};
export default ItemCreate;
