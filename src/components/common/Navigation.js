import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from './index';

class Navigation extends Component {
  render() {
    const { containerStyle, searchContainerStyle, searchTextStyle } = styles;
    return (
      <View style={containerStyle}>
        <Icon name="menu" size={25} />
        <View style={searchContainerStyle}>
          <Icon name="search" size={14} color="#a8b5bd" />
          <Text style={searchTextStyle}>جستجو بر اساس تیتر و هشتگ</Text>
        </View>
        <Icon name="category" size={25} color="#a8b5bd" />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    paddingTop: 20,
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  searchContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchTextStyle: {
    fontSize: 15,
    marginLeft: 5,
    color: '#a8b5bd'
  }
};

export { Navigation };
