/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Welcome from './Welcome';
import SignUp from './SignUp';
import SignIn from './SignIn';
import NewAccount from './NewAccount';
import Term from './Term';



import Expo, { SQLite } from 'expo';//Import SQLite

const db = SQLite.openDatabase('db.db'); //Open db here


type Props = {};

const RootStack = StackNavigator(
    {
        Welcome: {
            screen: Welcome,
        },
        SignUp: {
            screen: SignUp,
        },
        NewAccount: {
            screen: NewAccount,
        },
        SignIn: {
            screen: SignIn,
        },

        Term: {
            screen: Term,
        },

     },
     {
        initialRouteName: 'Welcome',
     },
     );

export default class App extends Component<{}> {

    //Do creation of tables upon start up of app
  componentDidMount() {

    //Deletes db if we need it
    console.log( Expo.FileSystem.deleteAsync(Expo.FileSystem.documentDirectory + 'SQLite/db.db' ))
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
    render() {
         return <RootStack />;
    }
}

const styles = StyleSheet.create({
                                 container: {
                                 flex: 1,
                                 },
                                 });


