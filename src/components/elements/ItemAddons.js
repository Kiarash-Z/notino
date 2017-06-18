import React, { Component } from 'react';
import { View, CameraRoll, TouchableWithoutFeedback } from 'react-native';

import { Icon } from '../common';

class ItemAddons extends Component {
    constructor(props) {
      super(props);
      this.addImage = this.addImage.bind(this);
    }
    addImage() {
      CameraRoll.getPhotos({
        first: 25,
        assetType: 'All'
      })
      .then(r => {
        this.props.addImage(r.edges);
      });
    }
    render() {
      const { containerStyle, circleStyle } = styles;
      return (
        <View style={containerStyle}>
              <TouchableWithoutFeedback
                onPressIn={this.props.startRecordingVoice}
                onPressOut={this.props.saveVoice}
                pressRetentionOffset={{ top: 1300, right: 1300, left: 510, bottom: 1100 }}
              >
                <Icon name="voice" size={21} color="#7b75f9" />
              </TouchableWithoutFeedback>
          <Icon name="makan" onPress={this.props.addLocation} size={21} color="#7b75f9" />
          <View>
            <View style={circleStyle} />
              <Icon name="alarm" size={21} color="#7b75f9" />
            </View>
          <Icon onPress={this.addImage} name="link" size={21} color="#7b75f9" />
        </View>
      );
    }
}

const styles = {
  containerStyle: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0.8,
    borderTopColor: 'rgba(0,0,0,.08)'
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
