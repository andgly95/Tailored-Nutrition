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
	ScrollView,
} from 'react-native';

export default class Terms extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
        isPressed: 'false'
        };
    }
    render() {
        console.log('Terms.render');
        return (<ScrollView>
                <View style={styles.container}>
				
                    <Text style={styles.header}>
                    We want you to get fit!
                    </Text>

                    <Text style={styles.subheader}>
                    But for legality sake:
                    </Text>

                    <Text style={styles.description}>
                    As a condition to using Services, you are required to open an account with TailoredNutrition, select a 
                    password and username, and to provide registration information. The registration information you 
                    provide must be accurate, complete, and current at all times. Failure to do so constitutes a breach 
                    of the Terms, which may result in immediate termination of your TailoredNutrition account.

                    You may not use as a username the name of another person or entity or that is not lawfully available 
                    for use, a name or trade mark that is subject to any rights of another person or entity other than you 
                    without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.

                    You are responsible for maintaining the confidentiality of your password and are solely responsible for 
                    all activities resulting from the use of your password and conducted through your TailoredNutrition account.

                    Services are available only to individuals who are either (i) at least 18 years old, or (ii) at least 14 years old, 
                    and who are authorized to access the App by a parent or legal guardian. If you have authorized a minor to use the App,
                    you are responsible for monitoring food intake of said minor, and the consequences of any misuse of the App by the minor. 
                    Adults and legal guardians are warned that the App is not backed by any United States Certified Nutrition Specialist. All 
                    recommendations are simply that, recommendations.

                    

                    </Text>
					

                    </View>
                    </ScrollView>
                );
    }

}


const styles = StyleSheet.create({
    header: {
        color: '#5DADE2',
        marginBottom: 10,
        fontSize: 30,
        textAlign: 'center',
    },
    subheader: {
        color: '#5DADE2',
        marginBottom: 10,
        fontSize: 20,
        textAlign: 'center',
    },
    description: {
        marginBottom: 20,
        fontSize: 14,
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
