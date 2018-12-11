import React from 'react';
import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';

import { router } from './router';

import AuthService from './services/AuthService';
import NotificationService from './services/NotificationService'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = { authenticated: false };
  }

  componentWillMount() {
    this.registerForPushNotificationsAsync()
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    return AuthService.isSignedIn()
      .then(res => this.setState({ authenticated: res }));
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
    const Layout = router(this.state.authenticated);
    return <Layout />;
  }
}
