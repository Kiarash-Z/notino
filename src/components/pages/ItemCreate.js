import React, { Component } from 'react';
import { View,
        Image,
        TouchableHighlight,
        FlatList, ScrollView,
        Picker,
        Text,
        TouchableWithoutFeedback,
        LayoutAnimation,
        UIManager } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-simple-modal';
import { Actions } from 'react-native-router-flux';
import { Navigation, Input, ItemSection, Icon } from '../common';
import ItemAddons from '../elements/ItemAddons';

const ImagePickerOptions = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class ItemCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selectedImages: [],
      showGallerySelector: false,
      showImageModal: false,
      selectedInput: 'ورزشی',
      openedImage: { node: { image: { uri: ' ', width: 0, height: 0 } } }
    };
    // enable animation

    UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
    // bindings

    this.handleAddImage = this.handleAddImage.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.renderSelectedImages = this.renderSelectedImages.bind(this);
    this.onSwipeUp = this.onSwipeUp.bind(this);
    this.openImageModal = this.openImageModal.bind(this);
    this.removeImage = this.removeImage.bind(this);
  }
  // open gallery on swipe
  onSwipeUp() {
  ImagePicker.showImagePicker(ImagePickerOptions, (response) => {
    if (response.didCancel || response.error || response.customButton) {
      return false;
    }
    this.setState({
      selectedImages: [
              ...this.state.selectedImages,
              { node: { image: { uri: response.uri } } }
            ],
          showGallerySelector: false
          });
    });
  }
  // this func will expand image in modal

  openImageModal(image) {
      this.setState({ showImageModal: true, openedImage: image });
  }
  // this func will remove image
  removeImage(uri) {
    const selectedImages = this.state.selectedImages.filter((image) => {
      return image.node.image.uri !== uri;
    });
    this.setState({ selectedImages });
  }
  // this will show up images section on icon press

  handleAddImage(images) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      images,
      showGallerySelector: !this.state.showGallerySelector
    });
  }
  // this will render images from gallery

  renderImages({ item }) {
      return (
        <TouchableHighlight
          onPress={() => {
            // checks for duplication
            const checkDuplicate = this.state.selectedImages.filter((image) => {
              return item.node.image.uri === image.node.image.uri;
            });
            if (checkDuplicate.length > 0) {
              return false;
            }
            this.setState({
              selectedImages: [...this.state.selectedImages, { ...item, expanded: false }],
              showGallerySelector: false
            });
            }}
          underlayColor='transparent'
        >
        <Image
          style={styles.selectingImagesStyle}
          source={{ uri: item.node.image.uri }}
        />
      </TouchableHighlight>
    );
  }
  // this will renders user selected images

  renderSelectedImages({ item }) {
    return (
      <TouchableHighlight
         onPress={() => this.openImageModal(item)}
         onLongPress={() => this.removeImage(item.node.image.uri)}
      >
        <View style={{ position: 'relative' }}>
          <View style={styles.filterContainerStyle}>
            <View style={styles.blackFilterStyle} />
            <Icon name="picture" size={27} color="white" />
          </View>
          <Image
            style={styles.imageStyle}
            source={{ uri: item.node.image.uri }}
          />
        </View>
      </TouchableHighlight>
    );
  }
  render() {
    const { sectionStyle,
            selectingImageContainer,
            openedImageStyle,
            modalStyle,
            modalTextStyle } = styles;
    const swipeConfig = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
      };
    const showImages = () => {
      if (this.state.showGallerySelector) {
        return (
          <FlatList
              data={this.state.images}
              renderItem={this.renderImages}
              keyExtractor={item => item.node.image.uri}
              horizontal
          />
        );
      }
    };
    const openedImage = this.state.openedImage.node.image;
    return (
      <View style={{ flex: 1 }}>

        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Navigation
              rightInfo="ذخیره"
              rightInfoColor="#0288eb"
              leftIcon="back"
              onLeftButtonPress={() => Actions.category()}
            />
          <ScrollView>
            <View style={{ paddingRight: 10 }}>
              <ItemSection style={{ ...sectionStyle, borderTopWidth: 0 }}>
                <Input
                  align="right"
                  placeholder="تیتر"
                  bordered
                  size={15}
                />
              </ItemSection>

              <ItemSection style={sectionStyle}>
                <Input
                  align="right"
                  placeholder="توضیح کوتاه"
                  bordered
                  size={15}
                />
              </ItemSection>

              <ItemSection style={sectionStyle}>
                <Picker
                selectedValue={this.state.selectedInput}
                onValueChange={(itemValue) => this.setState({ selectedInput: itemValue })}
                >
                <Picker.Item label="ورزشی" value="varzeshi" />
                <Picker.Item label="مطالعه" value="motalee" />
              </Picker>
              </ItemSection>

              <ItemSection style={sectionStyle}>
                <Input
                  align="right"
                  placeholder="لینک"
                  bordered
                  size={15}
                />
              </ItemSection>
            </View>
            <FlatList
                data={this.state.selectedImages}
                renderItem={this.renderSelectedImages}
                keyExtractor={item => item.node.image.uri}
            />
          </ScrollView>
          <View style={selectingImageContainer}>
            <GestureRecognizer
              onSwipeUp={(state) => this.onSwipeUp(state)}
              config={swipeConfig}
            >
              {showImages()}
            </GestureRecognizer>
          </View>
          <ItemAddons addImage={this.handleAddImage} />
        </View>
        <Modal
          open={this.state.showImageModal}
          modalDidClose={() => this.setState({ showImageModal: false })}
          modalStyle={modalStyle}
        >
          <Image
            style={openedImageStyle}
            source={{ uri: openedImage.uri }}
          />
          <TouchableWithoutFeedback onPress={() => this.setState({ showImageModal: false })}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={modalTextStyle}>بستن</Text>
              <Icon name="close" size={11} color="white" />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}
const styles = {
  sectionStyle: {
    paddingTop: 4,
    paddingBottom: 4,
    borderTopColor: 'rgba(0,0,0,.07)'
  },
  selectingImageContainer: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'transparent'
  },
  selectingImagesStyle: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15
  },
  imageStyle: {
    flex: 1,
    height: 70,
    resizeMode: 'cover'
  },
  openedImageStyle: {
    flex: 1,
    height: 260,
    marginBottom: 10,
    resizeMode: 'cover'
  },
  filterContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    flex: 1,
    height: 70,
    top: 0,
    right: 0,
    left: 0,
    zIndex: 2
  },
  modalStyle: {
    height: 250,
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    backgroundColor: 'transparent'
  },
  modalTextStyle: {
     alignSelf: 'center',
     color: 'white',
     fontFamily: 'IS_Bold',
     fontSize: 16,
     marginRight: 5
  },
  blackFilterStyle: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5
  }
};
export default ItemCreate;
