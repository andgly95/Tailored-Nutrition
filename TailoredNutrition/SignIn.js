'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableHighlight } from 'react-native';

import Questionaire from './Questionaire'

export default class SignIn extends Component<{}> {
  state = {
    inputValue: "Username"
  };

  state1 = {
    inputValue: "Password"
  };

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };
  

  render() {
    console.log('SignIn.render');
    return (
      <View style={styles.container}>

        <Image style={styles.Logo}
        source={require("./assets/Logo.png")}/>

        <TextInput style={{ width: 375, height: 44, padding: 8 }}
          value={this.state.inputValue}
          onChangeText={this._handleTextChange}
        />

        <TextInput style={{ width: 375, height: 44, padding: 8}}
          value={this.state1.inputValue}
          onChangeText={this._handleTextChange}
        />

        <Image style={styles.signButton}
        source={require("./assets/Login.png")}/>

        <TouchableHighlight
        onPress={this._onButtonPressed}>
        <Image source={require('./assets/SignUp.png')} 
        style ={styles.signButton}/>
        </TouchableHighlight>

      </View>
    );
  }
  _onButtonPressed = () => {
        this.setState({ isPressed: true });
        this.props.navigation.navigate('Home');
    };
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // styling for buttons
  signButton: {
    backgroundColor: "white",
    height: 50,
    width: 275,
    marginTop: 20
  },

  // styling for Logo
  Logo: {
    backgroundColor: "white",
    width: 375,
    height: 250,
    flexDirection: 'row',
    marginTop: 45
  }

});

