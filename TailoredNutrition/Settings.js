import React, { Component } from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';

export default class Settings extends Component {
	
	age = {
		inputValue: ""
	};
	
	TextChange = inputValue => {
		this.setState({inputValue});
	};
	
  render() {
    return (
      <Text style = {styles.description}> Old Age </Text>
	 /*<Text style = {styles.description}> Place TextInput Here </Text>
	  <Text style = {styles.description}> Old Gender </Text>
	  <Text style = {styles.description}> Place TextInput Here</Text>
	  <Text style = {styles.description}> Old Weight </Text>
	  <Text style = {styles.description}> Place TextInput Here </Text>
	  <Text style = {styles.description}> Old Height </Text>
	  <Text style = {styles.description}> Place TextInput Here </Text>
	  <Text style = {styles.description}> Old Activity Level </Text>
	  <Text style = {styles.description}> Place TextInput Here </Text>*/
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