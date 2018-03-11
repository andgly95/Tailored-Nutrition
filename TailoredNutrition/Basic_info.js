import React, { Component } from 'react';
import {
    StyleSheet, View, TextInput, Button
} from 'react-native';

export default class Basic_Info extends Component<{}> {
	state = {
		inputValue: "Name"
	};
	
	state1 = {
		inputValue: "Age"
	};
	
	TextChange = inputValue => {
		this.setState({inputValue});
	};
	
	render() {
		console.log('Basic_info.render');
		
		return (
			
			)
	}
}