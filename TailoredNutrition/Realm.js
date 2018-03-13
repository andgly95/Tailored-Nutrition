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
            password: 'string'
        }
    }]
});

let Realm = {
    save: function(profile){
        repository.write(() => {
            profile.Email = new (WTF GOES HERE)  // on example person wrote new Date()
            profile.password = new (WTF GOES HERE) // on example person wrote new Date()
            repository.create('Profile', profile);
        })
    }


}
