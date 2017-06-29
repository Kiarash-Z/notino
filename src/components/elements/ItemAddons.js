import React, { Component } from 'react';
import { View, TouchableNativeFeedback, UIManager } from 'react-native';
import { inject, observer } from 'mobx-react';
// import PushNotification from 'react-native-push-notification';
import { Icon } from '../common';

@inject('itemStore', 'itemImageStore', 'itemVoiceStore', 'itemLocationStore')
@observer
class ItemAddons extends Component {
    componentDidMount() {
      UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    render() {
      const { containerStyle, circleStyle, touchableStyle } = styles;
      const { itemStore, itemImageStore, itemVoiceStore, itemLocationStore } = this.props;
      // PushNotification.configure({
      //   onNotification(notification) {
      //         const clicked = notification.userInteraction;
      //         if (clicked) {
      //           itemStore.reminderSetted = false;
      //         }
      //     }
      // });
      const renderAlarm = () => {
        if (itemStore.reminderSetted) {
          return (
            <TouchableNativeFeedback
              onPress={() => { itemStore.addReminder(); }}
            >
              <View style={touchableStyle}>
                <View>
                  <View style={circleStyle} />
                  <Icon name="alarm" size={21} color="#7b75f9" />
                </View>
              </View>
            </TouchableNativeFeedback>
          );
        }
        return (
          <TouchableNativeFeedback
            onPress={() => { itemStore.showReminderModal = true; }}
          >
            <View style={touchableStyle}>
              <View>
                <Icon name="alarm" size={21} color="#7b75f9" />
              </View>
            </View>
          </TouchableNativeFeedback>
        );
      };
      return (
        <View style={containerStyle}>
              <TouchableNativeFeedback
                onPressIn={() => itemVoiceStore.startRecordingVoice()}
                onPressOut={() => itemVoiceStore.saveVoice()}
                background={TouchableNativeFeedback.SelectableBackground()}
              >
                <View style={touchableStyle}>
                    <Icon name="voice" size={21} color="#7b75f9" />
                </View>
              </TouchableNativeFeedback>

            <TouchableNativeFeedback
              onPress={() => itemLocationStore.addLocation()}
            >
              <View style={touchableStyle}>
                  <Icon name="makan" size={21} color="#7b75f9" />
              </View>
            </TouchableNativeFeedback>
                {renderAlarm()}
            <TouchableNativeFeedback
              onPress={() => itemImageStore.addImage()}
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
