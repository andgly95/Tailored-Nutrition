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

export default class ScanResults extends Component {
  constructor(props) {
    super(props);
      this.state = {result: this.props.navigation.state.params.item};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.title}> {this.state.result.brand_name} {this.state.result.food_name}</Text>
        <Image
          style={{width: 250, height: 250}}
          source={{uri: this.state.result.photo.thumb}}
        />
        <Text>Calories: {this.state.result.nf_calories}</Text>
        <Text>Protein: {this.state.result.nf_protein}</Text>
        <Text>Fat: {this.state.result.nf_total_fat}</Text>
        <Text>Carbohydrates: {this.state.result.nf_total_carbohydrate}</Text>
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