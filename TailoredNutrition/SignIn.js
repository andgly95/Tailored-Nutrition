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
                      password: t.String,
                      terms: t.Boolean
                      });

export default class SignIn extends Component<{}> {


  

  render() {
    console.log('SignIn.render');
    return (
            
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.Logo}>

        <Image style={styles.Logo}
        source={require("./assets/Logo.png")}/>


      </View>
            
            <View style={styles.buttonsContainer}>
            <Form type={User}>
          //Found a new form using the tutorial
            
            {/*}<TextInput style={styles.inputStyle}
            name = "username"
            placeholder = 'Username'
            onChangeText={this._handleTextChange}
            />
            
            <TextInput style={styles.inputStyle}
            name = "password"
            placeholder = 'Password'
            onChangeText={this._handleTextChange}
              />*/}
            //</Form>
            <Image style={styles.signButton}
            source={require("./assets/Login.png")}/>
            
            <TouchableHighlight
            onPress={this._onButtonPressed}>
            <Image source={require('./assets/SignUp.png')}
            style ={styles.signButton}/>
            </TouchableHighlight>
      </View>
    </KeyboardAvoidingView>
    );
  }
  _onButtonPressed = () => {
        this.setState({ isPressed: true });
        this.props.navigation.goBack();
    };
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
                                 
  buttonsContainer: {
    flex: 2,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // styling for buttons
  signButton: {
    backgroundColor: "white",
    height: 182 / 4,
    width: 995 / 4,
    marginTop: 20,
  },
      
                                 inputStyle: {
                                 width: 375, height: 44, padding: 8, borderWidth: 1, borderRadius: 8, borderColor: '#48BBEC', marginBottom: 4,
                                 },
  // styling for Logo
  Logo: {
    backgroundColor: "white",
    width: 375,
    height: 250,
    flexDirection: 'row',
    marginTop: 10,
  }

});

