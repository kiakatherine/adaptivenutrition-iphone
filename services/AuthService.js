import { AsyncStorage } from 'react-native';
import firebase from 'firebase';

// const ADAPTIVE_SESSION_KEY = "adaptive-session-key";

class AuthService {
  async login (email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email.trim().toLowerCase(), password)
      console.log('User is: ', firebase.auth().currentUser);
      // TODO: Check isEmailVerified, if not firebase.auth().signOut()
      // await AsyncStorage.setItem(ADAPTIVE_SESSION_KEY, "true");
    } catch(err) {
      console.log(err);
    }
  }

  async logout () {
    try {
      await firebase.auth().signOut();
      // await AsyncStorage.removeItem(ADAPTIVE_SESSION_KEY);
      // await firebase.auth().signOut();
    } catch (err) {
      console.log(err);
    }
  }

  currentUser () { return firebase.auth().currentUser; }

  async isSignedIn () {
    try {
      // const isLoggedIn = await AsyncStorage.getItem(ADAPTIVE_SESSION_KEY);
      return !!firebase.auth().currentUser;
      return isLoggedIn !== null
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async signUp(email, password) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new AuthService();
