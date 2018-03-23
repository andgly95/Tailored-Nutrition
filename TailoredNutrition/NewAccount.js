'use strict';

//Use https://medium.com/react-native-development/easily-build-forms-in-react-native-9006fcd2a73b

import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import SignUp from './SignUp';
import t from 'tcomb-form-native';

import Expo, { SQLite } from 'expo';

const Form = t.form.Form;


const db = SQLite.openDatabase('db.db');

const User = t.struct({
                      username: t.String,
                      //Add back later?
                      //email: t.String,
                      password: t.String,
                      terms: t.Boolean
                      });

export default class NewAccount extends Component<{}> {

  
  componentDidMount() {

    console.log()
    db.transaction(
      tx => {
        //Create the table 
      tx.executeSql(
        //'CREATE TABLE IF NOT EXISTS PROFILE ( username text primary key not null UNIQUE, password text ,sex bool ,age integer, email text  UNIQUE, weight integer );'
        //I would newline each field but it doesn't like it :(
          //USERNAME AS TEXT
          //PASSWORD AS TEXT
          //SEX AS BOOL
          //AGE AS INT
          //EMAIL AS TEXT
          //WEIGHT AS INT
          'CREATE TABLE IF NOT EXISTS PROFILE ( username text primary key not null UNIQUE, password text);'
      );

      console.log('All tables within our database:')
      tx.executeSql("SELECT * FROM sqlite_master WHERE type='table';",[],(_,{rows: {_array}})=>
        console.log(JSON.stringify(_array)) 
      );
      console.log('\n')


      //console.log('Current values for our table::')
     // tx.executeSql('SELECT * FROM PROFILE;',[],(_,{rows: {_array}})=>
      //  console.log(JSON.stringify(_array)) 
     // );


    }
    
  );
    console.log('\nCreated table (Hopefully)?');
    
  }

  
    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        db.transaction(
          tx => {
              //Updates username/password
              //USERNAME MUST HAVE A VALUE, do a client side check using form to make sure value is non-null
            tx.executeSql(`INSERT INTO PROFILE (username,password) VALUES (?,?);`, [value.username,value.password]);
            console.log('Saved user as ', value.username, " with a password of" , value.password )
            console.log('Updated rows for database:')
            //Get all the data from Profile
            tx.executeSql('SELECT * from PROFILE;', 
            //arguments
            [],
            //On success function
            (_, { rows: {_array} }) =>
              console.log(JSON.stringify(_array))
            );
          }
          //,
          //null,
          //this.update
          );
        console.log('\nValue: ', value);
    }
  


    DeleteTable = () => {
      db.transaction(
        tx => {
          tx.executeSql('DELETE FROM PROFILE;');
          console.log('Table should be dropped...:\n')
          //Delete query isn't working for some reason.
        }
      );
      this.props.navigation.goBack();
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
            

           <TouchableHighlight
            onPress={this.DeleteTable}>
            <Image style={styles.signButton}
            source={require("./Resources/SignUp.png")}/>
            </TouchableHighlight>


      </View>
    </KeyboardAvoidingView>
    );
  }
  _onButtonPressed = () => {
        this.setState({ isPressed: true });
      
      
        this.props.navigation.navigate('You');
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

