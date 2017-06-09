import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../Header';
import { Navigation } from '../common';

class Category extends Component {
  static navigatorStyle = {
      navBarHidden: true
  };
  render() {
    return (
        <View style={{ backgroundColor: 'white' }}>
          <Navigation />
          <Header />
        </View>
    );
  }
}

export default Category;
