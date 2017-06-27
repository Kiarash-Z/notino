import { observable } from 'mobx';

class Item {
  @observable title = '';
  @observable shortDescription = '';
  @observable id = '';
  @observable link = '';
  @observable category = '';
  @observable showGallerySelector = false;
  @observable recordVoiceTime = 0;
  @observable recordingVoiceStat = 'stopped';
  @observable images = []
  @observable galleryImages = []
  updateValue({ prop, value }) {
    this[prop] = value;
  }
  addImage({ uri, width, height }) {
    this.images.push({
      uri,
      width,
      height,
      type: 'image',
      timestamp: new Date().getTime()
    });
  }
}

const itemStore = new Item;

export default itemStore;
