
import React, { Component } from 'react';
import { StyleSheet, View, Platform, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import Header from './src/components/Header';
import LoginForm from './src/components/LoginForm';
import Button from './src/components/Button';

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      loggedIn: null
    };
    this.createContent = this.createContent.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount = () => {
    firebase.initializeApp({
      apiKey: 'AIzaSyA-pFe-XdKvn--CQ9vqdvQrzqE_MOQtS_Q',
      authDomain: 'authentication-47eae.firebaseapp.com',
      databaseURL: 'https://authentication-47eae.firebaseio.com',
      projectId: 'authentication-47eae',
      storageBucket: 'authentication-47eae.appspot.com',
      messagingSenderId: '200050452269'
    });
    firebase.auth().onAuthStateChanged(user => { 
      if (user) { this.setState({ loggedIn: true }); }
      else { this.setState({ loggedIn: false }); }
    });
  }

  logout() {
    firebase.auth().signOut();
  }

  createContent() {
    switch (this.state.loggedIn) {
      case false:
        return (
          <LoginForm />
        );
      case true:
          return (
              <Button onPress={this.logout}>Log out</Button>
          );
      case null:
            return (
              <ActivityIndicator size={'large'} color={'#0000ff'} />
            );
      default:
        break;
    }
  }
  

  render() {
    return (
      <View style={styles.container}>
        <Header headerText={'Login'} />

        <View style={{ height: 60 }}>
          { this.createContent() }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
  },
});
