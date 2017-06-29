import React, { Component } from 'react';
import { View, Picker } from 'react-native';
import { inject, observer } from 'mobx-react';
import { ItemSection, Input } from '../common';
import categoryDB from '../../database/categoryDB';

@inject('itemStore')
@observer
class ItemForm extends Component {
  render() {
    const { itemStore } = this.props;
    const { title, shortDescription, category, link } = itemStore;
    const { sectionStyle } = styles;
    const renderPicker = () => {
      return categoryDB.objects('Category')
      .filter((item) => item.type !== 'همه')
      .map((item, index) => {
          return (
            <Picker.Item label={item.type} value={String(index)} key={index} />
          );
      });
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
          <Input
            align="right"
            placeholder="توضیح کوتاه"
            bordered
            value={shortDescription}
            size={15}
            maxLength={35}
            onChangeText={value => itemStore.updateValue({ prop: 'shortDescription', value })}
          />
        </ItemSection>

        <ItemSection style={sectionStyle}>
          <Picker
          selectedValue={category}
          onValueChange={value => itemStore.updateValue({ prop: 'category', value })}
          >
            {renderPicker()}
          </Picker>
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
  }
};

export default ItemForm;
