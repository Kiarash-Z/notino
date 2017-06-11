import React, { Component } from 'react';
import { View, Image, TouchableHighlight, FlatList, ScrollView, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Navigation, Input, ItemSection } from '../common';
import ItemAddons from '../elements/ItemAddons';

var ImagePicker = require('react-native-image-picker');

class ItemCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selectedImages: [],
      avatarSource: ' ',
      showImagesModal: false,
      selectedInput: 'ورزشی'
    };
    this.handleAddImage = this.handleAddImage.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.renderSelectedImages = this.renderSelectedImages.bind(this);
    this.test = this.test.bind(this);
  }

  // this will show up images section on icon press
  test() {
    console.log('hello?');
    ImagePicker.showImagePicker(null, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {
    const source = { uri: response.uri };

    // You can also display the image using data:
    // let source = { uri: 'data:image/jpeg;base64,' + response.data };

    this.setState({
      avatarSource: source
    });
  }
});
  }
  handleAddImage(images) {
    this.setState({
      images,
      showImagesModal: !this.state.showImagesModal
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
              selectedImages: [...this.state.selectedImages, item],
              showImagesModal: false
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
      <TouchableHighlight onPress={this.test}>

        <Image
          style={styles.imageStyle}
          source={{ uri: item.node.image.uri }}

        />
      </TouchableHighlight>
    );
  }
  render() {
    const { sectionStyle, selectingImageContainer, } = styles;
    const showImages = () => {
      if (this.state.showImagesModal) {
        return (
          <FlatList
              data={this.state.images}
              renderItem={this.renderImages}
              keyExtractor={item => item.node.timestamp}
              horizontal
          />
        );
      }
    };
    return (
      <View style={{ flex: 0.92 }}>
        <Navigation
          rightInfo="ذخیره"
          rightInfoColor="#0288eb"
          leftIcon="back"
          onLeftButtonPress={() => Actions.category()}
        />
        <Image source={{ uri: this.state.avatarSource }} />
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
              keyExtractor={item => item.node.timestamp}
          />
        </ScrollView>
        <View style={selectingImageContainer}>
          {showImages()}
        </View>
        <ItemAddons addImage={this.handleAddImage} />
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
    height: 50,
    resizeMode: 'cover'
  }
};
export default ItemCreate;
