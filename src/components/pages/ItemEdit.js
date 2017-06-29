import React, { Component } from 'react';
import { View,
        Image,
        TouchableHighlight,
        FlatList, ScrollView,
        Animated,
        Text,
        StyleSheet,
        TouchableWithoutFeedback,
        TouchableNativeFeedback } from 'react-native';

import { inject, observer } from 'mobx-react';
import { BoxShadow } from 'react-native-shadow';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-simple-modal';
import { Actions } from 'react-native-router-flux';
import { Navigation, Icon } from '../common';
import ItemAddons from '../elements/ItemAddons';
import categoryDB from '../../database/categoryDB';
import ItemForm from '../elements/ItemForm';
import BottomContainer from '../elements/BottomContainer';

@inject('itemStore')
@observer
class ItemCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsToBeRendered: [],
      images: [],
      showGallerySelector: false,
      showImageModal: false,
      openedImage: { node: { image: { uri: ' ', width: 0, height: 0 } } },
      marker: { coordinate: { latitude: 35.6892, longitude: 51.3890 } },
      showMapModal: false,
      timelineWidth: 0,
      playingVoice: '',
      showRemoveModal: false,
      itemRemoveType: '',
      itemRemove: null,
      imageModalWidth: 0
    };
    // bindings
    this.renderAllItems = this.renderAllItems.bind(this);
    this.openImageModal = this.openImageModal.bind(this);
    this.handleMapPress = this.handleMapPress.bind(this);
    this.addMapToList = this.addMapToList.bind(this);
    this.removeMap = this.removeMap.bind(this);
    this.playAndPauseVoice = this.playAndPauseVoice.bind(this);
    this.getVoiceLayout = this.getVoiceLayout.bind(this);
    this.progressTimeline = this.progressTimeline.bind(this);
    this.removeModal = this.removeModal.bind(this);
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          marker: {
            coordinate: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          }
        });
      },
      (err) => console.log('could not get location', err),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
}
componentWillMount() {
  const { item, itemStore } = this.props;
  const deepClone = JSON.parse(JSON.stringify(item));
  const properties = Object.keys(deepClone);
  properties.forEach(property => {
    // convert to arr
    if (property === 'images' || property === 'voices' || property === 'fileTypes' || property === 'marker') {
      const arr = [];
      Object.keys(deepClone[property]).forEach(key => {
        arr.push(deepClone[property][key]);
        itemStore.updateValue({ prop: property, value: arr });
      });
    } else {
      itemStore.updateValue({ prop: property, value: deepClone[property] });
    }
  });
}

  itemsKeyExtractor(item) {
    switch (item.type) {
      case 'image':
        return item.node.image.uri;
      case 'map':
        return item.coordinate.longitude + item.coordinate.latitude;
      case 'voice':
        return item.id;
    }
  }
  // this func will expand image in modal

  openImageModal(image) {
      this.setState({ showImageModal: true, openedImage: image });
  }
  // this func will remove image

  // this will show up images section on icon press
  removeMap() {
    const updatedState = this.state.itemsToBeRendered.filter((item) => {
      return item.type !== 'map';
    });
    this.setState({
      itemsToBeRendered: updatedState
    });
  }

  handleMapPress(e) {
    this.setState({
      marker: {
        coordinate: e.nativeEvent.coordinate
      }
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
    } else {
      this.setState({
        showMapModal: false,
        itemsToBeRendered: [...this.state.itemsToBeRendered, {
          ...this.state.marker,
          type: 'map'
        }]
      });
    }
  }


  // this will render all items such as voice location alarm and images

  playAndPauseVoice(duration, id) {
    const selectedVoice = this.state.itemsToBeRendered.filter(item => {
      return item.id === id;
    })[0];
    const updatedState = (nextStatus, currentStatus) => {
      return this.state.itemsToBeRendered.map((item) => {
        if (item.id === id) {
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
      this.setState({ itemsToBeRendered: updatedState('started', 'stopped') });
      selectedVoice.sound.getCurrentTime(seconds => {
        Animated.sequence([
          Animated.timing(selectedVoice.playingVoiceTime, {
            duration: (duration - seconds) * 1000,
            toValue: 1,
            Easing: 'linear'
          }),
          Animated.timing(selectedVoice.playingVoiceTime, {
            duration: 0,
            toValue: 0
          })
        ]).start(() => {
          this.setState({
            itemsToBeRendered: updatedState('stopped', 'started')
          });
        });
      });
    } else {
      this.setState({ itemsToBeRendered: updatedState('paused', 'started') });
    }
  }

  getVoiceLayout(e) {
    this.setState({
      timelineWidth: e.nativeEvent.layout.width
  });
  }
  progressTimeline(playingVoiceTime) {
        const width = playingVoiceTime.interpolate({
          inputRange: [0, 1],
          outputRange: [0, this.state.timelineWidth]
        });
        return {
          width
        };
    }
    removeModal() {
      const item = this.state.itemRemove;
        switch (item.type) {
          case 'voice':
          this.removeVoice(item.id);
          break;
          case 'image':
          this.removeImage(item.node.image.uri);
          break;
          case 'map':
          this.removeMap();
          break;
        }
        this.setState({
          showRemoveModal: false
        });
    }
  renderAllItems({ item }) {
    switch (item.type) {
      case 'image':
        return (

              <View>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple('#c5c5c5')}
                  onPress={() => this.openImageModal(item)}
                  delayPress={200}
                  onLongPress={() => {
                      this.setState({
                        itemRemove: item,
                        itemRemoveType: 'عکس',
                        showRemoveModal: true
                      });
                  }}
                >
                <View style={styles.filterContainerStyle}>
                  <View style={styles.blackFilterStyle} />
                  <Icon name="picture" size={27} color="white" />
                </View>
                </TouchableNativeFeedback>
                <Image
                  style={styles.imageStyle}
                  source={{ uri: item.node.image.uri }}
                />
              </View>

          );
        case 'map': {
          return (
            <View style={{ flex: 1, height: 70 }}>
              <MapView
                style={{
                  ...StyleSheet.absoluteFillObject,
                }}
                onLongPress={() => {
                  this.setState({
                    itemRemove: item,
                    itemRemoveType: 'مکان',
                    showRemoveModal: true
                  });
                }}
                onPress={() => this.setState({ showMapModal: true })}
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
          case 'voice': {
            const playOrPause = () => {
              if (item.status !== 'started') {
                return <Icon style={{ padding: 5 }} name='play' size={18} color='#7b75f9' />;
              }
              return <Icon style={{ padding: 5 }} name='pause' size={18} color='#7b75f9' />;
            };
            return (
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.SelectableBackground()}
                onLongPress={() => {
                this.setState({
                  itemRemove: item,
                  itemRemoveType: 'ویس',
                  showRemoveModal: true
                });
              }}
              >
                <View style={styles.voiceContainerStyle}>
                  <TouchableHighlight
                    onPress={() => this.playAndPauseVoice(item.duration, item.id)}
                    underlayColor="rgba(0,0,0,0.018)"
                  >
                      {playOrPause()}
                    </TouchableHighlight>
                    <View style={styles.voiceTimelineContainerStyle} onLayout={this.getVoiceLayout}>
                      <Animated.View
                        style={[
                          styles.voiceBgFill,
                          this.progressTimeline(item.playingVoiceTime),
                         ]}
                      />
                      <View style={styles.voiceTimelineBackground} />
                    </View>
                  </View>
              </TouchableNativeFeedback>
            );
          }
          default:
          return false;
        }
      }
  render() {
    const { selectingImageContainer,
            openedImageStyle,
            imageModalStyle,
            markerStyle,
            mapModalStyle,
            recorderContainerStyle,
            recorderTimerStyle,
            bottomContainerStyle,
            mapModalTextStyle,
            mapModalTitleStyle,
            removeModalStyle,
            removeModalChoiceStyle,
            removeModalQuesStyle,
            removeModalTextContainerStyle,
            imageModalTextStyle } = styles;

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

    const imageModalHeight = () => {
      const width = openedImage.width;
      const height = openedImage.height;
      if ((width / height) <= 1.3) {
        return 380;
      } else if ((height / width) >= 1.3) {
        return 250;
      }
      return this.state.imageModalWidth;
    };
    return (
      <View style={{ flex: 1 }}>

        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Navigation
              rightInfo="ذخیره"
              rightInfoColor="#0288eb"
              leftIcon="back"
              onLeftButtonPress={() => Actions.pop()}
            />
          <ScrollView>
            <ItemForm item={this.props.item} />
            <FlatList
                data={this.state.itemsToBeRendered}
                renderItem={this.renderAllItems}
                keyExtractor={this.itemsKeyExtractor}
                style={{ backgroundColor: 'white' }}
            />
          </ScrollView>
          <BottomContainer />
          <ItemAddons />
        </View>
        <Modal
          open={this.state.showRemoveModal}
          modalDidClose={() => this.setState({ showRemoveModal: false })}
          modalStyle={removeModalStyle}
        >
          <Text style={removeModalQuesStyle}>
            آیا میخواید این {this.state.itemRemoveType} رو حذف کنید؟
          </Text>
          <View style={removeModalTextContainerStyle}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.SelectableBackground()}
              onPress={() => setTimeout(() => this.setState({ showRemoveModal: false }), 200)}
            >
              <View>
                <Text style={removeModalChoiceStyle}>خیر</Text>
              </View>
              </TouchableNativeFeedback>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.SelectableBackground()}
              onPress={() => {
                setTimeout(() => {
                  this.removeModal();
                }, 200);
              }}
            >
              <View>
                <Text style={removeModalChoiceStyle}>بله</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </Modal>
        <Modal
          open={this.state.showImageModal}
          modalDidClose={() => this.setState({ showImageModal: false })}
          modalStyle={[imageModalStyle, { height: imageModalHeight() }]}
        >
          <View
            style={{ flex: 1 }}
            onLayout={e => this.setState({ imageModalWidth: e.nativeEvent.layout.width })}
          >
            <Image
              style={openedImageStyle}
              source={{ uri: openedImage.uri }}
            />
          </View>
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

  imageStyle: {
    flex: 1,
    height: 70,
    resizeMode: 'cover'
  },
  openedImageStyle: {
    flex: 1,
    marginBottom: 10,
    resizeMode: 'stretch'
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
    zIndex: 2,
  },
  imageModalStyle: {
    paddingTop: 0,
    paddingRight: 35,
    paddingLeft: 35,
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

  voiceContainerStyle: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
    flexDirection: 'row'
  },
  voiceTimelineContainerStyle: {
    position: 'relative',
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  voiceBgFill: {
    position: 'absolute',
    right: 0,
    left: 0,
    height: 3,
    zIndex: 1,
    backgroundColor: '#31556b'
  },
  voiceTimelineBackground: {
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#bdc8ce'
  },
  removeModalStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  removeModalQuesStyle: {
    fontFamily: 'IS_Med',
    fontSize: 17
  },
  removeModalTextContainerStyle: {
    flexDirection: 'row',
    paddingTop: 20
  },
  removeModalChoiceStyle: {
    fontSize: 18,
    fontFamily: 'IS_Reg',
    color: '#218ffe',
    marginRight: 40,
    marginLeft: 40,
    borderRadius: 8
  }
};
export default ItemCreate;
