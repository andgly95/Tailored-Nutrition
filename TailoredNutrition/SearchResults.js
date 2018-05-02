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

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    console.log("INIT, ", this.props.navigation.state.params.item);

      this.state = {result: this.props.navigation.state.params.item};
      console.log("Result", this.state.result);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.title}>The Food Is {this.state.result.food_name}</Text>
        {/*<Image
          style={{width: 250, height: 250}}
          source={{uri: this.state.result.photo.thumb}}
        />*/}
        <Text>Calories: {this.state.result.foods.nf_calories}</Text>
        <Text>Protein: {this.state.result.foods.nf_protein}</Text>
        <Text>Fat: {this.state.result.foods.nf_total_fat}</Text>
        <Text>Carbohydrates: {this.state.result.foods.nf_total_carbohydrate}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 25,
  },
  title: {
    fontSize: 25,
  },
});