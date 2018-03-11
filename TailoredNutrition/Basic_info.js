import React, { Component } from 'react';
import {
    StyleSheet, View, TextInput, Text, Button
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
					<View style = {styles.container}>
					
					<Text style = {styles.description}> 
					Name 
					</Text>
					
					<TextInput style = {styles.inputStyle}
						value = {this.state.inputValue}
						onChangeText = {this.TextChange}
						/>
						
					<Text style = {styles.description}> 
					Age
					</Text>
					
					<TextInput style = {styles.inputStyle}
						value = {this.state1.inputValue}
						onChangeText = {this.TextChange}
						/>
						
					
					</View>
			)
	}
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
								 
								 inputStyle: {
                                 width: 375, height: 44, padding: 8, borderWidth: 1, borderRadius: 8, borderColor: '#48BBEC', marginBottom: 4,
                                 },
                                 });