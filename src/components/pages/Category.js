import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
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
            leftIcon='search'
            onRightButtonPress={() => Actions.categories()}
          />
          {/* Header */}

          <Header />
          {/* Items */}
          <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}>
            <View>
              <ItemSection>
                <ListItem icons={['alarm', 'motalee']} title="باشگاه">
                  <Text style={moreInfoTextStyle}>اطلاعاتی در مورد باشگاه</Text>
                </ListItem>
              </ItemSection>
            </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback>
          <View>
            <ItemSection>
              <ListItem icons={['alarm', 'motalee']} title="باشگاه">
                <Text style={moreInfoTextStyle}>اطلاعاتی در مورد باشگاه</Text>
              </ListItem>
            </ItemSection>
          </View>
        </TouchableNativeFeedback>
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
