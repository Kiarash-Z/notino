import Realm from 'realm';
import uuidV4 from 'uuid/v4';
import itemDB from './itemDB';
import { imageDB, voiceDB } from './typesDB';

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
  imageDB,
  voiceDB,
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
});


export default categoryDB;
