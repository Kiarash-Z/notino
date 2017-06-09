import React from 'react';
import { TextInput } from 'react-native';

const Input = (props) => {
  return (
    <TextInput
      style={[styles.titleStyle, { fontSize: props.size, textAlign: props.align }]}
      underlineColorAndroid="transparent"
      placeholder={props.placeholder}
    />
  );
};

const styles = {
  inputStyle: {
    fontSize: 15,
    textAlign: 'left',
    fontFamily: 'IS_Med'
  }
};

export { Input };
