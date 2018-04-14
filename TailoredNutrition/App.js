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
import BarCodeScan from './BarCodeScan';
import Term from './Term';
import Search from './Search';
import userLog from './userLog';
import userProfile from './Profile/userProfile'



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
        SignIn: {
            screen: SignIn,
        },
		BarCodeScan: {
			screen: BarCodeScan,
		},
		Term: {
			screen: Term,
		},
		Search : {
			screen: Search,
        },
        userLog : {
            screen: userLog,
        },
        userProfile: {
            screen: userProfile,
        }

     },
     {
        initialRouteName: 'Welcome',
     },
     );

export default class App extends Component<{}> {

    //Do creation of tables upon start up of app
  componentDidMount() {

    //Deletes db if we need it
    //DANGERRRRRRRRRRRRRRRRRRRRRRRRRRR
    //console.log( Expo.FileSystem.deleteAsync(Expo.FileSystem.documentDirectory + 'SQLite/db.db' ))

    //Create a table that wil be treated like a session cache?
    db.transaction(
        tx =>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS SESSION (user text primary key UNIQUE);');

        }
    )

    db.transaction(
      tx => {
        //Create the table 
      tx.executeSql(
        //'CREATE TABLE IF NOT EXISTS PROFILE ( username text primary key not null UNIQUE, password text ,sex bool ,age integer, email text  UNIQUE, weight integer );'
        //I would newline each field but it doesn't like it :(
          //USERNAME AS TEXT
          //NAME AS TEXT
          //PASSWORD AS TEXT
          //SEX AS BOOL
          //AGE AS INT
          //EMAIL AS TEXT
          //WEIGHT AS INT
          //HEIGHT AS INT
          //ACTIVITY LEVEL(ACTIVITY) AS INT
          //TARGET WEIGHT(TWEIGHT) AS INT
          'CREATE TABLE IF NOT EXISTS PROFILE ( username text primary key not null UNIQUE, password text,name text, sex bool, age integer,height integer,weight integer,tweight integear,activity integer);'
      );

    //   console.log('All tables within our database:')
    //   tx.executeSql("SELECT * FROM sqlite_master WHERE type='table';",[],(_,{rows: {_array}})=>
    //     console.log(_array) 
    //   );
    //   console.log('\n')


      console.log('Current values for our table::')
      tx.executeSql('SELECT * FROM PROFILE;',[],(_,{rows: {_array}})=>
        console.log(_array) 
      );


    }
    
  );
    console.log('\nTable created!');
    
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


