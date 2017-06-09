import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Header from '../Header';
import { Navigation } from '../common';
import ListItem from '../ListItem';

class Category extends Component {
  static navigatorStyle = {
      navBarHidden: true
  };
  render() {
    return (
        <View>
          <Navigation />
          <Header />
          <ListItem icons={['alarm', 'motalee']} title="باشگاه">
            <Text>اطلاعاتی در مورد باشگاه</Text>
          </ListItem>
          <ListItem icons={['alarm', 'motalee']} title="باشگاه">
            <Text>اطلاعاتی در مورد باشگاه</Text>
          </ListItem>
          <ListItem icons={['alarm', 'motalee']} title="باشگاه">
            <Text>اطلاعاتی در مورد باشگاه</Text>
          </ListItem>
        </View>
    );
  }
}

export default Category;
