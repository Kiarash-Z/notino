import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from '../common';

class Header extends Component {
  render() {
    const { containerStyle, titleStyle, subTitle, titleContainerStyle } = styles;
    return (
      <View style={containerStyle}>
        <View style={titleContainerStyle}>
          <Text style={titleStyle}>ورزشی</Text>
          <Icon name="varzeshi" size={35} color="#329ff4" />
        </View>
        <Text style={subTitle}>لیست یادداشت های من</Text>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    paddingTop: 35,
    paddingBottom: 35,
  },
  titleContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subTitle: {
    fontFamily: 'IS_Reg',
    textAlign: 'center',
    fontSize: 14
  },
  titleStyle: {
    fontSize: 40,
    color: 'rgba(0,0,0, .8)',
    fontFamily: 'IS_Reg'
  }
};

export default Header;
