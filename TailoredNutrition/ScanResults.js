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
      this.state = {result: "365 Everyday Value Electrolyte Water"};
  }

  render() {
    return (
      <View>
        <Text>You have scanned {this.state.result}</Text>
      </View>
    );
  }
}
