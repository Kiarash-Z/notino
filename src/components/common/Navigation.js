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
            rightButtonDisabled,
            rightInfo,
            rightInfoColor = '#234960'
          } = this.props;
    const disabledColor = rightButtonDisabled ? '#90CAF9' : rightInfoColor;
    return (
      <View style={containerStyle}>
        <TouchableWithoutFeedback onPress={onLeftButtonPress}>
          <View style={infoStyle}>
            <Icon name={leftIcon} size={23} color="#234960" />
          </View>
        </TouchableWithoutFeedback>
        <View style={searchContainerStyle}>
          {children}
        </View>
        <TouchableWithoutFeedback onPress={onRightButtonPress} disabled={rightButtonDisabled}>
          <View style={infoStyle}>
              <Text style={[rightInfoTextStyle, { color: disabledColor }]}>{rightInfo}</Text>
              <Icon name={rightIcon} size={23} color="#234960" />
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
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  infoStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 17,
    paddingBottom: 17,
    paddingRight: 20,
    paddingLeft: 15,
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
