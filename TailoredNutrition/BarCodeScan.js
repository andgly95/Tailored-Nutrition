import React, { Component }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { BarCodeScanner, Permissions } from 'expo';
import ScanResults from './ScanResults';

export default class BarCodeScan extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      food_name: ''
    };
    this._handleBarCodeRead = this._handleBarCodeRead.bind(this);
  }
  
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    console.log("State",this.state.hasCameraPermission)
    }

    _handleBarCodeRead = ({ type, data,props }) => {
      var self = this;
      fetch ('https://trackapi.nutritionix.com/v2/search/item'+'?upc='+data, {
        method: 'GET',
        headers: new Headers( {
          'x-app-id': 'a895c79f',
          'x-app-key': 'e61b89b47db104313658073ed3bbf420',
          'x-remote-user-id' : 0
        })
      }).then(function(response){
        //console.log(response);
       
        let result = JSON.parse(response['_bodyText']);
        var itemName = result.foods[0].brand_name + " " + result.foods[0].food_name
        console.log(itemName);
        self.setState({
            food_name: itemName
        });
       alert(self.state.food_name);
       self.props.navigation.navigate('ScanResult', 
        {result: self.state.food_name});

      }).catch((error) => {
        console.error(error);
      });
      
    }

  render() {
    const { hasCameraPermission } = this.state;
    console.log("State", this.state.food_name)
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style = {{flex: 1}}>
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={StyleSheet.absoluteFill}
            />

        </View>
        
          
      );
    }
  }

  
}