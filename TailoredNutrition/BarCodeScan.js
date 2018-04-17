import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { BarCodeScanner, Permissions } from 'expo';

export default class BarCodeScan extends React.Component {
  state = {
    hasCameraPermission: null,
    data:[]
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    }

  render() {
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

  _handleBarCodeRead = ({ type, data }) => {
    fetch ('https://trackapi.nutritionix.com/v2/search/item'+'?upc='+data, {
      method: 'GET',
      headers: new Headers( {
        'x-app-id': 'beeef40f',
        'x-app-key': 'cb4cbe72b287f9c795ac894f3ef544fd',
        'x-remote-user-id' : 0
      })
    }).then(function(response){
      let result = JSON.parse(response['_bodyText']);
      console.log(result.foods[0].brand_name + result.foods[0].food_name);
      //this.setState(result.)
    })
  }
}