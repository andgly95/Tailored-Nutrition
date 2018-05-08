'use strict'
// SEARCH!!!!!!!!
// SEARCH!!!!!!!!
import React, {Component} from 'react';
import {StyleSheet,
    FlatList,
                Button,
                TouchableHighlight,
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
        this.state = {data: ["response goes here"]};
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.barCodePress = this.barCodePress.bind(this);
    }

	barCodePress  = () => {
        console.log('failwhale')
        console.log(this.state)
		this.props.navigation.navigate('BarCodeScan', {navigation: this.props.navigation});
    }
    
    handleSearchSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        var self = this;
        fetch ('https://trackapi.nutritionix.com/v2/search/instant?query=+'+value.Search, {
          method: 'GET',
          headers: new Headers( {
            'x-app-id': 'beeef40f',
            'x-app-key': 'cb4cbe72b287f9c795ac894f3ef544fd',
            'x-remote-user-id' : 0
          })
        }).then(response => {
            //console.log("Response", response);
            return response.json();
        }).then(responseData => {
            ///console.log("Response Data", responseData);
            this._handleResponse(responseData);
            return responseData;
        })
    .catch(function(error){ console.log(error)});
      };
    
    _handleResponse = (response) => {
        
        //console.log("Response Handler", response);
        this.setState({data: response});
        console.log(this.state);
    };
    _keyExtractor = (item, index) => index;
    _renderItem = ({item}) => {
        return (
          <TouchableHighlight
            underlayColor='#dddddd'>
            <View>
              <Text>{item.brand_name_item_name} {item.food_name}</Text>
            </View>
          </TouchableHighlight>
        );
    };
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
        <FlatList
        data={this.state.data.common}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
        </View>
        </KeyboardAvoidingView>

        );
    };
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