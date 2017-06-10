import React, { Component } from 'react';
import { View } from 'react-native';
import { Navigation } from '../common/Navigation';
import CategoriesItem from '../elements/CategoriesItem';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.categoryNavigate = this.categoryNavigate.bind(this);
  }
  // this will navigate back to category's page
  categoryNavigate() {
    this.props.navigator.push({
      screen: 'Category',
      navigatorStyle: {
        navBarHidden: true,
        screenBackgroundColor: 'white'
      }
    });
  }
  render() {
    const { itemsContainerStyle, columnStyle, rightColumn } = styles;
    return (
      <View>
        <Navigation
          rightIcon="category"
          rightInfo="دسته بندی ها"
          leftIcon="back"
          onLeftButtonPress={this.categoryNavigate}
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
