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

const detailsAPI = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
const searchAPI = 'https://trackapi.nutritionix.com/v2/search/instant?query=';

const Form = t.form.Form;

const SearchForm = t.struct ({
	Search: t.String,
	Branded: t.Boolean,
});

class ListItem extends Component {
    _onPress = () => {
      this.props.onPressItem(this.props.index);
    }
  
    render() {
      const item = this.props.item;
      return (
        <TouchableHighlight
          onPress={this._onPress}
          underlayColor='#dddddd'>
          <View>
            <View style={styles.rowContainer}>
            <TouchableHighlight
            onPress={this._onPress}
            underlayColor='#dddddd'>
            <View>
              <Text>{item.brand_name_item_name} {item.food_name}</Text>
            </View>
          </TouchableHighlight>
            </View>
            <View style={styles.separator}/>
          </View>
        </TouchableHighlight>
      );
    }
  }

export default class Post extends Component {
    
    constructor(props) {
        super(props);
        this.state = {data: ["response goes here"],
      item, [];};
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
        const url = searchAPI+value.Search;
        console.log(url);
        fetch (url, {
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
        }).catch(function(error){ console.log(error)});
        };
    
    _handleResponse = (response) => {
        
        //console.log("Response Handler", response);
        this.setState({data: response});
        console.log(this.state);
    };
    _keyExtractor = (item, index) => index;
    
    _onPressItem = (index) => {
      let entry = this.state.data.common[index];
      console.log('Entry, ', entry.food_name);
      
      const url = detailsAPI;
      console.log("URl: ", url);
      fetch (url, {
        method: 'POST',
        headers: new Headers( {
          'x-app-id': 'a895c79f',
          'x-app-key': 'e61b89b47db104313658073ed3bbf420',
          'x-remote-user-id' : 0,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          query: entry.food_name,
        }),
      }).then(response => {
          //console.log("Response", response);
          return response.json();
      }).then(responseData => {
          ///console.log("Response Data", responseData);
          this._displayDetails(responseData);
          return responseData;
      }).catch(function(error){ console.log(error)});
    };
    _displayDetails = (response) => {
        
      //console.log("Response Handler", response);
      console.log("Navigation About To Be Called:");
      this.setState({item: response});
      return this.props.navigation.navigate('SearchResults',{item: this.state.item.foods[0]});
  };
    _renderItem = ({item, index}) => {
      return (
        <ListItem
          item={item}
          index={index}
          onPressItem={this._onPressItem}
        />
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