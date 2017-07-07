import { observable } from 'mobx';
import { itemImageStore, itemStore } from './';

class Location {
  @observable marker = {};
  @observable showMapModal = false;
  addLocation() {
      this.showMapModal = true;
      itemImageStore.showGallerySelector = false;
  }
  addMapToList() {
    itemStore.map = { ...this.marker, type: 'map', timestamp: new Date().getTime() };
    this.showMapModal = false;
  }
  handleMapPress(e) {
    const coordinate = e.nativeEvent.coordinate;
    this.marker = {
      latitude: coordinate.latitude,
      longitude: coordinate.longitude
    };
  }
}

const itemLocationStore = new Location;

export { itemLocationStore };
