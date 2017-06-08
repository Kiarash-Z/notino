import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from '../common/Header';
import Icon from '../../icons/Icon';

class Categories extends Component {
  static navigatorStyle = {
      navBarHidden: true
  };
  render() {
    return (
        <View>
          <Header />
        </View>
    );
  }
}

export default Categories;
