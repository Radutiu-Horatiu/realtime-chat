import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

class Fire {
  constructor() {
    this.init();
    this.observeAuth();
  }

  // connection to the firebase database, unique credentials from Project Settings>Your apps
  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDtCtkYhlSMTgVoZezPFUtMkGMo-9H_bIE",
        authDomain: "nxt-chat-78308.firebaseapp.com",
        databaseURL: "https://nxt-chat-78308.firebaseio.com",
        projectId: "nxt-chat-78308",
        storageBucket: "nxt-chat-78308.appspot.com",
        messagingSenderId: "129939867339",
        appId: "1:129939867339:web:b77c0360b0604c9c8d7d4e",
        measurementId: "G-P094CR9VQ6"
      });
    }
  };

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  // authenticating user and allowing anonymous users
  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  // getting unique credentials
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  // referencing the 'messages' table in the firebase database
  get ref() {
    return firebase.database().ref('messages');
  }

  // formating the message in order to be displayed nicely
  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  // getting messages to be displayed from the database
  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  // timestamp for the message
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // sending message to be stored in the database
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  // appening the message in the chat
  append = message => this.ref.push(message);

  // closing connection
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;