import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDMQrA8O84Y0jxYT0hoj8RXCLLLvKs_93I",
  authDomain: "chatterbyte-210301.firebaseapp.com",
  databaseURL: "https://chatterbyte-210301.firebaseio.com/"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
