import { StackNavigator, TabNavigator } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

import HomeScreen from './screens/secure/HomeScreen';
import NutritionScreen from './screens/secure/NutritionScreen';

export const AuthenticatedScreen = TabNavigator({
  Home: {
    screen: HomeScreen,
    headerLeft: null
  },
  Nutrition: { screen: NutritionScreen }
});

export const router = (signedIn = false) => {
  return StackNavigator({
    // Unauthenticated screens
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerLeft: null
      }
    },
    ResetPassword: {
      screen: ResetPasswordScreen
    },
    // Authenticated screens
    Authenticated: {
      screen: AuthenticatedScreen,
      navigationOptions: {
        headerLeft: null
      }
    }
  }, {
    initialRouteName: signedIn ? "Authenticated" : "Login"
  });
};
