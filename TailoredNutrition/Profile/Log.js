'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';



export default class Log extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            //log: this.props.log,
            tableHead: ['Entry','Time','Cal','Prot','Carb','Fat'],
            tableData: [],
            log: this.props.log,
        };
      }



componentWillMount(){
    this.setTableData();
}
componentWillReceiveProps(newProps) {
    this.setState({log: newProps.log});
}

setTableData = () => {
    console.log('Log Data: ',this.props.log);
    if (this.state.log != undefined) {
        let logObject = this.props.log;
        let logArray = Object.values(logObject)
        console.log('Entry',logArray.length);

        for (let i = 0; i < logArray.length; i++) {
        let entryitem = logArray[i];
        let tableLog = [[entryitem.food_name],[entryitem.time],[entryitem.cal],[entryitem.protein],[entryitem.carbs],[entryitem.fat]];
        console.log('Entry',entryitem);
        this.setState({tableData: tableLog});
        } 
    }
}


    render(){
        const state = this.state;

        return(
            <View style = {styles.container}>
            <Text> LOG OBJECT </Text>
                <Table borderStyle={{borderWidth: 0, borderColor: '#c8e1ff'}}>
                <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                <Rows data={state.tableData} textStyle={styles.text}/>
                </Table>
            </View>
        );

    }

}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },

    head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
});