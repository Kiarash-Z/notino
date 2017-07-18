import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import { Navigation } from '../common/Navigation';
import CategoriesItem from '../elements/CategoriesItem';
import categoryDB from '../../database/categoryDB';
import CreateCatModal from '../elements/modals/CreateCatModal';
import RemoveCatModal from '../elements/modals/RemoveCatModal';

@inject('categoryStore')
@observer
class Categories extends Component {
  componentDidMount() {
    categoryDB.addListener('change', () => this.forceUpdate());
  }
  componentWillUnmount() {
    categoryDB.removeListener('change', () => this.forceUpdate());
  }
  renderCategories({ item }) {
    const { id, icon, color, type, changable } = item;
    const { categoryStore } = this.props;
    if (type === 'ایجاد دسته') {
      return (
        <CategoriesItem
          icon={icon}
          iconColor={color}
          text={type}
          onPress={() => { categoryStore.showCreateModal = true; }}
          style={styles.borderedCat}
        />
      );
    }
    const handleLongPress = () => {
      categoryStore.categoryRemove = item;
      if (!changable) return false;
      categoryStore.showCatRemoveModal = true;
    };
    return (
      <CategoriesItem
        icon={icon}
        iconColor={color}
        text={type}
        onPress={() => categoryStore.handleCatPress(id)}
        onLongPress={handleLongPress}
        style={styles.borderedCat}
      />
    );
  }
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <Navigation
            rightIcon="category"
            rightInfo="دسته بندی ها"
            leftIcon="back"
            onLeftButtonPress={() => Actions.pop()}
          />
          <View style={styles.categoryContainerStyle}>
            <FlatList
              data={categoryDB.objects('Category')}
              renderItem={this.renderCategories.bind(this)}
              keyExtractor={item => item.id}
              numColumns={2}
            />
          </View>
        </View>
        <CreateCatModal />
        <RemoveCatModal />
      </View>
    );
  }
}

const styles = {
  categoryContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  },
  borderedCat: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,.1)'
  }
};
export default Categories;
