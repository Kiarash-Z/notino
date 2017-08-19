import { observable } from 'mobx';
import { TimePickerAndroid, DatePickerAndroid } from 'react-native';
import PushNotification from 'react-native-push-notification';
import uuidV4 from 'uuid/v4';
import { Actions } from 'react-native-router-flux';
import { itemVoiceStore } from './';
import categoryDB from '../database/categoryDB';

class Item {
  @observable title = '';
  @observable description = '';
  @observable id = '';
  @observable link = '';
  @observable category = '';
  @observable images = [];
  @observable voices = [];
  @observable fileTypes = [];
  @observable showRemoveModal = false;
  @observable reminderSetted = false;
  @observable showReminderModal = false;
  @observable reminderDate = '';
  @observable itemRemove = '';
  @observable itemRemoveType = '';
  @observable showSelectCatModal = false;
  @observable timestamp = 0;
  @observable map = [];

  updateValue({ prop, value }) {
    this[prop] = value;
  }
  removeItemModalData(item, type) {
    this.itemRemove = item;
    this.itemRemoveType = type;
    this.showRemoveModal = true;
  }
  removeItem() {
    const item = this.itemRemove;
      switch (item.type) {
        case 'voice':
        itemVoiceStore.removeVoice(item.timestamp, item.pathNum);
        break;
        case 'image':
        this.images = this.images.filter(image => image.timestamp !== item.timestamp);
        break;
        case 'map':
        this.removeMap();
        break;
      }
      this.showRemoveModal = false;
  }
  addReminder(repeat, repeatMode) {
    PushNotification.configure({
      onNotification(notification) {
            const clicked = notification.userInteraction;
            const relatedItem = categoryDB.objects('Item').find(i => {
              const reminderDate = JSON.parse(i.reminderDate);
              return reminderDate === notification.tag;
            });
            if (clicked && relatedItem) {
              Actions.itemEdit({ item: relatedItem });
              if (!repeat) {
                itemStore.reminderSetted = false;
                categoryDB.write(() => {
                  relatedItem.reminderSetted = false;
                });
              }
            }
        }
    });
    itemStore.showReminderModal = false;
      if (!this.reminderSetted) {
        const openTimePicker = (year, month, day) => {
          TimePickerAndroid.open().then(({ action, hour, minute }) => {
            if (action === 'timeSetAction') {
              const date = new Date(year, month, day, hour, minute);
              const repeatType = repeat ? repeatMode : null;
              this.reminderDate = date;
              PushNotification.localNotificationSchedule({
                title: this.title,
                message: this.description,
                tag: date,
                date,
                repeatType
              });
              this.reminderSetted = true;
              categoryDB.write(() => {
              const activeItem = categoryDB.objects('Item').find(item => {
                return item.id === this.id;
              });
              if (activeItem) {
                activeItem.reminderSetted = this.reminderSetted;
                activeItem.reminderDate = JSON.stringify(this.reminderDate);
              }
            });
            }
          });
        };
        DatePickerAndroid.open().then(({ action, year, month, day }) => {
          if (action === 'dateSetAction') {
            openTimePicker(year, month, day);
          }
        });
      } else {
        this.reminderSetted = false;
        PushNotification.cancelLocalNotifications({ tag: this.reminderDate });
      }
  }
  resetValues() {
    this.voices.map(voice => voice.sound.pause());
    this.title = '';
    this.description = '';
    this.id = '';
    this.link = '';
    this.category = '';
    this.images = [];
    this.voices = [];
    this.fileTypes = [];
    this.showRemoveModal = false;
    this.reminderSetted = false;
    this.showReminderModal = false;
    this.reminderDate = '';
    this.itemRemove = '';
    this.itemRemoveType = '';
    this.map = [];
  }
  convertVoices() {
    const voices = [];
    this.voices.map(voice => {
      voices.push(categoryDB.create('Voice', {
        type: 'voice',
        duration: voice.duration,
        timestamp: voice.timestamp,
        pathNum: voice.pathNum,
        status: 'stopped'
      }));
    });
    return voices;
  }
  convertImages() {
    const images = [];
    this.images.map(image => {
      images.push(categoryDB.create('Image', {
        type: 'image',
        uri: image.uri,
        width: image.width,
        height: image.height,
        timestamp: image.timestamp
      }));
    });
    return images;
  }
  convertFileTypes() {
    const allItems = itemStore.images.concat(itemStore.voices, itemStore.map);
    const types = [];
    const push = value => {
      types.push(categoryDB.create('primitiveStr', {
        value
      }));
    };
    allItems.map(item => {
      if (item.type === 'image') {
        push('picture');
      } else if (item.type === 'map') {
        push('makan');
      } else {
        push(item.type);
      }
    });
    if (this.reminderSetted) {
      push('alarm');
    }
    if (this.link.length > 0) {
      push('link');
    }
    return types;
  }
  convertMarker() {
    const marker = [];
    this.marker.map(mkr => {
      marker.push(categoryDB.create('Marker', {
        longitude: mkr.longitude,
        latitude: mkr.latitude
      }));
    });
    return marker;
  }
  saveItemToDB(userFirstEntered) {
    if (this.link.length > 0) {
      this.fileTypes.push('link');
    }
    categoryDB.write(() => {
      categoryDB.create('Item', {
          title: this.title,
          description: this.description,
          blankTestt: 'Lol',
          id: String(new Date().getTime()),
          category: this.category,
          link: this.link,
          images: this.convertImages(),
          reminderSetted: this.reminderSetted,
          reminderDate: JSON.stringify(this.reminderDate),
          map: JSON.stringify(this.map),
          voices: this.convertVoices(),
          fileTypes: this.convertFileTypes()
      });
      if (userFirstEntered) {
        Actions.category({ type: 'replace' });
      } else {
        Actions.pop();
      }
    });
  }
  editItemFromDB() {
      categoryDB.write(() => {
      const activeItem = categoryDB.objects('Item').find(item => {
        return item.id === this.id;
      });
      activeItem.title = this.title;
      activeItem.description = this.description;
      activeItem.category = this.category;
      activeItem.link = this.link;
      activeItem.images = this.convertImages();
      activeItem.reminderSetted = this.reminderSetted;
      activeItem.reminderDate = JSON.stringify(this.reminderDate);
      activeItem.map = JSON.stringify(this.map);
      activeItem.voices = this.convertVoices();
      activeItem.fileTypes = this.convertFileTypes();
      Actions.pop();
    });
    }
  }

const itemStore = new Item;

export { itemStore };
