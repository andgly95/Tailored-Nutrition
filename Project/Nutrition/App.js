import React, {Component} from 'react';
import { StyleSheet, Text, Button, View, Alert, TextInput } from 'react-native';

export default class App extends React.Component {
	state = {
		inputValue: "The word can be changed!"
	};
	
	TextChange = inputValue => {
		this.setState({inputValue});
	};
	
	Presser = ( ) => {
		Alert.alert(
		'Button pressed',);
	};
  render() {
    return (
      <View style={styles.container}>
        <Text>ASDFQRS</Text>
	  	<Button
	  				title = "Press me"
	  				onPress = {this.Presser}
	  				/>
					
			<TextInput
					value = {this.state.inputValue}
					onChangeText = {this.TextChange}
					style = {{width : 120, height : 30, padding : 8}}
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
});
