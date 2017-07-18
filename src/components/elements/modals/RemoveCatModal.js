import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import Modal from 'react-native-simple-modal';
import { inject, observer } from 'mobx-react';

@inject('categoryStore')
@observer
class RemoveCatModal extends Component {
  render() {
    const { categoryStore } = this.props;
    const { removeModalStyle,
            removeModalChoiceStyle,
            removeModalQuesStyle,
            removeModalTextContainerStyle } = styles;
    return (
      <Modal
        open={categoryStore.showCatRemoveModal}
        modalDidClose={() => { categoryStore.showCatRemoveModal = false; }}
        modalStyle={removeModalStyle}
      >
        <Text style={removeModalQuesStyle}>
          آیا از حذف این دسته بندی و آیتم های اون اطمینان دارید؟
        </Text>
        <View style={removeModalTextContainerStyle}>
          <TouchableNativeFeedback
            onPress={() => setTimeout(() => { categoryStore.showCatRemoveModal = false; }, 100)}
          >
            <View>
              <Text style={removeModalChoiceStyle}>خیر</Text>
            </View>
            </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => {
            // just a delay for button interaction
            setTimeout(() => {
                categoryStore.removeCategory();
              }, 100);
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

export default RemoveCatModal;
