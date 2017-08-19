import React, { Component } from 'react';
import { View, TouchableNativeFeedback, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import { ItemSection, Input, Icon } from '../common';
import categoryDB from '../../database/categoryDB';

@inject('itemStore')
@observer
class ItemForm extends Component {
  componentDidMount() {
    const active = categoryDB.objects('Category').find(cat => cat.active);
    if (active.type !== 'همه') {
      this.props.itemStore.updateValue({ prop: 'category', value: active.type });
    }
  }
  render() {
    const { itemStore } = this.props;
    const { title, description, category, link } = itemStore;
    const { sectionStyle, categorySelectTextStyle, catContainerStyle } = styles;
    const renderSelectCat = () => {
      if (categoryDB.objects('Category').length > 2) {
        if (itemStore.category) {
          const thisCat = categoryDB.objects('Category')
          .find(cat => cat.type === itemStore.category);
          return (
            <TouchableNativeFeedback onPress={() => { itemStore.showSelectCatModal = true; }}>
              <View
                style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between' }}
              >
                <Icon name="left-arrow" color="rgba(0,0,0,.7)" size={17} />
                <View style={catContainerStyle}>
                  <Text style={categorySelectTextStyle}>{itemStore.category}</Text>
                  <Icon name={thisCat.icon} size={19} color={thisCat.color} />
                </View>
              </View>
            </TouchableNativeFeedback>
          );
        }
        return (
          <TouchableNativeFeedback onPress={() => { itemStore.showSelectCatModal = true; }}>
            <View style={catContainerStyle}>
              <Text style={[categorySelectTextStyle, { color: 'rgba(0,0,0,.3)' }]}>
                انتخاب دسته بندی
              </Text>
              <Icon name="down-arrow" size={17} color="black" />
            </View>
          </TouchableNativeFeedback>
        );
      }
      return (
        <Text style={[categorySelectTextStyle, { color: 'rgba(0,0,0,.3)' }]}>
          لطفا یک دسته بندی درست کنید!
        </Text>
      );
    };
    return (
      <View style={{ paddingRight: 10 }}>
        <ItemSection style={[{ ...sectionStyle, borderTopWidth: 0 }]}>
          <Input
            align="right"
            placeholder="تیتر"
            bordered
            value={title}
            size={15}
            maxLength={25}
            onChangeText={value => itemStore.updateValue({ prop: 'title', value })}
          />
        </ItemSection>

        <ItemSection style={sectionStyle}>
          <View>
            <Input
              align="right"
              style={{ flex: 1 }}
              placeholder="توضیح"
              bordered
              value={description}
              size={15}
              multiline
              numberOfLines={6}
              maxLength={320}
              onChangeText={value => itemStore.updateValue({ prop: 'description', value })}
            />
          </View>
        </ItemSection>

        <ItemSection style={sectionStyle}>
          {renderSelectCat()}
        </ItemSection>

        <ItemSection style={sectionStyle}>
          <Input
            align="right"
            placeholder="لینک"
            bordered
            value={link}
            size={15}
            onChangeText={value => itemStore.updateValue({ prop: 'link', value })}
          />
        </ItemSection>
      </View>
    );
  }
}

const styles = {
  sectionStyle: {
    paddingTop: 4,
    paddingBottom: 4,
    borderTopColor: 'rgba(0,0,0,.07)',
  },
  categorySelectTextStyle: {
    fontFamily: 'IS_Light',
    fontSize: 15,
    textAlign: 'right',
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 10
  },
  catContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
};

export default ItemForm;
