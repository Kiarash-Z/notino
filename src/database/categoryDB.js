import Realm from 'realm';
import itemDB from './itemDB';
import { imageDB, voiceDB } from './typesDB';

const categoryDB = new Realm({ schema: [{
    name: 'Category',
    primaryKey: 'id',
    properties: {
      type: 'string',
      changable: 'bool',
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

export default categoryDB;
