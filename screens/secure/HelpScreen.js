import React from 'react';

import AuthService from '../../services/AuthService';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

import ModalWindow from '../../components/ModalWindow';
import MenuRow from '../../components/MenuRow';

import {
  Button,
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Help',
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={Styles.body}>
        <View style={Styles.title}>
          <Image source={require('../../assets/an_logo.png')} style={{ width: 75, height: 75 }} />
        </View>

        <ModalWindow label="Biometric Settings" currentModal="BIOMETRIC_SETTINGS" />
        <ModalWindow label="Foods to Avoid" currentModal="FOODS_TO_AVOID" />
        <Text style={Styles.menuItem} onPress={() => Linking.openURL('http://adaptivenutrition.us/resources')}>Educational Resources</Text>
        <Text style={Styles.menuItem} onPress={() => Linking.openURL('mailto:support@adaptivenutrition.us')}>Contact</Text>
        <ModalWindow label="About" currentModal="ABOUT" />
      </View>
    );
  }
}
