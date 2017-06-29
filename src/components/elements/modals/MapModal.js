import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-simple-modal';
import MapView, { Marker } from 'react-native-maps';
import { inject, observer } from 'mobx-react';
import { BoxShadow } from 'react-native-shadow';
import { Icon } from '../../common';

@inject('itemLocationStore')
@observer
class MapModal extends Component {
  render() {
    const { itemLocationStore } = this.props;
    const { mapModalStyle,
            mapModalTextStyle,
            markerStyle,
            imageModalTextStyle,
            modalBottomContainerStyle,
            mapModalTitleStyle } = styles;
    const showMapPoint = () => {
        if (Object.keys(itemLocationStore.marker).length !== 0) {
          return (
            <Marker
              coordinate={{
                latitude: itemLocationStore.latitude,
                longitude: itemLocationStore.longitude
                }}
            >
              <BoxShadow setting={shadowOpt}>
                <View style={markerStyle} />
              </BoxShadow>
            </Marker>
          );
        }
      };
    const mapSaveAndCloseToggle = () => {
        if (Object.keys(itemLocationStore.marker).length !== 0) {
          return (
            <TouchableWithoutFeedback onPress={() => itemLocationStore.addMapToList()}>
              <View style={modalBottomContainerStyle}>
                <Text style={mapModalTextStyle}>ذخیره</Text>
                <Icon name="checkmark" size={17} color="#0087ed" />
              </View>
            </TouchableWithoutFeedback>
          );
        }
        return (
          <TouchableWithoutFeedback onPress={() => { itemLocationStore.showMapModal = false; }}>
            <View style={modalBottomContainerStyle}>
              <Text style={[imageModalTextStyle, { color: 'black' }]}>بستن</Text>
              <Icon name="close" size={11} color="black" />
            </View>
          </TouchableWithoutFeedback>
        );
      };
    return (
      <Modal
        open={itemLocationStore.showMapModal}
        modalDidClose={() => { itemLocationStore.showMapModal = false; }}
        modalStyle={mapModalStyle}
      >
        <Text style={mapModalTitleStyle}>مکان خودتون رو انتخاب کنید!</Text>
        <View style={{ flex: 1, height: 70 }}>
          <MapView
            style={{
              ...StyleSheet.absoluteFillObject,
            }}
            onPress={itemLocationStore.handleMapPress}
            initialRegion={{
              latitude: 32.4279,
              longitude: 53.6880,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            {showMapPoint()}
          </MapView>
        </View>
          {mapSaveAndCloseToggle()}
      </Modal>
    );
  }
}
const shadowOpt = {
	width: 15,
	height: 15,
	color: '#0087ed',
	border: 0,
	radius: 5,
	opacity: 0.12,
	x: 0,
	y: 3,
	style: { marginVertical: 5 }
};
const styles = {
  mapModalStyle: {
    height: 400,
    paddingRight: 0,
    paddingLeft: 0
  },
  mapModalTextStyle: {
    alignSelf: 'center',
    color: '#0087ed',
    fontFamily: 'IS_Bold',
    fontSize: 16,
    marginRight: 5,
    marginTop: 5
  },
  mapModalTitleStyle: {
    alignSelf: 'center',
    color: 'black',
    fontFamily: 'IS_Reg',
    fontSize: 15,
    marginBottom: 5
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

export default MapModal;
