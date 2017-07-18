import React, { Component } from 'react';
import { View,
         Text,
         TouchableNativeFeedback,
         FlatList,
         TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-simple-modal';
import { inject, observer } from 'mobx-react';
import { Input, Icon } from '../../common';

@inject('categoryStore')
@observer
class CreateCatModal extends Component {
  renderIcon({ item }) {
    const { categoryStore } = this.props;
    if (item === categoryStore.activeIcon) {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
          categoryStore.activeIcon = item;
          categoryStore.icons = ['musiqi',
           'film', 'coins', 'telly', 'idea', 'edit', 'mazhabi', 'motalee'];
        }}
        >
          <View style={[styles.iconStyle, { borderWidth: 0.7, borderColor: '#0287ee' }]}>
            <Icon name={item} size={18} />
          </View>
        </TouchableWithoutFeedback>
      );
    }
    return (
      <TouchableWithoutFeedback
        onPress={() => {
        categoryStore.activeIcon = item;
        categoryStore.icons = ['musiqi',
         'film', 'coins', 'telly', 'idea', 'edit', 'mazhabi', 'motalee'];
      }}
      >
        <View style={styles.iconStyle}>
          <Icon name={item} size={18} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
  renderColor({ item }) {
    const { categoryStore } = this.props;
    if (item === categoryStore.activeColor) {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
          categoryStore.activeColor = item;
          categoryStore.colors = ['#329ff4', '#e95666', '#66BB6A', '#e67e22', '#f1c40f', '#34495e'];
        }}
        >
          <View>
            <View style={[styles.colorStyle, { backgroundColor: item }]} />
            <View style={styles.lineStyle} />
          </View>
        </TouchableWithoutFeedback>
      );
    }
    return (
      <TouchableWithoutFeedback
        onPress={() => {
        categoryStore.activeColor = item;
        categoryStore.colors = ['#329ff4', '#e95666', '#66BB6A', '#e67e22', '#f1c40f', '#34495e'];
      }}
      >
        <View style={[styles.colorStyle, { backgroundColor: item }]} />
      </TouchableWithoutFeedback>
    );
  }
  render() {
    const { categoryStore } = this.props;
    const { titleStyle,
            subtitleStyle,
            buttonTextStyle,
            iconContainerStyle } = styles;
    let buttonDisabled = true;
    let buttonColor = '#90CAF9';
    if (categoryStore.createCatName.length > 0) {
      buttonDisabled = false;
      buttonColor = '#218ffe';
    }
    return (
      <Modal
        open={categoryStore.showCreateModal}
        modalDidClose={() => categoryStore.resetCreateValues()}
      >
        <Text style={titleStyle}>
          ایجاد دسته بندی
        </Text>
        <View style={{ marginBottom: 20 }}>
          <Input
            placeholder="نام دسته بندی"
            maxLength={15}
            size={16}
            align='center'
            style={{ marginTop: 10 }}
            onChangeText={text => { categoryStore.createCatName = text; }}
          />
          <Text style={subtitleStyle}>آیکون</Text>
          <View style={iconContainerStyle}>
            <FlatList
              data={categoryStore.icons.slice(0, 4)}
              contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
              renderItem={this.renderIcon.bind(this)}
              keyExtractor={item => item}
              horizontal
            />
          </View>
          <View style={iconContainerStyle}>
            <FlatList
              data={categoryStore.icons.slice(4, categoryStore.icons.length)}
              contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
              renderItem={this.renderIcon.bind(this)}
              keyExtractor={item => item}
              horizontal
            />
          </View>
          <Text style={subtitleStyle}>رنگ</Text>
          <FlatList
            data={categoryStore.colors}
            contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
            renderItem={this.renderColor.bind(this)}
            keyExtractor={item => item}
            horizontal
          />
        </View>
        <TouchableNativeFeedback
          onPress={() => categoryStore.createCategory()}
          disabled={buttonDisabled}
        >
          <View>
            <Text style={[buttonTextStyle, { color: buttonColor }]}>درستش کن!</Text>
          </View>
        </TouchableNativeFeedback>
      </Modal>
    );
  }
}

const styles = {
  titleStyle: {
    fontFamily: 'IS_Med',
    fontSize: 17,
    textAlign: 'center'
  },
  subtitleStyle: {
    fontFamily: 'IS_Reg',
    fontSize: 15,
    textAlign: 'right',
    paddingRight: 5
  },
  iconStyle: {
    padding: 15,
    borderWidth: 0.7,
    borderColor: '#f5f5f5'
  },
  colorStyle: {
    padding: 15,
    borderWidth: 0.7,
    borderColor: '#f5f5f5',
    borderRadius: 3,
    marginRight: 10
  },
  iconContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lineStyle: {
    width: 31.4,
    height: 1.5,
    backgroundColor: '#95a5a6',
    marginTop: 10
  },
  buttonTextStyle: {
    fontSize: 16,
    fontFamily: 'IS_Reg',
    textAlign: 'center',
    padding: 10
  }
};

export default CreateCatModal;
