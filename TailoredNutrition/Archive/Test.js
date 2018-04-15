'use strict';
import Expo, { SQLite } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableHighlight } from 'react-native';

const db = SQLite.openDatabase('db.db');


//import Test from './Test'




export default class Test extends Component<{}> {

  //Creates the table if we do not have it already
  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists person (id integer primary key not null, username text, password text, weigth int, value text);'
      );
    });
  }


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
    console.log('Test.render');
    return (
            
      <View style={styles.container}>

     
       
            <View style={styles.buttonsContainer}>
            <TextInput style={styles.inputStyle}
            value={this.state.inputValue}
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
        this.setState({ isPressed: true });

        //Save values in the states into our database
        db.transaction(
          tx => {
              //Updates username/password?
            tx.executeSql(`update person set username = ?`, [state]);
            tx.executeSql(`update person set password = ?`, [state1]);
          },
          null,
          this.update
          );

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