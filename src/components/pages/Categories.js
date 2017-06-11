import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Navigation } from '../common/Navigation';
import CategoriesItem from '../elements/CategoriesItem';

class Categories extends Component {
  render() {
    const { itemsContainerStyle, columnStyle, rightColumn } = styles;
    return (
      <View>
        <Navigation
          rightIcon="category"
          rightInfo="دسته بندی ها"
          leftIcon="back"
          onLeftButtonPress={() => { Actions.category(); }}
        />
        <View style={itemsContainerStyle}>
          <View style={columnStyle}>
            <CategoriesItem flex={1} icon="plus" iconColor="#0287ee" text="ایجاد دسته" />
            <CategoriesItem flex={1} icon="sargarmi" iconColor="#e95666" text="سرگرمی" />
          </View>
          <View style={[columnStyle, rightColumn]}>
            <CategoriesItem icon="all" iconColor="#5b5b5b" text="همه" />
            <CategoriesItem icon="film" iconColor="#b776de" text="ویدیو" />
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  itemsContainerStyle: {
    flexDirection: 'row'
  },
  columnStyle: {
    flex: 1
  },
  rightColumn: {
    borderLeftWidth: 1,
     borderLeftColor: 'rgba(0,0,0,.1)'
  }
};
export default Categories;
