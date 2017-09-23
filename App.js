import React from 'react';
import { StackNavigator } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

export default StackNavigator({
  Login: { screen: LoginScreen },
  ResetPassword: { screen: ResetPasswordScreen }
});
