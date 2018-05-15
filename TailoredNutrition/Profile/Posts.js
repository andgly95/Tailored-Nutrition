'use strict';
// https://www.youtube.com/watch?v=IuYo009yc8w&t=7s    <- use for reference to understand what is happening here.
// userLogs!!!
// userLogs!!!

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Log from './Log';




import Expo, { SQLite } from 'expo';//Import SQLite

const db = SQLite.openDatabase('db.db'); //Open db here

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            log: {},
        };
      }



componentWillMount(){
    this.fetchData();
}

fetchData = async () => {
    // const response = await fetch("https://randomuser.me/api?results=10"); // link to JSON with data
    // const json = await response.json();
    // this.setState({data: json.results}); 

    
     //I'm pulling and displaying all the logs for the user here, we could filter more by using the date at a later time, but for now i want to display all the logged entries
    let user = String(global.user.user)
        
      
    db.transaction(
        tx => {
      tx.executeSql('SELECT * FROM LOGS WHERE username = ?;',[user],(_,{rows: {_array}})=>{
            
            //console.log(_array);
            let logData = _array
           this.setState({log:logData});

            }
        );
        }
    )


};

_renderItem = ({item, index}) => {
    let self = this;
    //const thumbnail = (item.photo.thumb != undefined) ? item.photo.thumb : 'https://d2xdmhkmkbyw75.cloudfront.net/6131_thumb.jpg';
    return (
      <ListItem
        roundAvatar
        title={item.brand_name+' '+item.food_name}
        subtitle={'Calories: '+item.cal+'  Carbs: '+item.carbs+'  Protein: '+item.protein+'  Fat: '+item.fat}
        item={item}
        key={index}
        //avatar={{ uri: thumbnail }}
        isBranded={this.state.isBranded}
      />
    );
  };
    render(){
    //console.log('userLogs.render');
    //console.log("LOGS: ", this.state.log)


        return(
            <View style = {styles.container}>
                <Text style = {styles.header}> User Log: </Text>  
                    <FlatList 
                        data={this.state.log}
                        keyExtractor= {(x, i) => i}
                        renderItem={this._renderItem}
                    />
            </View>
        );

    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        //alignItems: "center",
        backgroundColor: "white",
    },

    header: {
        color: '#5DADE2',
        marginBottom: 10,
        fontSize: 30,
        textAlign: 'center',
    },

    container1: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },

});