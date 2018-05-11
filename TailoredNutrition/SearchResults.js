'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
} from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';


import Expo, { SQLite } from 'expo';//Import SQLite

const db = SQLite.openDatabase('db.db'); //Open db here

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    //console.log("INIT, ", this.props.navigation.state.params.item);

      this.state = {result: this.props.navigation.state.params.item};
      //console.log("Result", this.state.result);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.title}>{this.state.result.brand_name} {this.state.result.food_name}</Text>
        <Image
          style={{width: 250, height: 250}}
          source={{uri: this.state.result.photo.thumb}}
        />
        <Text>Calories: {this.state.result.nf_calories}</Text>
        <View style = {styles.macrodetails}>
          <Text style={{padding: 5}}>Protein: {this.state.result.nf_protein}</Text>
          <Text style={{padding: 5}}>Fat: {this.state.result.nf_total_fat}</Text>
          <Text style={{padding: 5}}>Carbohydrates: {this.state.result.nf_total_carbohydrate}</Text>
        </View>
        <Text>Serving Size: {this.state.result.serving_qty} {this.state.result.serving_unit}</Text>

        
        <View style = {styles.macrodetails}>

        <TouchableHighlight
          onPress = {this._Handlelog}>

          <Image
            style={{width: 50, height: 50}}
            source={require("./Resources/redx.png")}/>

        </TouchableHighlight>

        <TouchableHighlight
          onPress = {this._Handlelog}>

          <Image
            style={{width: 50, height: 50}}
            source={require("./Resources/check.png")}/>

        </TouchableHighlight>

        
        </View>
      </View>
    );
  }

  _Handlelog = () =>{

    let today = new Date()
    let day = String(today).split(' ');
    let date = day[0] +" "+ day[1]+ " " + day[2] + " " + day[3]

    let name = String(global.user.user)
    db.transaction(
      tx => {
        tx.executeSql('INSERT INTO LOGS (username,date,time,food_name,brand_name,qty,serving_unit,cal,fat,carbs,protein,img) values (?,?,?,?,?,?,?,?,?,?,?,?);',
        [name,date,day[4],this.state.result.food_name,this.state.result.brand_name,this.state.result.serving_qty,this.state.result.serving_unit,this.state.result.nf_calories,this.state.result.nf_total_fat,this.state.result.nf_total_carbohydrate,this.state.result.nf_protein,this.state.result.photo.thumb],
        (tx,result) =>{
          console.log("Successfull insert, debug info:\n ", result)
          //Back up to userprofile
          this.props.navigation.navigate('userProfile')
        },(error) => {
          console.log("Error while logging:",error)
          console.log("Failed to log item!")
          alert("Was not able to log item!")
          return
        }
      );

      }
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },
  title: {
    fontSize: 25,
  },
  macrodetails: {
   flexDirection: 'row',
   justifyContent: 'space-between',
  },
});