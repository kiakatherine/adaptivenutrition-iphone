import React from 'react';

import { StackNavigator, TabNavigator } from 'react-navigation';
import { FontAwesomeIcons, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import LoginScreen from './screens/LoginScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

import BodyweightScreen from './screens/secure/BodyweightScreen';
import ProgressScreen from './screens/secure/ProgressScreen';
import NutritionScreen from './screens/secure/NutritionScreen';
import HelpScreen from './screens/secure/HelpScreen';
import LogoutScreen from './screens/secure/LogoutScreen';

import Colors from './constants/Colors';

export const AuthenticatedScreen = TabNavigator(
  {
    Nutrition: {
      screen: NutritionScreen
    },
    Bodyweight: {
      screen: BodyweightScreen
    },
    Progress: {
      screen: ProgressScreen,
      headerLeft: null
    },
    Help: {
      screen: HelpScreen
    },
    Logout: {
      screen: LogoutScreen
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;

        if (routeName === 'Progress') {
          return (
            <Ionicons
              name={`ios-checkmark${focused ? '' : '-outline'}`}
              size={48}
              style={{ marginBottom: -3 }}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          )
        }

        if (routeName === 'Bodyweight') {
          return (
            <Ionicons
              name={`ios-podium${focused ? '' : '-outline'}`}
              size={28}
              style={{ marginBottom: -3 }}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
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
