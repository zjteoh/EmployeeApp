import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header, Spinner } from './components/common';
import firebase from 'firebase';
import Router from './Router';
import reducer from './reducers';

let {firebase_key} = require('./secret_key');

export default class App extends Component {
  state = { loggedIn: null };
  
  componentDidMount() {
    firebase.initializeApp(firebase_key);
  }

  render() {
    return (
      <Provider store={createStore(reducer, {}, applyMiddleware(ReduxThunk))}>
        <Router/>
      </Provider>
    )
  }
}

const styles = {
  logoutTextStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButtonStyle: {
    alignSelf: 'center'
  }
};
