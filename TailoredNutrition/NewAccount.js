'use strict';

//Use https://medium.com/react-native-development/easily-build-forms-in-react-native-9006fcd2a73b

import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import SignUp from './SignUp';
import Term from './Term';
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

  

  
    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log(value);
        let existinguser = 0; //Bool to hold if we have a user 
        //Now move information into our database...
        db.transaction(
          tx => {
            tx.executeSql('SELECT * FROM PROFILE WHERE username = ?;'
                  ,[value.username],
                  (tx, results ) =>{
                    //console.log(JSON.stringify(results));
                    //tx holds the transaction info and results holds the results info
                    if(results.length != 0){
                      console.log("Possible duplicate user...");
                      //Check if we selected any rows, if so flip the existing user to signal that we shouldn't proceed
                      existinguser = 1;
                      //Decide how to handle this condition where we have a user with the same name...
                      //this.props.navigation.navigate('You') //For now redirect to the same page?
                      return;
                    }
                    else
                      console.log("Name has passed the check...");
                    
                  }
                );
          });
         
          console.log("User count",existinguser);        
          if (existinguser == 0){
            console.log("New user...Adding information...")
           db.transaction(
              tx => {
                tx.executeSql('INSERT INTO PROFILE (username,password) VALUES (?,?);', 
                //arguments
                [value.username,value.password],
                //On success function
                (_, { rows: {_array} }) =>{
                  console.log(JSON.stringify(_array));
                  console.log("stored information");
                });
                

                //Wipe our sessions table...
                tx.executeSql('DELETE FROM SESSION;',[],()=>
                    console.log("Deleted session information..."));


                // //Insert user into our sessions table...
                // tx.executeSql('INSERT INTO SESSION (USER) VALUES ?;',[value.username],
                // (_, results) =>{
                //   console.log(results);
                //   console.log("UPDATED SESSION?");
                // });

              });
          }

          this.props.navigation.navigate('You')


        // db.transaction(
        //   tx => {
        //       //Updates username/password
        //       //USERNAME MUST HAVE A VALUE, do a client side check using form to make sure value is non-null
        //     tx.executeSql(`INSERT INTO PROFILE (username,password) VALUES (?,?);`, [value.username,value.password]);
        //     console.log('Saved user as ', value.username, " with a password of" , value.password )
        //     console.log('Updated rows for database:')
        //     //Get all the data from Profile
        //     tx.executeSql('SELECT * from PROFILE;', 
        //     //arguments
        //     [],
        //     //On success function
        //     (_, { rows: {_array} }) =>
        //       console.log(JSON.stringify(_array))
        //     );
        //   }
        //   //,
        //   //null,
        //   //this.update
        //   );
        // console.log('\nValue: ', value);
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
    console.log('NewAccount.render');
    return (
            
    <KeyboardAvoidingView style={styles.container} behavior="padding">
            
        <View style={styles.buttonsContainer}>
        <Form
        ref={c => this._form = c} // assign a ref
        type={User}>
        //Found a new form using the tutorial
            
            //</Form>
          <TouchableHighlight
            onPress={this._onButtonPressed1}>
              <Text style = {{color: '#656565'}}>
                Click <Text style = {{color: 'red'}}> here </Text> to view terms and conditions
              </Text>
          </TouchableHighlight>

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
    _onButtonPressed1 = () => {
      this.setState({ isPressed: true });
      this.props.navigation.navigate('Term');
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

