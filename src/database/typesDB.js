const imageDB = {
  name: 'Image',
  properties: {
    type: 'string',
    uri: 'string',
    width: 'int',
    height: 'int',
    timestamp: 'int'
  }
};

const markerDB = {
  name: 'Marker',
  properties: {
    latitude: 'int',
    longitude: 'int'
  }
};
const VoiceDB = {
  name: 'Voice',
  properties: {
    type: 'string',
    duration: 'int',
    pathNum: 'int',
    timestamp: 'int'
  }
};
export { imageDB, markerDB, VoiceDB };
