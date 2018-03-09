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
import SearchPage from './SearchPage';
import Questionaire from './Questionaire';
import SignIn from './SignIn';



type Props = {};

const RootStack = StackNavigator(
    {
        Home: {
            screen: SearchPage,
        },
        Questionaire: {
            screen: Questionaire,
        },
        SignIn: {
            screen: SignIn,
        },
     },
     {
        initialRouteName: 'Home',
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


