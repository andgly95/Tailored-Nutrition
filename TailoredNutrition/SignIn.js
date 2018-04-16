'use strict';

//Use https://medium.com/react-native-development/easily-build-forms-in-react-native-9006fcd2a73b

import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableHighlight, KeyboardAvoidingView,
  ScrollView } from 'react-native';
import SignUp from './SignUp';
import userProfile from './Profile/userProfile'
import t from 'tcomb-form-native';



//DB Stuff
import Expo, { SQLite } from 'expo';
const db = SQLite.openDatabase('db.db');


const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String,
  rememberme: t.Boolean
});

const options = {
  fields: {
    username: {
      label: 'Username',
      error: "Provide a valid Username!"
    },
    password: {
      error: "Invalid Password!"
    },
    rememberme:{
      label: 'Remember Me'
    }


  },
};
    

const formStyles = {
  ...Form.stylesheet,
}

export default class SignIn extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      valid: ''
    };
  }


  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    
    if (value === null){
      console.log("SignIn: Error,Not all fields were filled out.")
      return
    }


    db.transaction(
      tx => {
        tx.executeSql(
          //First get the row if it exists
          'SELECT * FROM PROFILES WHERE username = ?;',
          [value.username],
          (t,result) => {



            if(result.rows.length == 0){
              console.log("No such user:",value.username)
              this.setState({valid: "Try again"});
            }
            else{

              //Instead of executing the query lets just store the data in memory...
              var row = result.rows._array[0]
           
              
              if(row["password"] == value.password)
              {   //If passwords match
                  //Just add username to session's table for now...
                  console.log("Valid user!")
                  if(value.rememberme){
                    tx.executeSql('INSERT OR REPLACE INTO SESSION(user) VALUES (?)  ;',
                    [value.username],
                    ()=>{
                      console.log("Session set to username", value.username)
                    },
                    ()=>{
                      console.log("Was not able to complete the session insert/replace")
                    });
                  }
                
                
                //this.props.navigation.navigate('userProfile')
                this.props.navigation.navigate('userProfile')
                return
              }
              else{ //If passwords don't match
                this.setState({valid:  "Try again"});
                console.log("Password for user",value.username, "was bad!")
                return
              }
              
            }
            
          },
          () => {
            console.log("Failed to execute SignIn query.")
            alert("Cannot contact database, pay us more money!")
            return
          }
        );
      }
    );



  }
  

  render() {
    console.log('SignIn.render');
    return (
      <ScrollView>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.Logo}>


          <Image style={styles.Logo}
          source={require("./Resources/Logo.png")}/>


        </View>
            
        <View style={styles.buttonsContainer}>
          <Form 
          ref={c => this._form = c} // assign a ref
          type={User}
          options = {options}/>
            
          <TouchableHighlight
          onPress={this.handleSubmit}>
            <Image style={styles.signButton}
            source={require("./Resources/Login.png")}/>
            
          </TouchableHighlight>
            
          <TouchableHighlight
          onPress={this._onButtonPressed}>
            <Image source={require('./Resources/SignUp.png')}

            style ={styles.signButton}/>
          </TouchableHighlight>

        </View>
          
      </KeyboardAvoidingView>
      </ScrollView>
    );
  }
  _onButtonPressed = () => {
    this.setState({ isPressed: true });
    this.props.navigation.navigate('SignUp')
  };
  
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

