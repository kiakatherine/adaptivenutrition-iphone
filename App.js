import React from 'react';
import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';

import { router } from './router';

import AuthService from './services/AuthService';
import FirebaseDBService from './services/FirebaseDBService'
import NotificationService from './services/NotificationService'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = { 
      authenticated: false,
      saveClientData: false
    };
  }

  async componentWillMount() {
    this.registerForPushNotificationsAsync()
    this._notificationSubscription = Notifications.addListener(this._handleNotification);

    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    let uid
    if(currentUser) uid = currentUser.uid

    let saveData = await AsyncStorage.getItem("saveData")
    console.log(saveData)

    let clientRef, clientResponse
    if(saveData) {
      clientResponse = true
    }else{
      clientRef = await FirebaseDBService.getClientRef(uid)
      clientRef.on('value', snapshot => {
        clientResponse = snapshot.val(); 
      });  
    }
     
    
    return AuthService.isSignedIn()
      .then(res => {        
        if(clientResponse) {
          this.setState({ 
            authenticated: res,
            saveClientData: true
          })    
        }else{
          this.setState({ 
            authenticated: res,
            saveClientData: false
          })
        } 
      });
  }

  // register device token to firebase db.
  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    await AsyncStorage.setItem("deviceToken", token)
    console.log("hahahaha:::" + token)
    
  }

  // receive a notification
  _handleNotification = (notification) => {
    console.log(notification)
  };

  render () {
    const Layout = router(this.state.authenticated, this.state.saveClientData);
    return <Layout />;
  }
}
