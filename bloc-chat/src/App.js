import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCy8xYxSUwi8Q-ZbwjRG2uusduFGFfbymA",
    authDomain: "bloc-chat-2e993.firebaseapp.com",
    databaseURL: "https://bloc-chat-2e993.firebaseio.com",
    projectId: "bloc-chat-2e993",
    storageBucket: "bloc-chat-2e993.appspot.com",
    messagingSenderId: "703568849779"
  };
  firebase.initializeApp(config);

class App extends Component {
   
   constructor(props) {
    super(props);
    this.state = {
      activeRoom: null,
      user: [],
      currentRoom: '',
      activeUser:null
    };
  }

  roomChange(activeRoom) {
    this.setState({currentRoom: activeRoom.name});
  }

  setUser(user) {
    this.setState({user: user});
  }

  setRoom(room) {
    this.setState({activeRoom:room});
  }


  render() {
    return (
      <div className="App">
        <section id = "pannel">
        <RoomList id = "room-list" db={firebase} activeRoom={this.state.activeRoom} setRoom={this.setRoom.bind(this)}>
        </RoomList>
        <section id = "user-pannel">
        <User  firebase = {firebase} setUser = {this.setUser.bind(this)} user={this.state.user}>
        </User>
        </section>
        </section>
        <section id = "message-container">
        <MessageList db={firebase} activeRoom={this.state.activeRoom} user={this.state.user}>
        </MessageList>
        </section>
      </div>
    );
  }
}

export default App;
