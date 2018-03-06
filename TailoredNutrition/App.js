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



type Props = {};

const RootStack = StackNavigator(
    {
        Home: {
            screen: SearchPage,
        },
        Questionaire: {
            screen: Questionaire,
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


