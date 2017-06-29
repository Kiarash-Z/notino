import React from 'react';
import { TextInput } from 'react-native';

const Input = ({ placeholder, value, size, align, onChangeText, maxLength }) => {
  return (
    <TextInput
      style={[styles.inputStyle, { fontSize: size, textAlign: align }]}
      underlineColorAndroid="transparent"
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor='rgba(0,0,0,.3)'
      maxLength={maxLength}
    />
  );
};

const styles = {
  inputStyle: {
    textAlign: 'left',
    fontFamily: 'IS_Light',
    fontSize: 25
  }
};

export { Input };
