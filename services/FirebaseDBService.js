import { AsyncStorage } from 'react-native';
import firebase from 'firebase';

// const ADAPTIVE_SESSION_KEY = "adaptive-session-key";

class FirebaseDBService {
    async getClientRef(clientId) {
      return firebase.database().ref('/clients/' + clientId);
    }

    async setClientData(firstName, lastName, gender, birthdate, height, bodyweight, bodyfat, deviceToken) {
      try {
        let userData = await AsyncStorage.getItem("user");
        let currentUser = JSON.parse(userData);
        const clientId = currentUser.uid;
        const today = new Date();

        await firebase.database().ref('/clients/' + clientId).set({
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          birthdate: birthdate,
          height: height,
          weight: bodyweight,
          bodyfat: bodyfat,
          devicetoken: deviceToken,
          // default values
          phase: 1,
          wakeTime: '7:00',
          phase1trainingIntensity: 0,
          trainingIntensity: 0,
          trainingTime: 0,
          selectedMeal: 0,
          templateType: 0,
          joinDate: today,
          doNotShowMacroWarning: false,
          showInGrams: false,
          viewAllMeals: false,
          totalPoints: 0,
          mealPoints: 0,
          weightPoints: 0,
          quizPoints: 0,
          socialPoints: 0
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
