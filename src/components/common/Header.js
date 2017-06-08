import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

class Header extends Component {
  render() {
    const { titleStyle, containerStyle, subTitle } = styles;
    return (
      <View style={containerStyle}>
        <TextInput
          style={titleStyle}
          underlineColorAndroid="transparent"
          placeholder="تیتر موضوع خود را بنویسید"
        />
        <Text style={subTitle}>لیست یادداشت های من</Text>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    paddingTop: 70,
    paddingBottom: 70
  },
  titleStyle: {
    fontFamily: 'IS_Med',
    fontSize: 24,
    textAlign: 'center'
  },
  subTitle: {
    fontFamily: 'IS_Reg',
    textAlign: 'center',
    fontSize: 14
  }
};

export { Header };
