import React from 'react';
import { View, Text, Dimensions, TouchableNativeFeedback } from 'react-native';
import { Icon } from '../common';

const CategoriesItem = ({ icon, iconColor, text, onPress, style, onLongPress }) => {
  const { textStyle, containerStyle } = styles;
  return (
    <TouchableNativeFeedback onPress={onPress} onLongPress={onLongPress}>
      <View style={[containerStyle, style]}>
        <Icon name={icon} size={40} color={iconColor} />
        <Text style={textStyle}>{text}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = {
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    paddingRight: 25,
    paddingLeft: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,.1)',
    width: (Dimensions.get('window').width / 2)
  },
  textStyle: {
    fontSize: 23,
    fontFamily: 'IS_Reg',
    textAlign: 'center',
    marginTop: 5
  }
};

export default CategoriesItem;
