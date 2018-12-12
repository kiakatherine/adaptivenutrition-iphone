import { AsyncStorage } from 'react-native';
import firebase from 'firebase';


// const ADAPTIVE_SESSION_KEY = "adaptive-session-key";

class NotificationService {
    // async getClientsInfoRef() {
    //     console.log('okokok')
    //     // const clientsRef = firebase.database().ref().child('clients')
    //     // clientsRef.on('value', snapshot => {
    //     //     console.log(snapshot.val())
    //     // });
    // }

    sendNotification(deviceToken) {
        const url = 'https://exp.host/--/api/v2/push/send';
        fetch(url, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'accept-encoding': 'gzip, deflate',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                to: deviceToken,
                title:"hello",
                body: "world"
            })
        }).then(res=>{

        }).catch(err=>{

        })
    }
}

export default new NotificationService();