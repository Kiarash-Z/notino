import React from 'react';
import { TextInput } from 'react-native';

const Input = ({
  placeholder,
   value, size, align, onChangeText, maxLength, style, multiline, numberOfLines, onChange }) => {
  return (
    <TextInput
      style={[styles.inputStyle, { fontSize: size, textAlign: align }, style]}
      underlineColorAndroid="transparent"
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor='rgba(0,0,0,.3)'
      maxLength={maxLength}
      autoCorrect={false}
      multiline={multiline}
      numberOfLines={numberOfLines}
      onChange={onChange}
    />
  );
};

const styles = {
  inputStyle: {
    textAlign: 'left',
    fontFamily: 'IS_Light',
    fontSize: 25,
    textAlignVertical: 'top'
  }
};

export { Input };
