import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, FlatList } from 'react-native';
import Modal from 'react-native-simple-modal';
import { inject, observer } from 'mobx-react';
import { Icon } from '../../common';
import categoryDB from '../../../database/categoryDB';

@inject('itemStore')
@observer
class SelectCatModal extends Component {
  renderCategory({ item }) {
    const { type, color, icon } = item;
    return (
      <TouchableNativeFeedback
        onPress={() => {
        this.props.itemStore.category = type;
        this.props.itemStore.showSelectCatModal = false;
       }}
      >
        <View style={styles.catContainerStyle}>
          <Text style={styles.catTitleStyle}>{type}</Text>
          <Icon name={icon} color={color} size={20} />
        </View>
      </TouchableNativeFeedback>
    );
  }
  render() {
    const { itemStore } = this.props;
    return (
      <Modal
        open={itemStore.showSelectCatModal}
        modalDidClose={() => { itemStore.showSelectCatModal = false; }}
      >
        <FlatList
          data={categoryDB.objects('Category').slice(2, categoryDB.objects('Category').length)}
          renderItem={this.renderCategory.bind(this)}
          keyExtractor={cat => cat.id}
        />
      </Modal>
    );
  }
}

const styles = {
  catContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 10,
    paddingBottom: 10
  },
  catTitleStyle: {
    fontFamily: 'IS_Light',
    fontSize: 18,
    marginRight: 10
  }
};

export default SelectCatModal;
