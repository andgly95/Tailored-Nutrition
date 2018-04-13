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
    TouchableHighlight,
    ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; //
import { TabNavigator, TabBarBottom } from 'react-navigation';
import t from 'tcomb-form-native';

const Form = t.form.Form;

var Activity = t.enums({
  L: 'Not Very Active',
  M: 'Active',
  H: 'Very Active'
});



var Gender = t.enums({
    M: 'Male',
    F: 'Female'
});

var Person = t.struct({
    Name: t.String,
    weight: t.Number,
    gender: Gender,
    age: t.Number,
    Height: t.Number,
    DesiredWeight: t.Number,
    ActivityLevel: Activity,
    username: t.String,
    password: t.String,
    terms: t.Boolean
  });

  const options = {
    fields: {
      
    },
  };

export default class You extends Component<{}> {

  state = {user: ''}
  updateUser = (user) => {
    this.setState({ user: user })
  }
  handleSubmit = () => {
    if (this._form.getValue() == null){console.log("error")}
    else {console.log(this._form.getValue());
    this.props.navigation.navigate('You')};
  }
  render() {
    console.log('SignUp.render');
    return (
      <ScrollView>
        <View style={styles.container}>
          <Form ref={f => this._form = f} // assign a ref
            type={Person} 
            options = {options}/> 
          <TouchableHighlight
            onPress={this.handleSubmit}>
            <Image style={styles.signButton}
            source={require("./Resources/SignUp.png")}/>
            </TouchableHighlight>
            
            </View>
</ScrollView>
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
