/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Welcome from './Welcome';
import SignUp from './SignUp';
import SignIn from './SignIn';
import RealmSignIn from './RealmSignUp'



type Props = {};

const RootStack = StackNavigator(
    {
        Welcome: {
            screen: Welcome,
        },
        RealmSignUp:{
            screen: RealmSignUp,
        },
        SignUp: {
            screen: SignUp,
        },
        SignIn: {
            screen: SignIn,
        },
     },
     {
        initialRouteName: 'RealmSignUp',
     },
     );

export default class App extends Component<{}> {
    render() {
         return <RootStack />;
    }
}

const styles = StyleSheet.create({
                                 container: {
                                 flex: 1,
                                 },
                                 });


