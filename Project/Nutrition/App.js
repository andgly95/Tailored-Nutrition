import React, {Component} from 'react';
import { StyleSheet, Text, Button, View, Alert, TextInput } from 'react-native';

export default class App extends React.Component {
	state = {
		inputValue: " "
	};

	inert = {
		inputValuer: " "
	};
	
	verify = {
		inputValuest: " "
	};
	
	TextChange = inputValue => {
		this.setState({inputValue});
	};
	
	TextModify = inputValuer => {
		this.setState({inputValuer});
	};
	
	TextMutate = inputValuest => {
		this.setState({inputValuest});
	};
	
	Presser = ( ) => {
		Alert.alert(
		'Button pressed',);
	};
  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.NewText}> Email </Text>
	 	<TextInput
					value = {this.state.inputValue}
					onChangeText = {this.TextChange}
					style = {{width : 360, height : 30, padding : 8}}
					/>
		<Text> </Text>
					
		<Text style = {styles.NewText}> Username </Text>
			<TextInput
					value = {this.inert.inputValuer}
					onChangeText = {this.TextModify}
					style = {{width : 360, height : 30, padding : 8}}
					/>
		<Text> </Text>
					
		<Text style = {styles.NewText}> Password </Text>
				<TextInput
					value = {this.verify.inputValuest}
					onChangeText = {this.TextMutate}
					style = {{width : 360, height : 30, padding : 8}}
					/>
		<Text> </Text>
					
	  	<Button
	  				title = "Sign Up"
	  				onPress = {this.Presser}
	  				/>
					
		
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  NewText: {
  	fontSize: 30,
	fontWeight: 'bold'
  },
});
