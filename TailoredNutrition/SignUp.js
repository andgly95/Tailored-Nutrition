'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator,
    Image,
    Picker,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; //
import { TabNavigator, TabBarBottom } from 'react-navigation';
import t from 'tcomb-form-native';



//DB Stuff
import Expo, { SQLite } from 'expo';
const db = SQLite.openDatabase('db.db');




const Form = t.form.Form;

var Activity = t.enums({
  0: 'Not Very Active',
  1: 'Active',
  2: 'Very Active'
});



var Gender = t.enums({
    0: 'Male',
    1: 'Female'
});

var Person = t.struct({
    Name: t.String,
    weight: t.Number,
    gender: Gender,
    age: t.Number,
    Height: t.Number,
    DesiredWeight: t.Number,
    ActivityLevel: Activity,
    username: t.String,
    password: t.String,
    terms: t.Boolean
  });

  const options = {
    fields: {
      
    },
  };

export default class You extends Component<{}> {

  state = {user: ''}
  updateUser = (user) => {
    this.setState({ user: user })
  }
  handleSubmit = () => {
    var re = this._form.getValue();
    if (re == null){
      console.log("Error:Not all fields were filled out.")
    }
    else {
      console.log(re);
      //Check if they read the TOS
      if (re.terms != 1){
        alert("Please confirm that you read our TOS which allows us to sell your information! ")
        return
      }
        
/*
      ADD MORE CHECKS HERE FOR AGE, HEIGHT AND SO ON

*/

      //Handle storage here, no touchy please
      db.transaction(
        tx => {
          //Check first for a duplicate user
          tx.executeSql(
           'SELECT * FROM PROFILE WHERE username = ?;',
           [re.username],
           (tx,result) => {
             console.log(result.rows.length)
            if(result.rows.length != 0){
              console.log(result)
              //If results.length isn't zero then we found a matching row with same username
              console.log("Sign up failed due to possible duplicate user.")
              alert(`Please try again with a different username!`);
            }
            else{
                console.log("Inserting new user...")
                //If we reach here we should insert a new entry
                tx.executeSql('INSERT INTO PROFILE (username, password,name, sex, age,height,weight,tweight,activity) VALUES (?,?,?,?,?,?,?,?,?);',
                [re.username,re.password,re.Name,re.gender,re.age,re.Height,re.DesiredWeight,re.ActivityLevel],
                (tx,result) =>{
                  console.log("Successfull insert, debug info:\n ?", result)
                  
                this.props.navigation.navigate('Search')
                }
              );
            }
          }
          );
        }
      );


    };
  }
  render() {
    console.log('SignUp.render');
    return (
      <ScrollView>
        <View style={styles.container}>
          <Form ref={f => this._form = f} // assign a ref
            type={Person} 
            options = {options}/> 
          <TouchableHighlight
            onPress={this.handleSubmit}>
            <Image style={styles.signButton}
            source={require("./Resources/SignUp.png")}/>
            </TouchableHighlight>
            
            </View>
</ScrollView>
                );
    }
}


  const styles = StyleSheet.create({
    description: {
        marginBottom: 10,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
        marginTop: 30
    },
    // styling for buttons
    signButton: {
        height: 182 / 4,
        width: 995 / 4,
        marginTop: 20,
   },
    image: {
        height: 182 / 4,
        width: 995 / 4,
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        marginBottom: 10,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
        },
});
