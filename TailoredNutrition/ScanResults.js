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
import { TabNavigator, TabBarBottom } from 'react-navigation';

export default class ScanResults extends Component<{}> {
  constructor(props) {
    super(props);
    //let state = this.props.navigation;

  }

  render() {
    return (
      <View>
        <Text>You have scanned {this.props.navigation.params.result}</Text>
      </View>
    );
  }
}
