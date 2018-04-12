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
import NewAccount from './NewAccount';
import BarCodeScan from './BarCodeScan';
import Term from './Term';
import Search from './Search';
import userLog from './userLog';

type Props = {};

const RootStack = StackNavigator(
    {
        Welcome: {
            screen: Welcome,
        },
        SignUp: {
            screen: SignUp,
        },
        NewAccount: {
            screen: NewAccount,
        },
        SignIn: {
            screen: SignIn,
        },
		BarCodeScan: {
			screen: BarCodeScan,
		},
		Term: {
			screen: Term,
		},
		Search : {
			screen: Search,
        },
        userLog : {
            screen: userLog,
        },

     },
     {
        initialRouteName: 'userLog',
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


