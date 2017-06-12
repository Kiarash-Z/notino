import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import Header from '../elements/Header';
import { Navigation, Icon, ItemSection } from '../common';
import ListItem from '../elements/ListItem';

class Category extends Component {
  render() {
    const { searchTextStyle, moreInfoTextStyle } = styles;
    return (
        <View style={{ flex: 1 }}>
          {/* Navigation */}

          <Navigation
            rightIcon='category'
            leftIcon='menu'
            onRightButtonPress={() => Actions.categories()}
          >
            <Icon name="search" size={14} color="#a8b5bd" />
            <Text style={searchTextStyle}>جستجو بر اساس تیتر و هشتگ</Text>
          </Navigation>
          {/* Header */}

          <Header />
          {/* Items */}
          <ItemSection>
            <ListItem icons={['alarm', 'motalee']} title="باشگاه">
              <Text style={moreInfoTextStyle}>اطلاعاتی در مورد باشگاه</Text>
            </ListItem>
          </ItemSection>
          <ItemSection>
            <ListItem icons={['alarm', 'motalee']} title="باشگاه">
              <Text style={moreInfoTextStyle}>اطلاعاتی در مورد باشگاه</Text>
            </ListItem>
          </ItemSection>
          <ActionButton
            icon={<Icon name="add" size={14} color="white" />}
            onPress={() => Actions.itemCreate()} buttonColor="#218ffe"
          />
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
