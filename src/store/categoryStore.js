import { Actions } from 'react-native-router-flux';
import { observable } from 'mobx';
import { AudioUtils } from 'react-native-audio';
import RNFS from 'react-native-fs';
import PushNotification from 'react-native-push-notification';
import { ToastAndroid } from 'react-native';
import uuidV4 from 'uuid/v4';
import categoryDB from '../database/categoryDB';

class Category {
  @observable items = [];
  @observable filteredItems = []
  @observable text = '';
  @observable showRemoveModal = false;
  @observable itemRemove = null;
  @observable showCreateModal = false;
  @observable createCatName = '';
  @observable icons = ['musiqi', 'film', 'coins', 'telly', 'idea', 'edit', 'mazhabi', 'motalee'];
  @observable colors = ['#329ff4', '#e95666', '#66BB6A', '#e67e22', '#f1c40f', '#34495e'];
  @observable activeColor= '#329ff4';
  @observable activeIcon = 'musiqi';
  @observable showCatRemoveModal = false;
  @observable categoryRemove = null;
  @observable userFirstEntered = true;

  resetCreateValues() {
    this.showCreateModal = false;
    this.activeColor = '#329ff4';
    this.activeIcon = 'musiqi';
    this.createCatName = '';
  }
  filter(text) {
    // '' instead of false bcuz 0 is also false!
    this.text = text;
    if (text == '') {
      this.filteredItems = [];
      return false;
    }
    // priority of item title contains search text
    const titleFiltered = this.items.filter(item => {
      return item.title.includes(text);
    });
    const descriptionFiltered = this.items.filter(item => {
      const duplacationCheck = titleFiltered.find(i => {
        return i.id === item.id;
      });
      if (duplacationCheck) {
        return false;
      }
      return item.description.includes(text);
    });
    this.filteredItems = titleFiltered.concat(descriptionFiltered);
  }
  removeItem() {
    const { itemRemove } = this;
    itemRemove.voices.map(voice => {
      const path = `${AudioUtils.DocumentDirectoryPath}/voice${voice.pathNum}.aac`;
      RNFS.unlink(path);
    });
    PushNotification.cancelLocalNotifications({ tag: JSON.parse(itemRemove.reminderDate) });
    categoryDB.write(() => {
      const itemToRemove = categoryDB.objects('Item').find(obj => obj.id === itemRemove.id);
      categoryDB.delete(itemToRemove);
    });
    this.showRemoveModal = false;
  }
  createInitialCategories() {
    if (categoryDB.objects('Category').length === 0) {
      Actions.appIntro({ type: 'reset' });
      // initial categories
      categoryDB.write(() => {
        categoryDB.create('Category', {
          type: 'ایجاد دسته',
          id: uuidV4(),
          icon: 'plus',
          color: '#0287ee',
          active: false,
          changable: false
        });
        categoryDB.create('Category', {
          type: 'همه',
          id: uuidV4(),
          icon: 'all',
          color: '#5b5b5b',
          active: true,
          changable: false
        });
        categoryDB.create('Category', {
          type: 'سرگرمی',
          id: uuidV4(),
          icon: 'sargarmi',
          color: '#e95666',
          active: false,
          changable: true
        });
        categoryDB.create('Category', {
          type: 'ورزشی',
          id: uuidV4(),
          icon: 'varzeshi',
          color: '#329ff4',
          active: false,
          changable: true
        });
        categoryDB.create('Category', {
          type: 'کار',
          id: uuidV4(),
          icon: 'kar',
          color: '#68ca89',
          active: false,
          changable: true
        });
        categoryDB.create('Category', {
          type: 'شخصی',
          id: uuidV4(),
          icon: 'shakhsi',
          color: '#34495e',
          active: false,
          changable: true
        });

        // descriptionInputHeight
        categoryDB.create('Item', {
          title: 'درباره ما',
          description: 'با نوتینو بروز بنویس :)\nتوسعه دهنده: کیارش زرین مهر\nطراح لوگو: امیر نجفی\n تلگرام: Kiarash_Z@',
          id: '0',
          category: 'کار',
          link: 'kiarash.zar@gmail.com',
          images: [],
          reminderSetted: false,
          reminderDate: JSON.stringify(''),
          map: JSON.stringify([]),
          voices: [],
          fileTypes: [categoryDB.create('primitiveStr', {
            value: 'link'
          })]
        });
      });
    }
  }
  handleCatPress(id) {
    categoryDB.write(() => {
      categoryDB.objects('Category').map(cat => { cat.active = false; });
      categoryDB.objects('Category').map(cat => {
        if (cat.id === id) {
          cat.active = true;
        }
        return cat;
      });
      Actions.pop();
    });
  }
  createCategory() {
    const categories = categoryDB.objects('Category').slice();
    const sameCat = categories.find(cat => this.createCatName === cat.type);
    if (sameCat) {
      ToastAndroid.show('دسته بندی با این نام قبلا ایجاد شده', ToastAndroid.SHORT);
    } else {
      categoryDB.write(() => {
        categoryDB.create('Category', {
          type: this.createCatName,
          id: uuidV4(),
          icon: this.activeIcon,
          color: this.activeColor,
          active: false,
          changable: true
        });
      });
      this.resetCreateValues();
    }
  }
  removeCategory() {
    categoryDB.write(() => {
      const items = categoryDB.objects('Item');
      items.slice().filter(item => {
        if (item.category === this.categoryRemove.type) {
          item.voices.map(voice => {
            const path = `${AudioUtils.DocumentDirectoryPath}/voice${voice.pathNum}.aac`;
            RNFS.unlink(path);
          });
          PushNotification.cancelLocalNotifications({ tag: JSON.parse(item.reminderDate) });
          categoryDB.delete(item);
          return false;
        }
        return true;
      });
      const thisCategory = categoryDB.objects('Category')
      .find(cat => cat.id === this.categoryRemove.id);
      categoryDB.delete(thisCategory);
      categoryDB.objects('Category').map(cat => {
        cat.active = false;
        return cat;
      }).map(cat => {
        if (cat.type === 'همه') cat.active = true;
      });
    });
    this.showCatRemoveModal = false;
  }
}

const categoryStore = new Category;

export { categoryStore };
