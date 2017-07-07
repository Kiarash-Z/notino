import { observable } from 'mobx';

class Category {
  @observable items = [];
  @observable filteredItems = []
  @observable text = '';
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
      return item.shortDescription.includes(text);
    });
    this.filteredItems = titleFiltered.concat(descriptionFiltered);
  }
}

const categoryStore = new Category;

export { categoryStore };
