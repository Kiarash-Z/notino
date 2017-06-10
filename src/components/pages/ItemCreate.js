import React, { Component } from 'react';
import { View } from 'react-native';
import { Navigation, Input, ItemSection } from '../common';

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
      <View>
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

      </View>
    );
  }
}
const styles = {
  inputContainerStyle: {
    paddingRight: 10
  },
  sectionStyle: {
    paddingTop: 4,
    paddingBottom: 4,
    borderTopColor: 'rgba(0,0,0,.07)'
  }
};
export default ItemCreate;
