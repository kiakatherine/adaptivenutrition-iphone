import firebase from 'firebase';

class AuthService {
  async login (email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email.trim().toLowerCase(), password)
      return true;
    } catch(err) {
      console.log(err);
      return false;
    }
  }

  async logout () {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      console.log(err);
    }
  }
}

export default new AuthService();
