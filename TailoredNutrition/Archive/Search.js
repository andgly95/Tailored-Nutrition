'use strict'

import React, {Component} from 'react';
import {StyleSheet,
				Button,
                View,
                FlatList
			} from 'react-native';
import BarCodeScan from './BarCodeScan';
import SearchResults from './SearchResults';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const SearchForm = t.struct ({
	Search: t.String,
	Branded: t.Boolean,
});

<<<<<<< HEAD:TailoredNutrition/Search.js
// This page displays the methods that the user can add nutrition information, either manually or through the barcode scanner.
=======
class ListItem extends React.PureComponent {
    _onPress = () => {
      this.props.onPressItem(this.props.index);
    }
  
    render() {
      const item = this.props.item;
      const price = item.price_formatted.split(' ')[0];
      return (
        <TouchableHighlight
          onPress={this._onPress}
          underlayColor='#dddddd'>
          <View>
            <View style={styles.rowContainer}>
              <Image style={styles.thumb} source={{ uri: item.img_url }} />
              <View style={styles.textContainer}>
                <Text style={styles.price}>{price}</Text>
                <Text style={styles.title}
                  numberOfLines={1}>{item.title}</Text>
              </View>
            </View>
            <View style={styles.separator}/>
          </View>
        </TouchableHighlight>
      );
    }
  }

>>>>>>> Andrew:TailoredNutrition/Archive/Search.js
export default class Search extends Component<{}> {
	
	barCodePress  = () => {
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
            console.log(test)
            console.log(test.branded[0])
            this.props.navigator.push({
                title: 'Results',
                component: SearchResults,
                passProps: {common: test.common}
              });
              
        });
      }
      _keyExtractor = (item, index) => index;

      _renderItem = ({item}) => {
        return (
          <TouchableHighlight
            underlayColor='#dddddd'>
            <View>
              <Text>{item.title}</Text>
            </View>
          </TouchableHighlight>
        );
        
      };
render() {
	return (
		// This is what is displayed on the search screen, which has options for barcode scanning and manual search.
		<View style={styles.container}>
		<Button
		onPress = {this.barCodePress}
		title = "Scan Bar Code"
		/>
		
		<Form type = {SearchForm}
        ref={s => this._form = s}/>
        <Button
        onPress = {this.handleSearchSubmit}
        title = "Search Entries"
        />
        <FlatList
        data={this.props.listings}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
		</View>

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
        marginTop: 30,
    },
    // styling for buttons
    signButton: {
        height: 182 / 4,
        width: 995 / 4,
        marginTop: 20,
   },
	//styling for the text input for manual searches
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