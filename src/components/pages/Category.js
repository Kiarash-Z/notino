import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ActionButton from 'react-native-action-button';
import Header from '../Header';
import { Navigation, Icon } from '../common';
import ListItem from '../ListItem';

class Category extends Component {
  static navigatorStyle = {
      navBarHidden: true
  };
  render() {
    return (
        <View style={{ flex: 1 }}>
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
          <ActionButton buttonColor="#218ffe" />
        </View>
    );
  }
}

export default Category;
