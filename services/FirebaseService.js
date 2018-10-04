import * as firebase from 'firebase';

/*
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID
} from 'react-native-dotenv'; */

FIREBASE_API_KEY = "AIzaSyBuZ_uJth6SPb76TxZwvthNqHQgEfeJM30"
FIREBASE_AUTH_DOMAIN = "adaptive-nutrition.firebaseapp.com"
FIREBASE_DATABASE_URL = "https://adaptive-nutrition.firebaseio.com"
FIREBASE_PROJECT_ID = "adaptive-nutrition"
FIREBASE_STORAGE_BUCKET = "adaptive-nutrition.appspot.com"
FIREBASE_MESSAGING_SENDER_ID = "665936865751"

firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
});

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export default firebase;
