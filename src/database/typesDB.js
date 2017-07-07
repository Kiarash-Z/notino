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
const voiceDB = {
  name: 'Voice',
  properties: {
    type: 'string',
    duration: 'int',
    pathNum: 'int',
    timestamp: 'int',
    status: 'string'
  }
};
export { imageDB, voiceDB };
