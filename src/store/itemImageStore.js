import { observable } from 'mobx';
import { UIManager, LayoutAnimation, CameraRoll } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { itemStore } from './';

class Image {
  @observable showGallerySelector = false;
  @observable galleryImages = []
  mapImageToState({ uri, width, height }) {
    itemStore.images.push({
      uri,
      width,
      height,
      type: 'image',
      timestamp: new Date().getTime()
    });
  }
  addImage() {
    UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
    CameraRoll.getPhotos({ first: 25, assetType: 'All' })
    .then(r => {
      const organizeImages = () => {
        const organized = [];
        r.edges.map(pic => {
          organized.push({
            type: 'image',
            uri: pic.node.image.uri,
            width: pic.node.image.width,
            height: pic.node.image.height
          });
        });
        return organized;
      };
      LayoutAnimation.easeInEaseOut();
      this.galleryImages = organizeImages();
      this.showGallerySelector = !this.showGallerySelector;
    });
  }
  imageContainerSwipeUp() {
    const ImagePickerOptions = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(ImagePickerOptions, (response) => {
      const checkDuplicate = itemStore.images.filter((i) => {
          return i.uri === response.uri;
      });
      if (response.didCancel ||
          response.error ||
          response.customButton ||
          checkDuplicate.length > 0) {
        return false;
      }
      this.showGallerySelector = !this.showGallerySelector;
      this.mapImageToState({ uri: response.uri, width: response.width, height: response.height });
      });
  }
  removeImage(timestamp) {
    const selectedImages = itemStore.images.filter((item) => {
      return item.timestamp !== timestamp;
    });
    itemStore.images = selectedImages;
  }
}

const itemImageStore = new Image;

export { itemImageStore };
