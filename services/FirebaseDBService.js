import { AsyncStorage } from 'react-native';
import firebase from 'firebase';

// const ADAPTIVE_SESSION_KEY = "adaptive-session-key";

class FirebaseDBService {
    async getClientRef(clientId) {
      return firebase.database().ref('/clients/' + clientId);        
    }

    async setClientData(firstName, lastName, gender, birthdate, height, bodyweight, bodyfat, deviceToken) {
      try {
        let userData = await AsyncStorage.getItem("user")
        let currentUser = JSON.parse(userData)
        const clientId = currentUser.uid
        await firebase.database().ref('/clients/' + clientId).set({
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          birthdate: birthdate,
          height: height,
          weight: bodyweight,
          bodyfat: bodyfat,
          devicetoken: deviceToken
        });
        return {
          success: true,
          data: null
        }      
      }catch (err) {
        return {
          success: false,
          data: err.message
        }
      }
    }
}

export default new FirebaseDBService();

