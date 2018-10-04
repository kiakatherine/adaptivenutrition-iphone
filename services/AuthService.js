import { AsyncStorage } from 'react-native';
import firebase from 'firebase';

// const ADAPTIVE_SESSION_KEY = "adaptive-session-key";

class AuthService {
  async login (email, password) {
    try {
      const user = firebase.auth().currentUser;
      await firebase.auth().signInWithEmailAndPassword(email.trim().toLowerCase(), password);
      console.log('User is: ', user);
      // TODO: Check isEmailVerified, if not firebase.auth().signOut()
      // if(!user.emailVerified) {
      //   await firebase.auth().signOut();
      // }
      // await AsyncStorage.setItem(ADAPTIVE_SESSION_KEY, "true");
    } catch(err) {
      console.log(err);
    }
  }

  async loginWithGoogle() {
    try {
      const result = await Expo.Google.logInAsync({
        iosClientId: "665936865751-vlq2i4bcek37mkhb38h8tm0958iu3crp.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .then(res => {
        })
        .catch(error => {
          console.log("firebase cred err:", error);
        });
      }
    } catch(e) {

    }
  }

  async loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '424797598049653',
      { permissions: ['public_profile'] }
    );
    
    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
  
      firebase.auth().signInWithCredential(credential).catch((error) => {

      });
    }
  }
  
  async resetPassword (email) {
    try {
      await firebase.auth().re;
      // await AsyncStorage.removeItem(ADAPTIVE_SESSION_KEY);
      // await firebase.auth().signOut();
    } catch (err) {
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
