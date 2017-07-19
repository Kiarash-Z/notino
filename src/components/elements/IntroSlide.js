import React, { Component } from 'react';
import { View, TouchableNativeFeedback, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from '../common';

class IntroSlide extends Component {
  render() {
    const { titleStyle,
            subTitleStyle,
            buttonStyle,
            buttonTextStyle,
            containerStyle } = styles;
    return (
        <View style={containerStyle}>
          {this.props.children}
          <Text style={titleStyle}>{this.props.mainTitle}</Text>
          <Text style={subTitleStyle}>{this.props.subTitle}</Text>
          <TouchableNativeFeedback onPress={() => Actions.category({ type: 'replace' })}>
            <View style={buttonStyle}>
              <Text style={buttonTextStyle}>شروع کنید به نوشتن</Text>
              <Icon name="edit" size={18} color="rgba(0,0,0, .5)" />
            </View>
          </TouchableNativeFeedback>
        </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    paddingTop: 35,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  titleStyle: {
    fontFamily: 'IS_Reg',
    color: '#3498db',
    textAlign: 'center',
    fontSize: 23,
    marginTop: 25,
  },
  subTitleStyle: {
    fontFamily: 'IS_Reg',
    color: 'rgba(0,0,0,.5)',
    textAlign: 'center',
    fontSize: 16,
    paddingRight: 55,
    paddingLeft: 55,
    marginTop: 20,
  },
  imageStyle: {
    width: Dimensions.get('window').width - 100,
    height: Dimensions.get('window').width - 100
  },
  buttonStyle: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width - 170,
    borderRadius: 3,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 80
  },
  buttonTextStyle: {
    fontFamily: 'IS_Reg',
    color: 'rgba(0,0,0,.5)',
    textAlign: 'center',
    fontSize: 17,
    marginRight: 10
  }
};

export default IntroSlide;
