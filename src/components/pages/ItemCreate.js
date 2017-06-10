import React, { Component } from 'react';
import { View } from 'react-native';
import { Navigation, Input, ItemSection } from '../common';
import ItemAddons from '../elements/ItemAddons';

class ItemCreate extends Component {
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
    const { inputContainerStyle, sectionStyle } = styles;
    return (
      <View style={{ flex: 1 }}>
        <Navigation
          rightInfo="ذخیره"
          rightInfoColor="#0288eb"
          leftIcon="back"
          onLeftButtonPress={this.categoryNavigate}
        />
        <View style={inputContainerStyle}>
          <ItemSection style={{ ...sectionStyle, borderTopWidth: 0 }}>
            <Input
              placeholder="تیتر"
              bordered
              size={15}
            />
          </ItemSection>

          <ItemSection style={sectionStyle}>
            <Input
              placeholder="توضیح کوتاه"
              bordered
              size={15}
            />
          </ItemSection>

          <ItemSection style={sectionStyle}>
            <Input
              placeholder="انتخاب موضوع"
              bordered
              size={15}
            />
          </ItemSection>


          <ItemSection style={sectionStyle}>
            <Input
              placeholder="لینک"
              bordered
              size={15}
            />
          </ItemSection>
        </View>
        <ItemAddons />
      </View>
    );
  }
}
const styles = {
  inputContainerStyle: {
    paddingRight: 10,
    flex: 0.92,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 0.5
  },
  sectionStyle: {
    paddingTop: 4,
    paddingBottom: 4,
    borderTopColor: 'rgba(0,0,0,.07)'
  }
};
export default ItemCreate;
