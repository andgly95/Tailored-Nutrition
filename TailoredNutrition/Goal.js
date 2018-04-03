'use strict';

//Use https://medium.com/react-native-development/easily-build-forms-in-react-native-9006fcd2a73b

import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import SignUp from './SignUp';
import t from 'tcomb-form-native';

import Expo, { SQLite } from 'expo';

const Form = t.form.Form;

var Activity = t.enums({
  L: 'Not Very Active',
  M: 'Active',
  H: 'Very Active'
});

const Goals = t.struct({
  Height: t.Number,
  DesiredWeight: t.Number,
  ActivityLevel: Activity
});

export default class Goal extends Component<{}> {
  handleSubmit = () => {
    this.props.navigation.navigate('Account')
}
  render() {
    console.log('Goal.render');
    return (
            
    <KeyboardAvoidingView style={styles.container} behavior="padding">
            
        <View style={styles.buttonsContainer}>
        <Form
        ref={d => this._form = d} // assign a ref
        type={Goals}>
        //Found a new form using the tutorial
            
            //</Form>
            <TouchableHighlight
            onPress={this.handleSubmit}>
            <Image style={styles.signButton}
            source={require("./Resources/SignUp.png")}/>
            
            </TouchableHighlight>
            



      </View>
    </KeyboardAvoidingView>
    );
  }
}





const styles = StyleSheet.create({
container: {
  flex: 1,
  //backgroundColor: '#ffffff',
  alignItems: 'center',
  justifyContent: 'center',
},
                               
buttonsContainer: {
  flex: 2,
  //backgroundColor: '#ffffff',
  justifyContent: 'center',
},

// styling for buttons
signButton: {
 // backgroundColor: "white",
  height: 182 / 4,
  width: 995 / 4,
  marginTop: 20,
},
    
inputStyle: {
  width: 375, 
  height: 44, 
  padding: 8, 
  borderWidth: 1, 
  borderRadius: 8, 
  borderColor: '#48BBEC', 
  marginBottom: 4,
},
// styling for Logo
Logo: {
  //backgroundColor: "white",
  width: 375,
  height: 250,
  flexDirection: 'row',
  marginTop: 0,
}
});

