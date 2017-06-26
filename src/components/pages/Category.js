import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import Header from '../elements/Header';
import { Navigation, Icon, ItemSection } from '../common';
import ListItem from '../elements/ListItem';
import categoryDB from '../../database/categoryDB';

class Category extends Component {
  renderItems({ item }) {
    const { title, fileTypes, shortDescription } = item;
    const extractedFileTypes = fileTypes.map(type => type.value);
    return (
      <TouchableNativeFeedback>
        <View>
          <ItemSection>
            <ListItem icons={extractedFileTypes} title={title}>
              <Text style={styles.moreInfoTextStyle}>{shortDescription}</Text>
            </ListItem>
          </ItemSection>
        </View>
      </TouchableNativeFeedback>
    );
  }
  render() {
    const activeCat = categoryDB.objects('Category').find(cat => {
      return cat.active;
    });
    const relatedItems = categoryDB.objects('Item').filter(item => {
      if (activeCat.type === 'همه') {
        return true;
      }
      return item.category === activeCat.type;
    });
    const { type, icon, color } = activeCat;
    let displayNoItem = 'flex';
    if (relatedItems.length > 0) {
      displayNoItem = 'none';
    }
    return (
        <View style={{ flex: 1 }}>
          {/* Navigation */}
          <Navigation
            rightIcon='category'
            leftIcon='search'
            onRightButtonPress={() => Actions.categories()}
          />
          <Header title={type} icon={icon} color={color} />
          <View style={[styles.noItemTextContainer, {display: displayNoItem}]}>
            <Text style={styles.noItemTextStyle}>
              اولین آیتمو ایجاد کن!
            </Text>
          </View>
        <FlatList
          data={relatedItems}
          renderItem={this.renderItems}
          keyExtractor={item => item.id}
        />
          <ActionButton
            icon={<Icon name="add" size={14} color="white" />}
            onPress={() => Actions.itemCreate()} buttonColor="#218ffe"
          />
        </View>
    );
  }
}

const styles = {
  noItemTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    flex: 1,
    justifyContent: 'center'
  },
  noItemTextStyle: {
    fontFamily: 'IS_Light',
    fontSize: 16,
    color: '#a8b5bd',
    paddingBottom: 10,
    marginBottom: -20,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.2)'
  },
  moreInfoTextStyle: {
    fontSize: 15,
    color: '#a8b5bd',
    fontFamily: 'IS_Light'
  }
};

export default Category;
