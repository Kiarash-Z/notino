import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import Modal from 'react-native-simple-modal';
import { inject, observer } from 'mobx-react';

@inject('itemStore')
@observer
class RemoveModal extends Component {
  render() {
    const { itemStore } = this.props;
    const { removeModalStyle,
            removeModalChoiceStyle,
            removeModalQuesStyle,
            removeModalTextContainerStyle } = styles;
    return (
      <Modal
        open={itemStore.showRemoveModal}
        modalDidClose={() => { itemStore.showRemoveModal = false; }}
        modalStyle={removeModalStyle}
      >
        <Text style={removeModalQuesStyle}>
          آیا میخواید این {itemStore.itemRemoveType} رو حذف کنید؟
        </Text>
        <View style={removeModalTextContainerStyle}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackground()}
            onPress={() => setTimeout(() => { itemStore.showRemoveModal = false; }, 200)}
          >
            <View>
              <Text style={removeModalChoiceStyle}>خیر</Text>
            </View>
            </TouchableNativeFeedback>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackground()}
            onPress={() => {
            setTimeout(() => {
                itemStore.removeItem();
              }, 200);
            }}
          >
            <View>
              <Text style={removeModalChoiceStyle}>بله</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </Modal>
    );
  }
}

const styles = {
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

export default RemoveModal;
