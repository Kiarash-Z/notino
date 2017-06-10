import React, { Component } from 'react';
import { View } from 'react-native';

import { Icon } from '../common';

class ItemAddons extends Component {
    render() {
      const { containerStyle, circleStyle } = styles;
      return (
        <View style={containerStyle}>
          <Icon name="voice" size={21} color="#7b75f9" />
          <Icon name="makan" size={21} color="#7b75f9" />
          <View>
            <View style={circleStyle} />
            <Icon name="alarm" size={21} color="#7b75f9" />
          </View>

          <Icon name="link" size={21} color="#7b75f9" />
        </View>
      );
    }
}

const styles = {
  containerStyle: {
    flex: 0.08,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  circleStyle: {
    backgroundColor: '#e02420',
    position: 'absolute',
    right: 2,
    zIndex: 1,
    top: 0,
    width: 7,
    height: 7,
    borderRadius: 7
  }
};

export default ItemAddons;
