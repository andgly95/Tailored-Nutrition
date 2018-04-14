'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator,
    TouchableHighlight,
    Image,
} from 'react-native';

import SignUp from './SignUp'

import SignIn from './SignIn'
import { colors } from 'react-native-elements';

export default class Welcome extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
        isPressed: 'false'
        };
    }
    render() {
        console.log('Welcome.render');
        return (
                <View style={styles.container}>
                <Text style={styles.description}>
                Welcome to Tailored Nutrition!
                </Text>
                <Text style={styles.description}>
                Get started by answering just a few questions
                </Text>
                
                <TouchableHighlight
                onPress={this._onButtonPressed}>
                <Image source={require('./Resources/start.png')} style={styles.image}/>
                </TouchableHighlight>

<<<<<<< HEAD
                <TouchableHighlight
                onPress = {this._onButtonPressed1}>
                <Text>
                    already have an account? <Text style= {{color: 'blue', marginTop: 30}}> Sign In </Text>
                </Text>
                </TouchableHighlight>

=======
            <TouchableHighlight
                onPress={this._signIn}>
                <Image source={require('./Resources/Login.png')} style={styles.image}/>
                </TouchableHighlight>
                
                
>>>>>>> refs/remotes/origin/master
                </View>
                );
    }
    _signIn = () => {
        this.setState({isPressed: true});
        
        this.props.navigation.navigate('SignIn');
    }
    _onButtonPressed = () => {
        this.setState({ isPressed: true });
        this.props.navigation.navigate('SignUp');
    };
<<<<<<< HEAD
    _onButtonPressed1 = () => {
        this.setState({ isPressed: true });
        this.props.navigation.navigate('SignIn');
    };


//////////////////////////////////////////
=======
>>>>>>> refs/remotes/origin/master
}


const styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    image: {
        height: 182 / 4,
        width: 995 / 4,
        marginTop: 20,
    },
});
