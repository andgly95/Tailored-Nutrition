'use strict';
// https://hellokoding.com/todo-app-with-react-native-realm/ 
// The link above was followed


import React, { Component } from 'react';

class ProfileModel {
    constructor(username, email, password) {
        this.username = username;
        this.Email = email;
        this.password = password;
    }
}

module.exports = ProfileModel;
