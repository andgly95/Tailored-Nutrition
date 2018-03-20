'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator,
    Image,
    Picker,
    TouchableHighlight
} from 'react-native';
import NewAccount from './NewAccount';
import t from 'tcomb-form-native';

const Form = t.form.Form;

var Gender = t.enums({
    M: 'Male',
    F: 'Female'
});

var Person = t.struct({
    Name: t.String,
    weight: t.Number,
    gender: Gender,
    birthDate: t.Date,
  });

export default class SignUp extends Component<{}> {
    state = {user: ''}
    updateUser = (user) => {
        this.setState({ user: user })
    }
    handleSubmit = () => {
        this.props.navigation.navigate('NewAccount');
    }
    render() {
        console.log('SignUp.render');
        return (

            <View style={styles.container}>
            <Form ref={f => this._form = f} // assign a ref
        type={Person}/>
            {/*<Text style={styles.description}>
            Please answer the following questions
            </Text>
            <Text style={styles.description}>
            How old are you?
            </Text>
            <TextInput
            style={styles.searchInput}
            placeholder='Age'/>
            <Text style={styles.description}>
            I am a
            </Text>
            <View>
                
            <Picker selectedValue = {this.state.user} onValueChange = {this.updateUser}style={{height: 200, width: 100}}>
            <Picker.Item label = "Male" value = "male" />
            <Picker.Item label = "Female" value = "Female" />
            </Picker>
            </View>
            <Text style={styles.description}>
            What is your height?
            </Text>
            <TextInput
            style={styles.searchInput}
            placeholder='Height'/>
            <TouchableHighlight
            onPress={this.handleSubmit}>
            <Image source={require('./Resources/start.png')} style={styles.image}/>
            </TouchableHighlight>
        */}
         <TouchableHighlight
            onPress={this.handleSubmit}>
            <Image style={styles.signButton}
            source={require("./Resources/SignUp.png")}/>
            </TouchableHighlight>
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
        marginTop: 65,
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
