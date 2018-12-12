import React from 'react';

import { StackNavigator, TabNavigator } from 'react-navigation';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';
// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

import CreateAccountScreen from './screens/secure/CreateAccountScreen';
import ProgressScreen from './screens/secure/ProgressScreen';
import NutritionScreen from './screens/secure/NutritionScreen';
import HelpScreen from './screens/secure/HelpScreen';
import EducationScreen from './screens/secure/EducationScreen';
import ScoreboardScreen from './screens/secure/ScoreboardScreen';
import LogoutScreen from './screens/secure/LogoutScreen';

import Colors from './constants/Colors';

export const AuthenticatedScreen = TabNavigator(
  {
    Nutrition: {
      screen: NutritionScreen
    },
    Progress: {
      screen: ProgressScreen
    },
    Education: {
      screen: EducationScreen
    },
    Help: {
      screen: HelpScreen
    },
    // Logout: {
    //   screen: LogoutScreen
    // }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;

        if (routeName === 'Progress') {
          return (
            <Ionicons
              name={`ios-checkmark${focused ? '' : '-outline'}`}
              size={28}
              style={{ marginBottom: -3 }}
              // color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
              color='green'
            />
          )
        }

        if (routeName === 'Nutrition') {
          return (
            <MaterialCommunityIcons
              name={'food-apple'}
              size={28}
              style={{ marginBottom: -3 }}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          )
        }

        if (routeName === 'Education') {
          return (
            <MaterialCommunityIcons
              name={'school'}
              size={28}
              style={{ marginBottom: -3 }}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          )
        }

        if (routeName === 'Scoreboard') {
          return (
            <MaterialCommunityIcons
              name={'trophy'}
              size={28}
              style={{ marginBottom: -3 }}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          )
        }

        if (routeName === 'Help') {
          return (
            <MaterialCommunityIcons
              name={'help'}
              size={28}
              style={{ marginBottom: -3 }}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          )
        }

        if (routeName === 'Logout') {
          return (
            <Ionicons
              name={`ios-exit${focused ? '' : '-outline'}`}
              size={28}
              style={{ marginBottom: -3 }}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          )
        }
      }
    })
  }
);

export const router = (signedIn = false, saveClientData = false) => {
  console.log(signedIn, saveClientData)
  return StackNavigator({
    // Unauthenticated screens
    WelcomeScreen: {
      screen: WelcomeScreen,
      navigationOptions: {
        headerLeft: null
      }
    },
    SignUpScreen: {
      screen: SignUpScreen,
      navigationOptions: {
        headerLeft: null
      }
    },
    CreateAccount: {
      screen: CreateAccountScreen,
      navigationOptions: {
        headerLeft: null
      }
    },
    LoginScreen: {
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
    initialRouteName: signedIn ? ( saveClientData ? "Authenticated" : "CreateAccount") : "WelcomeScreen"
  });
};
