'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator,
    TouchableHighlight,
    Image,
} from 'react-native';

import SignUp from './SignUp'

import SignIn from './SignIn'
import { colors } from 'react-native-elements';



//Test

import Expo, { SQLite } from 'expo';//Import SQLite

const db = SQLite.openDatabase('db.db'); //Open db here




// This page is for the initial welcome page for the app which appears upon start-up.
export default class Welcome extends Component<{}> {


    
  componentWillMount() {

    console.log("Welcome page")

    //See if we have a session to skip to userlogs
    db.transaction(
        tx => {
    tx.executeSql('SELECT * FROM PROFILES WHERE rememberme = 1 ;',[],(_,result)=>{
      console.log(result)
       if(result.rows.length != 0){
                console.log("Found a session...Skipping to userlogs")
                var row = result.rows._array[0]
                
                //Update values
                global.user.name = row.name
                global.user.user = row.username
                global.user.age = row.age
                global.user.sex = row.sex
                global.user.height = row.height
                global.user.activity = row.activity
                
                global.user.Limfat = row.lfats
                global.user.LimCarbs = row.lcarbs
                global.user.LimPro = row.lpro
                global.user.LimCal = row.lcal
                






                this.props.navigation.navigate('userProfile')
          
        }
        else{
            console.log("No session has been logged!")
        }
    },(err) => {
        console.log("Could not contact db!")
        console.log(err)
        alert("Unable to contact database on bootup!")
    }
        );
    });
  }

    constructor(props) {
        super(props);
        this.state = {
        isPressed: 'false'
        };
    }
    render() {
        console.log('Welcome.render');


        return (
			// What displays on the initial screen
                <View style={styles.container}>
                <Text style={styles.description}>
                Welcome to Tailored Nutrition!
                </Text>
                <Text style={styles.description}>
                Get started by answering just a few questions
                </Text>
                
                <TouchableHighlight
                onPress={this._onButtonPressed}>
                <Image source={require('./Resources/start.png')} style={styles.image}/>
                </TouchableHighlight>

                <TouchableHighlight
                onPress = {this._onButtonPressed1}>

                <Text>
                    Already have an account? <Text style= {{color: 'blue', marginTop: 30}}> Sign In </Text>
                </Text>
                </TouchableHighlight>

                <TouchableHighlight
                onPress = {this._skip}>
                <Text>
.
                    </Text>
                </TouchableHighlight>

                </View>
                );
    }
    _signIn = () => {
        this.setState({isPressed: true});
        
        this.props.navigation.navigate('SignIn');
    }
    _skip = () => {
        this.props.navigation.navigate('userProfile')
    }
    _onButtonPressed = () => {
        this.setState({ isPressed: true });
        this.props.navigation.navigate('SignUp');
    };
    _onButtonPressed1 = () => {
        this.setState({ isPressed: true });
        this.props.navigation.navigate('SignIn');
    };


//////////////////////////////////////////
}


const styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    image: {
        height: 182 / 4,
        width: 995 / 4,
        marginTop: 20,
    },
});
