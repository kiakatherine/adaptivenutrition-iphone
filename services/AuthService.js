import { AsyncStorage } from 'react-native';
import firebase from 'firebase';

const ADAPTIVE_SESSION_KEY = "adaptive-session-key";

class AuthService {
  async login (email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email.trim().toLowerCase(), password)
      await AsyncStorage.setItem(ADAPTIVE_SESSION_KEY, "true");
    } catch(err) {
      console.log(err);
    }
  }

  async logout () {
    try {
      await firebase.auth().signOut();
      await AsyncStorage.removeItem(ADAPTIVE_SESSION_KEY);
    } catch (err) {
      console.log(err);
    }
  }

  async isSignedIn () {
    try {
      const isLoggedIn = await AsyncStorage.getItem(ADAPTIVE_SESSION_KEY);
      return isLoggedIn !== null
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export default new AuthService();
