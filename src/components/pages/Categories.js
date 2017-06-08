import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from '../common/Header';
import { Navigation } from '../common'

class Categories extends Component {
  static navigatorStyle = {
      navBarHidden: true
  };
  render() {
    return (
        <View>
          <Navigation/>
          <Header />
        </View>
    );
  }
}

export default Categories;
