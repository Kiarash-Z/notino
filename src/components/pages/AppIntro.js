import React, { Component } from 'react';
import { View, TouchableNativeFeedback, Text, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import SplashScreen from 'react-native-splash-screen';
import { Actions } from 'react-native-router-flux';
import IntroSlide from '../elements/IntroSlide';
import { Icon } from '../common';

class AppIntro extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    const { imageStyle,
            logoTextStyle,
            buttonTextStyle,
            buttonStyle,
            lastSlideStyle,
            activeDotStyle,
            logoStyle,
          } = styles;
    return (
      <Swiper
        loop={false}
        activeDotStyle={activeDotStyle}
        dotStyle={{ marginBottom: 30 }}
      >
        <IntroSlide
          mainTitle='ساده و راحت'
          subTitle='با نوتینو به سادگی بنویسید و ذخیره کنید و انجام بدید!'
        >
          <Image source={require('../../assets/images/notebook.png')} style={imageStyle} />
        </IntroSlide>
        <IntroSlide
          mainTitle='یادداشت کامل'
          subTitle='به یادداشت های خودتون عکس، ویس، مکان و نوتیفیکیشن اضافه کنید.'
        >
          <Image source={require('../../assets/images/types.png')} style={imageStyle} />
        </IntroSlide>
        <IntroSlide
          mainTitle='دسته بندی های مختلف'
          subTitle='یادداشت هاتون رو تو دسته بندی های مختلف بذارید تا راحت مدیریتشون کنید.'
        >
          <Image source={require('../../assets/images/categories.png')} style={imageStyle} />
        </IntroSlide>
        <View style={lastSlideStyle}>
          <Image source={require('../../assets/images/logo.png')} style={logoStyle} />
          <Text style={logoTextStyle}>با نوتینو بروز بنویس :)</Text>
          <View style={{ justifyContent: 'flex-end', flex: 1 }}>
            <TouchableNativeFeedback onPress={() => Actions.itemCreate({ type: 'replace' })}>
              <View style={buttonStyle}>
                <Text style={buttonTextStyle}>شروع کنید به نوشتن</Text>
                <Icon name="edit" size={18} color="rgba(0,0,0, .5)" />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </Swiper>
    );
  }
}

const styles = {
  imageStyle: {
    width: Dimensions.get('window').width - 100,
    height: Dimensions.get('window').width - 100
  },
  activeDotStyle: {
    marginBottom: 30,
    backgroundColor: '#3498db',
    width: 10,
    height: 10,
    borderRadius: 10
  },
  logoStyle: {
    width: Dimensions.get('window').width - 220,
    height: (Dimensions.get('window').width - 220) / 3.855
  },
  lastSlideStyle: {
     alignItems: 'center',
     paddingTop: 35,
     paddingBottom: 115,
     flex: 1,
     backgroundColor: 'white'
  },
  buttonStyle: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width - 170,
    borderRadius: 3,
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonTextStyle: {
    fontFamily: 'IS_Reg',
    color: 'rgba(0,0,0,.5)',
    textAlign: 'center',
    fontSize: 17,
    marginRight: 10
  },
  logoTextStyle: {
    fontFamily: 'IS_Reg',
    color: 'rgba(0,0,0,.5)',
    textAlign: 'center',
    fontSize: 21,
    marginTop: 25,
  },
};

export default AppIntro;
