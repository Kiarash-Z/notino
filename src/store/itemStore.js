import { observable } from 'mobx';

class Item {
  @observable title = '';
  @observable shortDescription = '';
  @observable id = '';
  @observable link = '';
  @observable category = '';
  updateValue({ prop, value }) {
    this[prop] = value;
  }
}

const itemStore = new Item;

export default itemStore;
