import React, { Component } from 'react';
import { View, Text, FlatList, TouchableNativeFeedback } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';
import ListItem from '../elements/ListItem';
import categoryDB from '../../database/categoryDB';
import { Navigation, Input, Icon, ItemSection } from '../common';

@inject('categoryStore')
@observer
class ItemSearch extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }
  componentDidMount() {
    this.props.categoryStore.items = categoryDB.objects('Item');
    SplashScreen.hide();
  }
  renderItem({ item }) {
    const { title, fileTypes, description } = item;
    const extractedFileTypes = fileTypes.map(type => type.value);
    return (
      <TouchableNativeFeedback
        onPress={() => {
          Actions.itemEdit({ item });
          this.props.categoryStore.text = '';
          this.props.categoryStore.filteredItems = [];
      }}
      >
        <View>
          <ItemSection>
            <ListItem icons={extractedFileTypes} title={title}>
              <Text style={styles.moreInfoTextStyle}>{description}</Text>
            </ListItem>
          </ItemSection>
        </View>
      </TouchableNativeFeedback>
    );
  }
  render() {
    const { categoryStore } = this.props;
    const { navigationTextStyle,
            containerStyle,
            searchInputContainerStyle,
            searchIconStyle } = styles;
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Navigation
          leftIcon="back"
          onLeftButtonPress={() => Actions.pop()}
        >
          <Text style={navigationTextStyle}>جستجو</Text>
        </Navigation>
        <View style={containerStyle}>
          <View style={searchInputContainerStyle}>
              <Icon name="search" size={18} color='rgba(0,0,0,.6)' style={searchIconStyle} />
              <Input
                placeholder="جستجو بر اساس تیتر و توضیح کوتاه"
                align="center"
                value={categoryStore.text}
                style={{ width: 220 }}
                onChangeText={text => categoryStore.filter(text)}
              />
          </View>
          <FlatList
            data={categoryStore.filteredItems}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  navigationTextStyle: {
    fontFamily: 'IS_Reg',
    fontSize: 18,
    color: '#218ffe'
  },
  containerStyle: {
    paddingTop: 20
  },
  searchInputContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0, .1)',
    alignSelf: 'center',
    marginBottom: 50
  },
  moreInfoTextStyle: {
    fontSize: 15,
    color: '#a8b5bd',
    fontFamily: 'IS_Light',
    textAlign: 'right'
  }
};

export default ItemSearch;
