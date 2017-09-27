import { StackNavigator } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

import HomeScreen from './screens/HomeScreen';

export const router = (signedIn = false) => {
  console.log('We get here...');
  return StackNavigator({
    // Unauthenticated screens
    Login: { screen: LoginScreen },
    ResetPassword: { screen: ResetPasswordScreen },
    // Authenticated screens
    Home: { screen: HomeScreen }
  }, {
    initialRouteName: signedIn ? "Home" : "Login"
  });
};
