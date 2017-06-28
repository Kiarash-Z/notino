import { observable } from 'mobx';


class Item {
  @observable title = '';
  @observable shortDescription = '';
  @observable id = '';
  @observable link = '';
  @observable category = '';
  @observable images = [];
  @observable voices = [];
  updateValue({ prop, value }) {
    this[prop] = value;
  }
}

const itemStore = new Item;

export { itemStore };
