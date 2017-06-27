import React, { Component } from 'react';
import { View,
        CameraRoll,
        TouchableNativeFeedback,
        TimePickerAndroid,
        LayoutAnimation,
        UIManager,
        DatePickerAndroid } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { inject, observer } from 'mobx-react';
import { Icon } from '../common';

PushNotification.configure({
  onNotification(notification) {
        console.log('NOTIFICATION:', notification);
    }
});
@inject('itemStore')
@observer
class ItemAddons extends Component {
    constructor(props) {
      super(props);
      this.addImage = this.addImage.bind(this);
      this.state = {
        alarmSetted: false
      };
      this.handleAlarm = this.handleAlarm.bind(this);
      UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    addImage() {
      const { itemStore } = this.props;
      CameraRoll.getPhotos({
        first: 25,
        assetType: 'All'
      })
      .then(r => {
        const organizeImages = () => {
          const organized = [];
          r.edges.map(pic => {
            organized.push({
              type: 'image',
              uri: pic.node.image.uri,
              width: pic.node.image.width,
              height: pic.node.image.height
            });
          });
          return organized;
        };
        LayoutAnimation.easeInEaseOut();
        itemStore.updateValue({ prop: 'galleryImages', value: organizeImages() });
        itemStore.updateValue({
          prop: 'showGallerySelector',
          value: !itemStore.showGallerySelector
         });
      });
    }
    handleAlarm() {
      if (!this.state.alarmSetted) {
        DatePickerAndroid.open().then(({ action, year, month, day }) => {
          if (action === 'dateSetAction') {
            TimePickerAndroid.open().then(({ action, hour, minute }) => {
              if (action === 'timeSetAction') {
                PushNotification.localNotificationSchedule({
                  title: 'Test title',
                  message: 'test message goes here',
                  id: '0',
                  date: new Date(year, month, day, hour, minute)
                });
                this.setState({
                  alarmSetted: true
                });
              }
            });
          }
        });
      } else {
        PushNotification.cancelLocalNotifications({ id: '0' });
        this.setState({
          alarmSetted: false
        });
      }
    }

    render() {
      const { containerStyle, circleStyle, touchableStyle } = styles;
      const renderAlarmIcon = () => {
        if (this.state.alarmSetted) {
          return (
            <View>
              <View style={circleStyle} />
              <Icon name="alarm" size={21} color="#7b75f9" />
            </View>
          );
        }
        return (
          <View>
            <Icon name="alarm" size={21} color="#7b75f9" />
          </View>
        );
      };
      return (
        <View style={containerStyle}>
              <TouchableNativeFeedback
                onPressIn={this.props.startRecordingVoice}
                onPressOut={this.props.saveVoice}
                background={TouchableNativeFeedback.SelectableBackground()}
              >
                <View style={touchableStyle}>
                    <Icon name="voice" size={21} color="#7b75f9" />
                </View>
              </TouchableNativeFeedback>

            <TouchableNativeFeedback
              onPress={this.props.addLocation}
            >
              <View style={touchableStyle}>
                  <Icon name="makan" size={21} color="#7b75f9" />
              </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback
              onPress={this.handleAlarm}
            >
              <View style={touchableStyle}>
                {renderAlarmIcon()}
              </View>

            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={this.addImage}
              underlayColor="rgba(0,0,0,.026)"
            >
              <View style={touchableStyle}>
                  <Icon name="link" size={21} color="#7b75f9" />
              </View>
            </TouchableNativeFeedback>
        </View>
      );
    }
}

const styles = {
  containerStyle: {
    paddingTop: 4,
    paddingBottom: 4,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopWidth: 0.8,
    borderTopColor: 'rgba(0,0,0,.08)',
    justifyContent: 'space-around'
  },
  circleStyle: {
    backgroundColor: '#e02420',
    position: 'absolute',
    right: 2,
    zIndex: 1,
    top: 0,
    width: 7,
    height: 7,
    borderRadius: 7
  },
  touchableStyle: {
    backgroundColor: 'white',
    padding: 11,
    alignItems: 'center'
  }
};

export default ItemAddons;
