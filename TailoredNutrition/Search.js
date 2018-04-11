'use strict'

import React, {Component} from 'react';
import {StyleSheet,
				Button,
				View
			} from 'react-native';
import BarCodeScan from './BarCodeScan';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const SearchForm = t.struct ({
	Search: t.String,
	Branded: t.boolean,
});

export default class Search extends Component<{}> {
	
	handleSubmit  = () => {
		this.props.navigation.navigate('BarCodeScan');
	}


render() {
	return (
		<View style={styles.container}>
		<Button
		onPress = {this.handleSubmit}
		title = "Scan Bar Code"
		/>
		
		<Form type = {SearchForm}/>
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
        marginTop: 30,
        alignItems: 'center'
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