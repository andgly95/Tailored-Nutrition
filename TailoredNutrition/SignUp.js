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



//DB Stuff
import Expo, { SQLite } from 'expo';
const db = SQLite.openDatabase('db.db');




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

<<<<<<< HEAD
    state = {user: ''}
    updateUser = (user) => {
        this.setState({ user: user })
    }
    handleSubmit = () => {
       

      let user = "";
      db.transaction(
        tx=>{
          tx.executeSql('SELECT * FROM PROFILE',[],
            (_,results) =>
              console.log(results)
            )
        }
      );


        //Grab the form so we can take the data...
        const value = this._form.getValue(); // use that ref to get the form value
        console.log("\nRead in...",value);
        //Now move information into our database...
        db.transaction(
          tx => {
            tx.executeSql('UPDATE * FROM PROFILE WHERE username = ?;'
                  ,[value.Name],
                  (tx, results ) =>
                    console.log(JSON.stringify(results))
          
          
        );
      }
    );
         
        this.props.navigation.navigate('Goal')
        
    }
    render() {
        console.log('SignUp.render');
        return (

            <View style={styles.container}>
            <Form ref={f => this._form = f} // assign a ref
        type={Person} 
        options = {options}/>
            
         <TouchableHighlight
=======
  state = {user: ''}
  updateUser = (user) => {
    this.setState({ user: user })
  }
  handleSubmit = () => {
    if (this._form.getValue() == null){console.log("error")}
    else {console.log(this._form.getValue());
    this.props.navigation.navigate('Search')};
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
>>>>>>> master
            onPress={this.handleSubmit}>
            <Image style={styles.signButton}
            source={require("./Resources/SignUp.png")}/>
            </TouchableHighlight>
            
            </View>
</ScrollView>
                );
    }
}

<<<<<<< HEAD
export default TabNavigator(
    {
      Account: { screen: NewAccount },
      You: { screen: You },
      Goal: {screen: Goal },
     
    },
    {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Home') {
            iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          } else if (routeName === 'Settings') {
            iconName = `ios-options${focused ? '' : '-outline'}`;
          }
  
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
      }),
      tabBarComponent: TabBarBottom,
      tabBarPosition: 'bottom',
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
      animationEnabled: false,
      swipeEnabled: true,
    }
  );
  
=======
>>>>>>> master

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
