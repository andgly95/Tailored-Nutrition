'use strict'
// SEARCH!!!!!!!!
// SEARCH!!!!!!!!
import React, {Component} from 'react';
import {StyleSheet,
    FlatList,
				Button,
                View,
                Text,
                KeyboardAvoidingView,
			} from 'react-native';
import BarCodeScan from '../BarCodeScan';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const SearchForm = t.struct ({
	Search: t.String,
	Branded: t.Boolean,
});

export default class Post extends Component {
    
    constructor(props) {
        super(props);
        this.state = {data: [
            {food_name: 'pizza'},
            {food_name: 'pizza hut'},
            {food_name: 'pizza bagel'}
        ]};
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    }

	barCodePress  = () => {
        console.log('failwhale')
		this.props.navigation.navigate('BarCodeScan');
    }
    
    handleSearchSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        fetch ('https://trackapi.nutritionix.com/v2/search/instant?query=+'+value.Search, {
          method: 'GET',
          headers: new Headers( {
            'x-app-id': 'beeef40f',
            'x-app-key': 'cb4cbe72b287f9c795ac894f3ef544fd',
            'x-remote-user-id' : 0
          })
        }).then(function(response){ 
            //console.log('Success:', response)
            var test = JSON.parse(response['_bodyInit']);
           // var stringme = JSON.stringify(test)
            //console.log(stringme) 
            console.log("Number of Branded Results: " + test.branded.length)
            console.log("Number of Common Results: " + test.common.length)
            let brandSize = 5;
            if (test.branded.length < 5) brandSize = test.branded.length
            //var brandSize = Math.min(test.branded.length, 5);
            //var commonSize = Math.min(test.common.length, 5);
            for (let i = 0; i < brandSize;i++){
                console.log("Result " + i + " " + test.common[i].food_name)
            }
            //console.log(test);
            console.log(this);
            this.setState({data: {food_name: 'gross bagel'}});
            console.log({data})

            
            
        })
    .catch(function(error){ console.log(error)});
      }

render() {
	return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View>
		<Button
		onPress = {this.barCodePress}
		title = "Scan Bar Code"
		/>
		
		<Form type = {SearchForm}
        ref={s => this._form = s}/>
        <Button
        onPress = {this.handleSearchSubmit.bind(this)}
        title = "Search Entries"
        />
		</View>
        <FlatList
        data={this.state.data}
        keyExtractor={(x,i) => i}
        renderItem={({item}) =>
            <Text>
                {item.food_name}
            </Text>}
      />
        </KeyboardAvoidingView>

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
    },
    // styling for buttons
    signButton: {
        height: 182 / 4,
        width: 995 / 4,
        marginTop: 20,
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