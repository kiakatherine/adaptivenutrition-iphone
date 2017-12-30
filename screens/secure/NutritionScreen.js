import React from 'react';

import AuthService from '../../services/AuthService';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Nutrition',
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={Styles.body}>
        <View style={Styles.title}>
          <Image source={require('../../assets/an_logo.png')} style={{ width: 75, height: 75 }} />
        </View>
        <View>
          <Text style={Styles.titleText}>Meal plan goes here</Text>
        </View>
      </View>
    );
  }
}
