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
      alarmSetted: 'bool',
      location: 'string',
      voices: {
        type: 'list',
        objectType: 'primitiveStr'
      },
      fileTypes: {
        type: 'list',
        objectType: 'primitiveStr'
      }
    }
};
