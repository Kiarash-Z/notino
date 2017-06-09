import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from './common';

const CategoriesItem = ({ icon, iconColor, text }) => {
  const { textStyle, containerStyle } = styles;
  return (
    <View style={containerStyle}>
      <Icon name={icon} size={55} color={iconColor} />
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 50,
    paddingRight: 25,
    paddingLeft: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,.1)'
  },
  textStyle: {
    fontSize: 25,
    fontFamily: 'IS_Reg',
    marginTop: 5
  }
};

export default CategoriesItem;
