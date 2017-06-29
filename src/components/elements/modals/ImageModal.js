import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-simple-modal';
import { inject, observer } from 'mobx-react';
import { Icon } from '../../common';

@inject('itemImageStore')
@observer
class ImageModal extends Component {
  render() {
    const { itemImageStore } = this.props;
    const { openedImageStyle,
            imageModalStyle,
            imageModalTextStyle,
            modalBottomContainerStyle } = styles;
    const openedImage = itemImageStore.openedImage;
    const imageModalHeight = () => {
      const width = openedImage.width;
      const height = openedImage.height;
      if ((width / height) <= 1.3) {
        return 380;
      } else if ((height / width) >= 1.3) {
        return 250;
      }
      return itemImageStore.imageModalWidth;
    };
    return (
      <Modal
        open={itemImageStore.showImageModal}
        modalDidClose={() => { itemImageStore.showImageModal = false; }}
        modalStyle={[imageModalStyle, { height: imageModalHeight() }]}
      >
        <View
          style={{ flex: 1 }}
          onLayout={e => { itemImageStore.imageModalWidth = e.nativeEvent.layout.width; }}
        >
          <Image
            style={openedImageStyle}
            source={{ uri: openedImage.uri }}
          />
        </View>
        <TouchableWithoutFeedback onPress={() => { itemImageStore.showImageModal = false; }}>
          <View style={modalBottomContainerStyle}>
            <Text style={imageModalTextStyle}>بستن</Text>
            <Icon name="close" size={11} color="white" />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = {
  openedImageStyle: {
    flex: 1,
    marginBottom: 10,
    resizeMode: 'stretch'
  },
  imageModalStyle: {
    paddingTop: 0,
    paddingRight: 35,
    paddingLeft: 35,
    backgroundColor: 'transparent'
  },
  imageModalTextStyle: {
     alignSelf: 'center',
     color: 'white',
     fontFamily: 'IS_Bold',
     fontSize: 16,
     marginRight: 5,
     marginTop: 5
  },
  modalBottomContainerStyle: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center'
  }
};

export default ImageModal;
