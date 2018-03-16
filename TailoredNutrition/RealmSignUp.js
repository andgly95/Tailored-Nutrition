'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableHighlight } from 'react-native';

//Add realm
//import RealmSignUp from './RealmSignUp'
const Realm = require('realm');
class Person {}
Person.schema = {
    name : 'Person',
    PrimaryKey: 'name',
    properties:{
        name: 'string',
        age: {type: 'int', default: 12},
        password: 'string',
        weight: {type: 'int', default: 0},
        sex: {type:'bool',default: 1}
    },
};


export default class RealmSignUp extends Component<{}> {
  state = {
    inputValue: "Username"
  };

  state1 = {
    inputValue: "Password"
  };

  state2 = {
    inputValue: "Your Password?"
  };

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };
  

  render() {
    console.log('RealmSignUp.render');
    return (
            
    <View style={styles.container}>
      <View style={styles.Logo}>

        <Image style={styles.Logo}
        source={require("./Resources/Logo.png")}/>


      </View>
            
            <View style={styles.buttonsContainer}>
            <TextInput style={styles.inputStyle}
            value={this.state.inputValue}
            onChangeText={this._handleTextChange}
            />
            
            <TextInput style={styles.inputStyle}
            value={this.state1.inputValue}
            onChangeText={this._handleTextChange}
            />
            
            
            <TextInput style={styles.inputStyle}
            value={this.state1.inputValue}
            onChangeText={this._handleTextChange}
            />

            <Image style={styles.signButton}
            source={require("./Resources/Login.png")}/>
            
            <TouchableHighlight
            onPress={this._onButtonPressed}>
            <Image source={require('./Resources/SignUp.png')}
            style ={styles.signButton}/>
            </TouchableHighlight>
      </View>
    </View>
    );
  }
  _onButtonPressed = () => {
      //Edits made here
        this.setState({ isPressed: true });
        //New realm for a new person
        const realm = new Realm({schema: [Person]});
        realm.write(() => {
            savedPerson = realm.create('Person',{
                name : state,
                password : state1,
            });
        });
        //this.props.navigation.goBack();
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

