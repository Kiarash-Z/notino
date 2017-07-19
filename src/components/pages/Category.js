import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, FlatList, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import { inject, observer } from 'mobx-react';
import SplashScreen from 'react-native-splash-screen';
import Header from '../elements/Header';
import { Navigation, Icon, ItemSection } from '../common';
import ListItem from '../elements/ListItem';
import categoryDB from '../../database/categoryDB';
import RemoveItemModal from '../elements/modals/RemoveItemModal';

@inject('categoryStore')
@observer
class Category extends Component {
  componentWillMount() {
    SplashScreen.hide();
    this.props.categoryStore.createInitialCategories();
  }
  componentDidMount() {
    categoryDB.addListener('change', () => this.forceUpdate());
  }
  componentWillUnmount() {
    categoryDB.removeListener('change', () => this.forceUpdate());
  }
  renderItems({ item }) {
    const { categoryStore } = this.props;
    const { title, fileTypes, shortDescription } = item;
    const extractedFileTypes = fileTypes.map(type => type.value);
    return (
      <TouchableNativeFeedback
        onPress={() => Actions.itemEdit({ item })}
        onLongPress={() => {
          categoryStore.showRemoveModal = true;
          categoryStore.itemRemove = item;
        }}
      >
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
    const { type, icon, color } = activeCat;
    const relatedItems = categoryDB.objects('Item').filter(item => {
      if (type === 'همه') {
        return true;
      }
      return item.category === type;
    });
    let displayNoItem = 'flex';
    if (relatedItems.length > 0) {
      displayNoItem = 'none';
    }
    return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Navigation
              rightIcon='category'
              leftIcon='search'
              onRightButtonPress={() => Actions.categories()}
              onLeftButtonPress={() => Actions.itemSearch()}
            >
              <Image
                source={require('../../assets/images/logo.png')}
                style={{ width: 90, height: 23 }}
              />
            </Navigation>
            <View style={{ flex: 1 }}>
              <Header title={type} icon={icon} color={color} />
              <View style={[styles.noItemTextContainer, { display: displayNoItem }]}>
                <Text style={styles.noItemTextStyle}>
                  اولین آیتمو ایجاد کن!
                </Text>
              </View>
              <FlatList
                data={relatedItems}
                renderItem={this.renderItems.bind(this)}
                keyExtractor={item => item.id}
              />
              <ActionButton
                icon={<Icon name="add" size={14} color="white" />}
                offsetX={15}
                offsetY={15}
                onPress={() => Actions.itemCreate()} buttonColor="#218ffe"
              />
            </View>
          </View>
          <RemoveItemModal />
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
    fontFamily: 'IS_Light',
    textAlign: 'right'
  }
};

export default Category;
