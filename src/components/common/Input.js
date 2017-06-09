import React from 'react';
import { TextInput } from 'react-native';

const Input = ({ placeholder, value, flex, size, align, onChangeText }) => {
  return (
    <TextInput
      style={[styles.inputStyle, { fontSize: size, textAlign: align }]}
      underlineColorAndroid="transparent"
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
};

const styles = {
  inputStyle: {
    textAlign: 'left',
    fontFamily: 'IS_Med',
    fontSize: 25
  }
};

export { Input };
