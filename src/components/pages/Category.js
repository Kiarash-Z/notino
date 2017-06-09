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
    return (
        <View style={{ flex: 1 }}>
          {/* Navigation */}

          <Navigation
            rightIcon='category'
            leftIcon='menu'
            onRightButtonPress={this.categoriesNavigate}
          >
            <Icon name="search" size={14} color="#a8b5bd" />
            <Text style={styles.searchTextStyle}>جستجو بر اساس تیتر و هشتگ</Text>
          </Navigation>
          {/* Header */}

          <Header />
          {/* Items */}

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

const styles = {
  searchTextStyle: {
    fontSize: 15,
    color: '#a8b5bd',
    marginLeft: 5
  }
};

export default Category;
