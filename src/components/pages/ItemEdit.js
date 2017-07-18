import React, { Component } from 'react';
import { View,
        Image,
        TouchableHighlight,
        FlatList, ScrollView,
        Animated,
        StyleSheet,
        TouchableNativeFeedback } from 'react-native';
import { inject, observer } from 'mobx-react';
import { BoxShadow } from 'react-native-shadow';
import MapView, { Marker } from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import Sound from 'react-native-sound';
import { AudioUtils } from 'react-native-audio';
import { Navigation, Icon } from '../common';
import ItemAddons from '../elements/ItemAddons';
import ItemForm from '../elements/ItemForm';
import BottomContainer from '../elements/BottomContainer';
import RemoveModal from '../elements/modals/RemoveModal';
import ImageModal from '../elements/modals/ImageModal';
import MapModal from '../elements/modals/MapModal';
import ReminderModal from '../elements/modals/ReminderModal';

@inject('itemStore', 'itemImageStore', 'itemVoiceStore', 'itemLocationStore')
@observer
class ItemCreate extends Component {
  constructor(props) {
    super(props);
    this.renderAllItems = this.renderAllItems.bind(this);
  }
  componentWillMount() {
    const { item, itemStore, itemLocationStore } = this.props;
    const deepClone = JSON.parse(JSON.stringify(item));
    const properties = Object.keys(deepClone);
    properties.forEach(property => {
      // convert to arr
      if (property === 'images' ||
          property === 'voices' ||
          property === 'fileTypes') {
        const arr = [];
        Object.keys(deepClone[property]).forEach(key => {
          arr.push(deepClone[property][key]);
          itemStore.updateValue({ prop: property, value: arr });
        });
      } else if (property === 'reminderDate') {
        itemStore.reminderDate = JSON.parse(deepClone[property]);
      } else if (property === 'map') {
        itemStore.map = JSON.parse(deepClone[property]);
        itemLocationStore.marker = JSON.parse(deepClone[property]);
      } else {
        itemStore.updateValue({ prop: property, value: deepClone[property] });
      }
    });
    itemStore.voices = itemStore.voices.map(i => {
      i.playingVoiceTime = new Animated.Value(0);
      const path = `${AudioUtils.DocumentDirectoryPath}/voice${i.pathNum}.aac`;
      i.sound = new Sound(path, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log(error);
        }
      });
      return i;
    });
  }
  renderAllItems({ item }) {
    const { itemStore, itemImageStore, itemVoiceStore, itemLocationStore } = this.props;
    switch (item.type) {
      case 'image':
        return (
              <View>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple('#c5c5c5')}
                  onPress={() => itemImageStore.openImageModal(item)}
                  delayPress={200}
                  onLongPress={() => itemStore.removeItemModalData(item, 'عکس')}
                >
                <View style={styles.filterContainerStyle}>
                  <View style={styles.blackFilterStyle} />
                  <Icon name="picture" size={27} color="white" />
                </View>
                </TouchableNativeFeedback>
                <Image
                  style={styles.imageStyle}
                  source={{ uri: item.uri }}
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
                onLongPress={() => itemStore.removeItemModalData(item, 'مکان')}
                onPress={() => { itemLocationStore.showMapModal = true; }}
                initialRegion={{
                  latitude: itemLocationStore.marker.latitude + 0.001,
                  longitude: itemLocationStore.marker.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005
                }}
              >
                  <Marker
                    coordinate={{
                    latitude: itemStore.map.latitude,
                    longitude: itemStore.map.longitude
                  }}
                  >
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
                onLongPress={() => itemStore.removeItemModalData(item, 'ویس')}
              >
                <View style={styles.voiceContainerStyle}>
                  <TouchableHighlight
                    onPress={() => itemVoiceStore
                      .playAndPauseVoice(item.sound.getDuration(), item.timestamp)}
                    underlayColor="rgba(0,0,0,0.018)"
                  >
                      {playOrPause()}
                    </TouchableHighlight>
                    <View
                      style={styles.voiceTimelineContainerStyle}
                      onLayout={e => itemVoiceStore.getVoiceLayout(e)}
                    >
                      <Animated.View
                        style={[
                          styles.voiceBgFill,
                          itemVoiceStore.progressTimeline(item)
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
    const { itemStore } = this.props;
    const allItems = itemStore.images.concat(itemStore.voices, itemStore.map)
    .sort((a, b) => a.timestamp - b.timestamp);
    return (
      <View style={{ flex: 1 }}>

        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Navigation
              rightInfo="ذخیره"
              rightInfoColor="#0288eb"
              leftIcon="back"
              onLeftButtonPress={() => { itemStore.resetValues(); Actions.pop(); }}
              onRightButtonPress={() => itemStore.editItemFromDB()}
            />
          <ScrollView>
            <ItemForm item={this.props.item} />
            <FlatList
                data={allItems}
                renderItem={this.renderAllItems}
                keyExtractor={item => item.timestamp}
                style={{ backgroundColor: 'white' }}
            />
          </ScrollView>
          <BottomContainer />
          <ItemAddons />
        </View>
        <RemoveModal />
        <ImageModal />
        <MapModal />
        <ReminderModal />
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
  }
};
export default ItemCreate;
