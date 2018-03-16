'use strict';
// https://hellokoding.com/todo-app-with-react-native-realm/ 
// The link above was followed


import Realm from 'realm';
import React, { Component } from 'react';

let repository = new Realm({
    schema: [{
        name: 'Profile',
        primaryKey: 'Email',
        properties: {
            Email: 'string',
            password: 'string',
	    username: 'string'
        }
    }]
});

let Realm = {
    save: function(profile){
        repository.write(() => {
            repository.create('Profile', profile);
        })
    }


}
