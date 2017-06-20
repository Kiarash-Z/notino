import React, { Component } from 'react';
import { View, CameraRoll, TouchableHighlight } from 'react-native';

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
      const { containerStyle, circleStyle, touchableStyle } = styles;
      return (
        <View style={containerStyle}>
              <TouchableHighlight
                style={touchableStyle}
                onPressIn={this.props.startRecordingVoice}
                onPressOut={this.props.saveVoice}
                underlayColor="rgba(0,0,0,.018)"
                pressRetentionOffset={{ top: 1300, right: 1300, left: 510, bottom: 1100 }}
              >
                <Icon name="voice" size={21} color="#7b75f9" />
              </TouchableHighlight>

            <TouchableHighlight
              style={touchableStyle}
              onPress={this.props.addLocation}
              underlayColor="rgba(0,0,0,.018)"
            >
              <Icon name="makan" size={21} color="#7b75f9" />
            </TouchableHighlight>
            <TouchableHighlight
              style={touchableStyle}
              onPress={() => true}
              underlayColor="rgba(0,0,0,.018)"
            >
              <View>
                <View style={circleStyle} />
                <Icon name="alarm" size={21} color="#7b75f9" />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={touchableStyle}
              onPress={this.addImage}
              underlayColor="rgba(0,0,0,.018)"
            >
              <Icon name="link" size={21} color="#7b75f9" />
            </TouchableHighlight>
        </View>
      );
    }
}

const styles = {
  containerStyle: {
    paddingTop: 6,
    paddingBottom: 6,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopWidth: 0.8,
    borderTopColor: 'rgba(0,0,0,.08)',
    justifyContent: 'space-around'
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
  },
  touchableStyle: {
    padding: 9,
    borderRadius: 15,
    alignItems: 'center'
  }
};

export default ItemAddons;
