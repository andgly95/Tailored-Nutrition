import Expo, { SQLite } from 'expo';

import React, { Component } from 'react';

const db = SQLite.openDatabase('db.db');
module.exports = SQLite.openDatabase({ name: 'db.db' });


export default class dataBase extends Component<{}> {

    componentDidMount() {
        db.transaction(
          tx => {
            //Create the table if it doesn't exist
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS PERSON ( username text primary key not null UNIQUE, password text ,sex bool ,age integer, email text  UNIQUE, weight integer );'
          );
          //Test to see if we created the table...
          tx.executeSql("select * from PERSON;", [], (_, { tables }) =>
            console.log(JSON.stringify(tables))
           
          );
        }
        
      );
        console.log('Created table');
        
      }
}