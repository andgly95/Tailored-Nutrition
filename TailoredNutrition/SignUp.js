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
import { Ionicons } from '@expo/vector-icons'; //
import { TabNavigator, TabBarBottom } from 'react-navigation';
import NewAccount from './NewAccount';
import Goal from './Goal';
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

  const options = {
    fields: {
      birthDate: {
        label: 'Birth Date',
        mode: 'date',
        config: {
          //format: (date) => moment(date).format('YYYY-mm-d'),
        },
      },
    },
  };

class You extends Component<{}> {


    state = {user: ''}
    updateUser = (user) => {
        this.setState({ user: user })
    }
    handleSubmit = () => {
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
            onPress={this.handleSubmit}>
            <Image style={styles.signButton}
            source={require("./Resources/SignUp.png")}/>
            </TouchableHighlight>
            </View>

                );
    }
}

export default TabNavigator(
    {
      You: { screen: You },
      Goal: {screen: Goal },
      Account: { screen: NewAccount },
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
