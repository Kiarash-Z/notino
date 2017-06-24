import React, { Component } from 'react';
import { View, CameraRoll, TouchableNativeFeedback } from 'react-native';
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
              <TouchableNativeFeedback
                onPressIn={this.props.startRecordingVoice}
                onPressOut={this.props.saveVoice}
                background={TouchableNativeFeedback.SelectableBackground()}
              >
                <View style={touchableStyle}>
                    <Icon name="voice" size={21} color="#7b75f9" />
                </View>
              </TouchableNativeFeedback>

            <TouchableNativeFeedback
              onPress={this.props.addLocation}
              underlayColor="rgba(0,0,0,.026)"
            >
              <View style={touchableStyle}>
                  <Icon name="makan" size={21} color="#7b75f9" />
              </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback
              onPress={() => true}
              underlayColor="rgba(0,0,0,.026)"
            >
              <View style={touchableStyle}>
                <View>
                  <View style={circleStyle} />
                  <Icon name="alarm" size={21} color="#7b75f9" />
                </View>
              </View>

            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={this.addImage}
              underlayColor="rgba(0,0,0,.026)"
            >
              <View style={touchableStyle}>
                  <Icon name="link" size={21} color="#7b75f9" />
              </View>
            </TouchableNativeFeedback>
        </View>
      );
    }
}

const styles = {
  containerStyle: {
    paddingTop: 4,
    paddingBottom: 4,
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
    backgroundColor: 'white',
    padding: 11,
    alignItems: 'center'
  }
};

export default ItemAddons;
