import Realm from 'realm';
import uuidV4 from 'uuid/v4';
import itemDB from './itemDB';

const categoryDB = new Realm({ schema: [{
    name: 'Category',
    primaryKey: 'id',
    properties: {
      type: 'string',
      id: 'string',
      active: 'bool',
      icon: {
        type: 'string',
        optional: true
      },
      color: {
        type: 'string',
        optional: true
      }
    }
  },
  itemDB,
  {
    name: 'primitiveStr',
    properties: {
      value: 'string'
    }
  }]
});

// initial categories
categoryDB.write(() => {
  categoryDB.create('Category', {
    type: 'همه',
    id: uuidV4(),
    icon: 'all',
    color: '#5b5b5b',
    active: true
  });
  categoryDB.create('Category', {
    type: 'ورزشی',
    id: uuidV4(),
    icon: 'varzeshi',
    color: '#329ff4',
    active: false
  });
  categoryDB.create('Category', {
    type: 'سرگرمی',
    id: uuidV4(),
    icon: 'sargarmi',
    color: '#e95666',
    active: false
  });
  categoryDB.create('Category', {
    type: 'کار',
    id: uuidV4(),
    icon: 'kar',
    color: '#bdc3c7',
    active: false
  });
  categoryDB.create('Category', {
    type: 'شخصی',
    id: uuidV4(),
    icon: 'shakhsi',
    color: '#34495e',
    active: false
  });
  categoryDB.create('Item', {
    title: 'مطالعه کتاب',
    shortDescription: 'خوندن کتاب هوش عاطفی',
    id: String(new Date().getTime()),
    category: 'ورزشی',
    link: 'example.com',
    images: [categoryDB.create('primitiveStr', { value: 'l' })],
    alarmSetted: false,
    location: 'safddsadas',
    voices: [categoryDB.create('primitiveStr', { value: 'gfl' })],
    fileTypes: [categoryDB.create('primitiveStr', { value: 'motalee' })]
  });
});


export default categoryDB;
