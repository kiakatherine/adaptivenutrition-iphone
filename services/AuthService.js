import { AsyncStorage } from 'react-native';
import firebase from 'firebase';

// const ADAPTIVE_SESSION_KEY = "adaptive-session-key";

class AuthService {
  async login (email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email.trim().toLowerCase(), password);

      const user = firebase.auth().currentUser;
      await AsyncStorage.setItem("user", JSON.stringify(user))
      // TODO: Check isEmailVerified, if not firebase.auth().signOut()
      // if(!user.emailVerified) {
      //   await firebase.auth().signOut();
      // }
      // await AsyncStorage.setItem(ADAPTIVE_SESSION_KEY, "true");
    } catch(err) {
      // console.log(err);
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
        await firebase.auth().signInAndRetrieveDataWithCredential(credential);

        const user = firebase.auth().currentUser;
        await AsyncStorage.setItem("user", JSON.stringify(user))
      }
    } catch(e) {

    }
  }

  async loginWithFacebook() {
    try {

    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '424797598049653',
      { permissions: ['public_profile', 'email'] }
    );

    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      firebase.auth().signInWithCredential(credential);

      const user = firebase.auth().currentUser;
      await AsyncStorage.setItem("user", JSON.stringify(user));

      if (user != null) {
        console.log(user);
      } else {
        console.log("not user");
      }

    } else {

    }
  } catch(e) {

  }
  }

  async resetPassword (email) {
    try {
//      await firebase.auth().re;
      // await AsyncStorage.removeItem(ADAPTIVE_SESSION_KEY);
      // await firebase.auth().signOut();
    } catch (err) {
      // console.log(err);
    }
  }

  async logout () {
    try {
      await firebase.auth().signOut();
      await AsyncStorage.removeItem("user");
    } catch (err) {
      console.log(err);
    }
  }

  async isSignedIn () {
    try {
      // await AsyncStorage.removeItem("user")
      let userData = await AsyncStorage.getItem("user")
      let currentUser = JSON.parse(userData)
      // console.log(currentUser)
      if(currentUser){
        return true
      }else{
        return false
      }

    } catch (err) {
      // console.log(err);
      return false;
    }
  }

  async signUp(email, password, firstName, lastName, gender, birthdate, height, bodyweight, bodyfat) {
    try {
      const user = firebase.auth().currentUser;
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await AsyncStorage.setItem("user", JSON.stringify(user))
      return {
        success: true,
        data: user
      }
    } catch (err) {
      return {
        success: false,
        data: err.message
      }
    }
  }
}

export default new AuthService();
