import React from 'react';
import { View } from 'react-native';

const ItemSection = ({ children, style }) => {
  return (
    <View style={[styles.containerStyle, style]}>
      {children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,.1)',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10
  }
};

export { ItemSection };
