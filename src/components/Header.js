import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Input } from './common/Input';

class Header extends Component {
  render() {
    const { containerStyle, subTitle } = styles;
    return (
      <View style={containerStyle}>
        <Input
          align="center"
          size={30}
          placeholder="تیتر موضوع رو بنویسد"
        />
        <Text style={subTitle}>لیست یادداشت های من</Text>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    paddingTop: 35,
    paddingBottom: 35
  },
  subTitle: {
    fontFamily: 'IS_Reg',
    textAlign: 'center',
    fontSize: 14
  }
};

export default Header;
