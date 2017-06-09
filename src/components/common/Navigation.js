import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from './index';

class Navigation extends Component {
  render() {
    const { containerStyle, searchContainerStyle, infoStyle, rightInfoTextStyle } = styles;
    const { onLeftButtonPress, onRightButtonPress, rightIcon, leftIcon, children, rightInfo } = this.props;
    return (
      <View style={containerStyle}>
        <View style={infoStyle}>
          <Icon name={leftIcon} size={25} onPress={onLeftButtonPress} color="#234960" />
        </View>
        <View style={searchContainerStyle}>
          {children}
        </View>
        <View style={infoStyle}>
          <Text style={rightInfoTextStyle}>{rightInfo}</Text>
          <Icon onPress={onRightButtonPress} name={rightIcon} size={25} color="#234960" />
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    paddingTop: 20,
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  infoStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightInfoTextStyle: {
    fontSize: 16,
    marginRight: 10,
    color: '#234960',
    fontFamily: 'IS_Reg'
  },
  searchContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  }
};

export { Navigation };
