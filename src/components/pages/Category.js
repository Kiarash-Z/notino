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

@inject('categoryStore', 'itemStore')
@observer
class Category extends Component {
  componentWillMount() {
    this.props.categoryStore.createInitialCategories();
    this.props.itemStore.resetValues();
  }
  componentDidMount() {
    SplashScreen.hide();
    categoryDB.addListener('change', () => this.forceUpdate());
  }
  componentWillUnmount() {
    categoryDB.removeListener('change', () => this.forceUpdate());
  }
  renderImage({ item }) {
    return (
      <View style={styles.imageContainerStyle}>
        <Image source={{ uri: item.uri }} style={styles.imageStyle} />
      </View>
    );
  }
  renderItems({ item }) {
    const { categoryStore } = this.props;
    const { title, fileTypes, description, images } = item;
    const extractedFileTypes = fileTypes.map(type => type.value);
    let computedDescription = description;
    computedDescription = computedDescription.replace(/\n|\r/g, '');
    if (computedDescription.length > 30) {
      computedDescription = `${computedDescription.slice(0, 30)}...`;
    }
    const renderImageList = () => {
      if (images.length < 3) {
        return (
          <View style={styles.imagesContainerStyle}>
            <FlatList
              style={{ flexDirection: 'row-reverse' }}
              data={images}
              renderItem={this.renderImage}
              keyExtractor={i => i.timestamp}
              horizontal
            />
          </View>
        );
      } else if (images.length >= 3) {
        return (
          <View style={styles.imagesContainerStyle}>
            <FlatList
              style={{ flexDirection: 'row-reverse' }}
              data={images.slice(0, 2)}
              renderItem={this.renderImage}
              keyExtractor={i => i.timestamp}
              horizontal
            />
            <View
              style={[styles.imageContainerStyle, styles.moreImagesStyle]}
            >
                  <Text style={{ fontSize: 18, lineHeight: 4 }}>...</Text>
                </View>
          </View>
        );
      }
    };
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
              <Text style={styles.moreInfoTextStyle}>{computedDescription}</Text>
            </ListItem>
            {renderImageList()}
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
    }).sort((a, b) => Number(a.id) - Number(b.id));
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
    alignSelf: 'center'
  },
  moreInfoTextStyle: {
    fontSize: 15,
    color: '#a8b5bd',
    fontFamily: 'IS_Light',
    textAlign: 'right'
  },
  imagesContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
    marginTop: 5
  },
  imageContainerStyle: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 8
  },
  imageStyle: {
    width: 40,
    height: 40,
    borderRadius: 5
  },
  moreImagesStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#e3e3e3',
    position: 'absolute',
    right: 111
  }
};

export default Category;
