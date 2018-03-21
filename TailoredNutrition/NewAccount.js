'use strict';

//Use https://medium.com/react-native-development/easily-build-forms-in-react-native-9006fcd2a73b

import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import ProfileModel from './ProfileModel';
//import ProfileService from './ProfileService';
import SignUp from './SignUp';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
                      username: t.String,
                      email: t.String,
                      password: t.String,
                      terms: t.Boolean
                      });

export default class NewAccount extends Component<{}> {

    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value: ', value);
		//this.setState({ isPressed: true });
        this.props.navigation.navigate('Welcome')
    }
  

  render() {
    console.log('SignIn.render');
    return (
            
    <KeyboardAvoidingView style={styles.container} behavior="padding">
            
        <View style={styles.buttonsContainer}>
        <Form
        ref={c => this._form = c} // assign a ref
        type={User}>
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

