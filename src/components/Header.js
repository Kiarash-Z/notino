import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Input, Icon } from './common';

class Header extends Component {
  render() {
    const { containerStyle, subTitle, titleContainerStyle } = styles;
    return (
      <View style={containerStyle}>
        <View style={titleContainerStyle}>
            <Input
              align="center"
              size={35}
              value={'ورزشی'}
              placeholder="تیتر موضوع رو بنویسد"
            />
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
    justifyContent: 'center'
  },
  subTitle: {
    fontFamily: 'IS_Reg',
    textAlign: 'center',
    fontSize: 14
  }
};

export default Header;
