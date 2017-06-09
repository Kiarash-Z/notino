import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ActionButton from 'react-native-action-button';
import Header from '../elements/Header';
import { Navigation, Icon } from '../common';
import ListItem from '../elements/ListItem';

class Category extends Component {
  static navigatorStyle = {
      navBarHidden: true
  };
  constructor(props) {
    super(props);
    this.categoriesNavigate = this.categoriesNavigate.bind(this);
  }
  // navigates to categories page
  categoriesNavigate() {
    this.props.navigator.push({
      screen: 'Categories',
      navigatorStyle: {
        navBarHidden: true,
        screenBackgroundColor: 'white'
      }
    });
  }
  render() {
    const { searchTextStyle, moreInfoTextStyle } = styles;
    return (
        <View style={{ flex: 1 }}>
          {/* Navigation */}

          <Navigation
            rightIcon='category'
            leftIcon='menu'
            onRightButtonPress={this.categoriesNavigate}
          >
            <Icon name="search" size={14} color="#a8b5bd" />
            <Text style={searchTextStyle}>جستجو بر اساس تیتر و هشتگ</Text>
          </Navigation>
          {/* Header */}

          <Header />
          {/* Items */}

          <ListItem icons={['alarm', 'motalee']} title="باشگاه">
            <Text style={moreInfoTextStyle}>اطلاعاتی در مورد باشگاه</Text>
          </ListItem>
          <ListItem icons={['alarm', 'motalee']} title="باشگاه">
            <Text style={moreInfoTextStyle}>اطلاعاتی در مورد باشگاه</Text>
          </ListItem>
          <ListItem icons={['alarm', 'motalee']} title="باشگاه">
            <Text style={moreInfoTextStyle}>اطلاعاتی در مورد باشگاه</Text>
          </ListItem>
          <ActionButton buttonColor="#218ffe" />
        </View>
    );
  }
}

const styles = {
  searchTextStyle: {
    fontFamily: 'IS_Light',
    fontSize: 14,
    color: '#a8b5bd',
    marginLeft: 5
  },
  moreInfoTextStyle: {
    fontSize: 15,
    color: '#a8b5bd',
    fontFamily: 'IS_Light'
  }
};

export default Category;
