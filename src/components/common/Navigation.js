import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Icon } from './index';

class Navigation extends Component {
  render() {
    const { containerStyle, searchContainerStyle, infoStyle, rightInfoTextStyle } = styles;
    const { onLeftButtonPress,
            onRightButtonPress,
            rightIcon,
            leftIcon,
            children,
            rightInfo,
            rightInfoColor = '#234960'
          } = this.props;
    return (
      <View style={containerStyle}>
        <TouchableWithoutFeedback onPress={onLeftButtonPress}>
          <View style={infoStyle}>
            <Icon name={leftIcon} size={25} color="#234960" />
          </View>
        </TouchableWithoutFeedback>
        <View style={searchContainerStyle}>
          {children}
        </View>
        <TouchableWithoutFeedback onPress={onRightButtonPress}>
          <View style={infoStyle}>
              <Text style={[rightInfoTextStyle, { color: rightInfoColor }]}>{rightInfo}</Text>
              <Icon name={rightIcon} size={25} color="#234960" />
          </View>
      </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 3,
    paddingLeft: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  infoStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12
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
