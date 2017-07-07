export default {
    name: 'Item',
    primaryKey: 'id',
    properties: {
      title: 'string',
      shortDescription: 'string',
      id: 'string',
      category: 'string',
      link: 'string',
      images: {
        type: 'list',
        objectType: 'Image'
      },
      reminderSetted: 'bool',
      reminderDate: 'string',
      map: 'string',
      voices: {
        type: 'list',
        objectType: 'Voice'
      },
      fileTypes: {
        type: 'list',
        objectType: 'primitiveStr'
      }
    }
};
