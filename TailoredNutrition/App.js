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
import userLog from './userLog';
import userProfile from './Profile/userProfile';
import ScanResults from './ScanResults';



import Expo, { SQLite } from 'expo';//Import SQLite

const db = SQLite.openDatabase('db.db'); //Open db here


global.name = "No name"

type Props = {};

// This is what allos all of the pages of the app to navigate to different pages.
var RootStack = StackNavigator(
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
        userLog : {
            screen: userLog,
        },
        userProfile: {
            screen: userProfile,
        },
        ScanResult: {
            screen: ScanResults,
        }

    },
     {

        initialRouteName: 'userProfile',
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
          //LOGID AS INT
          'CREATE TABLE IF NOT EXISTS PROFILES ( username text primary key not null UNIQUE, password text,name text, sex bool, age integer,height integer,weight integer,tweight integear,activity integer,logid integer );'
      );

    //   console.log('All tables within our database:')
    //   tx.executeSql("SELECT * FROM sqlite_master WHERE type='table';",[],(_,{rows: {_array}})=>
    //     console.log(_array) 
    //   );
    //   console.log('\n')

    
    console.log('Current Session values :')
    tx.executeSql('SELECT * FROM SESSION;',[],(_,result)=>{
      console.log(result)
       if(result.rows.length != 0){
            if (result.rows._array[0].user != null){
                console.log("Found a session...")
                //Handle default screen here
                //this.props.navigation.navigate('Search')
            }
            else{
                console.log("Did not find a session...")
            }
        }
        else{
            console.log("No session has been logged!")
        }
    }
    );

      console.log('Current values for our table:')
      tx.executeSql('SELECT * FROM PROFILES;',[],(_,{rows: {_array}})=>
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
