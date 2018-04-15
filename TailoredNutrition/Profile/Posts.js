'use strict';
// https://www.youtube.com/watch?v=IuYo009yc8w&t=7s    <- use for reference to understand what is happening here.
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native';

export default class Posts extends Component<{}> {
state = {
    data: []
};

componentWillMount(){
    this.fetchData();
}

fetchData = async () => {
    const response = await fetch("https://randomuser.me/api?results=10"); // link to JSON with data
    const json = await response.json();
    this.setState({data: json.results}); 
};


    render(){
    console.log('userLogs.render');
        return(
            <View style = {styles.container}>
                <Text style = {styles.header}> User Log: </Text>     
                    <FlatList 
                        data={this.state.data}
                        keyExtractor= {(x, i) => i}
                        renderItem= {({ item }) =>
                            <Text>
                                {item.name.first} {item.name.last} 
                            </Text>}
                    />
            </View>
        );

    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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