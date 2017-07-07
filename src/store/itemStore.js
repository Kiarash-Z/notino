import { observable } from 'mobx';
import { TimePickerAndroid, DatePickerAndroid } from 'react-native';
import PushNotification from 'react-native-push-notification';
import uuidV4 from 'uuid/v4';
import { Actions } from 'react-native-router-flux';
import { itemVoiceStore } from './';
import categoryDB from '../database/categoryDB';

class Item {
  @observable title = '';
  @observable shortDescription = '';
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
            if (clicked) {
              if (!repeat) { itemStore.reminderSetted = false; }
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
                message: this.shortDescription,
                tag: date,
                date,
                repeatType
              });
              this.reminderSetted = true;
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
    Actions.pop();
    this.title = '';
    this.shortDescription = '';
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
  saveItemToDB() {
    if (this.link.length > 0) {
      this.fileTypes.push('link');
    }
    categoryDB.write(() => {
      categoryDB.create('Item', {
          title: this.title,
          shortDescription: this.shortDescription,
          id: uuidV4(),
          category: this.category,
          link: this.link,
          images: this.convertImages(),
          reminderSetted: this.reminderSetted,
          reminderDate: JSON.stringify(this.reminderDate),
          map: JSON.stringify(this.map),
          voices: this.convertVoices(),
          fileTypes: this.convertFileTypes()
      });
      this.resetValues();
    });
  }
  editItemFromDB() {
      categoryDB.write(() => {
      const activeItem = categoryDB.objects('Item').find(item => {
        return item.id === this.id;
      });
      activeItem.title = this.title;
      activeItem.shortDescription = this.shortDescription;
      activeItem.category = this.category;
      activeItem.link = this.link;
      activeItem.images = this.convertImages();
      activeItem.reminderSetted = this.reminderSetted;
      activeItem.reminderDate = JSON.stringify(this.reminderDate);
      activeItem.map = JSON.stringify(this.map);
      activeItem.voices = this.convertVoices();
      activeItem.fileTypes = this.convertFileTypes();
      this.resetValues();
    });
    }
  }

const itemStore = new Item;

export { itemStore };
