'use strict';
import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, Button, Alert } from 'react-native';
import t from 'tcomb-form-native';

import Expo, { SQLite } from 'expo';//Import SQLite

const db = SQLite.openDatabase('db.db'); //Open db here
const Form = t.form.Form;

var Activity = t.enums({
  0: 'Not Very Active',
  1: 'Active',
  2: 'Very Active'
});

var Level = t.struct({
    ActivityLevel: Activity
  });

  const options = {
    fields: {
      
    },
  };
  
export default class Settings extends Component {
	
/*	age = {
		inputValue: " "
	};
	
	weight = {
		inputValuer:" "
	};
	
	TextChange = inputValue => {
		this.setState({inputValue});
	};
	
	TextModify = inputValuer=> {
		this.setState({inputValuer});
	};*/
	
		Presser = ( ) => {
            
         var update = this._form.getValue();
         db.transaction(
            tx => {
                tx.executeSql(
                    'UPDATE PROFILES SET age = ?,weight = ?,activity = ? WHERE username = ?;',
                    [this.state.age,this.state.weight,update,global.user.user],(_,_array)=>{
                        global.user.age = this.state.age
                        global.user.weight = this.state.weight
                        
                    }
                ) 
            }
        );




        Alert.alert('Settings saved!',);
        this.props.navigation.navigate('userProfile')
	};
	
	 constructor(props) {
    super(props);
    this.state = { age: 'New Age',
							weight:'New Weight'};
  }
	
  render() {
    return (
		<View style = {styles.container}>
      <Text style = {styles.description}>Current Age: {global.user.age}</Text>
	  <TextInput 
	  			value = {this.state.age}
				onChangeText = {(age) => this.setState({age})}
		/>
		<Text> </Text>
	  <Text style = {styles.description}> Current Weight: {global.user.weight} </Text>
	 	<TextInput 
	  			value = {this.state.weight}
				onChangeText = {(weight) => this.setState({weight})}
		/>
		<Text> </Text>
		 <Form ref={f => this._form = f} 
            type={Level} 
            options = {options}/> 
			<Text> </Text>
		<Button
			title = "Save Changes"
			style = {styles.signButton}
			onPress = {this.Presser}
			/>
			</View>
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
	// styling for input fields
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