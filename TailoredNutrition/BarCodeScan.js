import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

// The app page responsible for the bar code scanner of food.
export default class BarCodeScan extends React.Component {
  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    }

  render() {
	  // This will make sure that the app has permission from the camera on the phone before it is able to read barcodes.
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
  }

  	// This is what performs the barcode read operations.
  _handleBarCodeRead = ({ type, data }) => {
    fetch ('https://trackapi.nutritionix.com/v2/search/item'+'?upc='+data, {
      method: 'GET',
      headers: new Headers( {
        'x-app-id': 'beeef40f',
        'x-app-key': 'cb4cbe72b287f9c795ac894f3ef544fd',
        'x-remote-user-id' : 0
      })
    }).then(response => console.log('Success:', response));
  }
}