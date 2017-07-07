import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import Modal from 'react-native-simple-modal';
import { inject, observer } from 'mobx-react';
import { Icon } from '../../common';

@inject('itemStore')
@observer
class ReminderModal extends Component {
  render() {
    const { itemStore } = this.props;
    const { reminderContainerStyle,
            choiceContainerStyle,
            choiceStyle,
            titleContainerStyle,
            titleStyle } = styles;
    return (
      <Modal
        open={itemStore.showReminderModal}
        modalDidClose={() => { itemStore.showReminderModal = false; }}
      >
        <View stlye={reminderContainerStyle}>
          <View style={titleContainerStyle}>
            <Text style={titleStyle}>زمان تکرار</Text>
            <Icon name="date" color='#7b75f9' size={21} />
          </View>
          <View>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.SelectableBackground()}
              onPress={() => itemStore.addReminder(false)}
            >
                <View style={choiceContainerStyle}>
                  <Text style={choiceStyle}>نمیخوام تکرار شه.</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.SelectableBackground()}
                onPress={() => itemStore.addReminder(true, 'day')}
              >
                  <View style={choiceContainerStyle}>
                    <Text style={choiceStyle}>تکرار روزانه</Text>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.SelectableBackground()}
                  onPress={() => itemStore.addReminder(true, 'week')}
                >
                    <View style={choiceContainerStyle}>
                      <Text style={choiceStyle}>تکرار هفتگی</Text>
                    </View>
                  </TouchableNativeFeedback>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = {
  reminderContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    fontFamily: 'IS_Bold',
    fontSize: 18,
    alignSelf: 'center',
    marginRight: 10,
    color: '#9e9af1'
  },
  choiceContainerStyle: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  choiceStyle: {
    fontFamily: 'IS_Reg',
    fontSize: 15
  }
};

export default ReminderModal;
