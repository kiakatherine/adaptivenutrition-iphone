import React from 'react';

import AuthService from '../../services/AuthService';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  async logout() {
    const { navigate } = this.props.navigation;
    await AuthService.logout();
    navigate('Login');
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={Styles.body}>
        <View style={Styles.title}>
          <Text style={Styles.titleText}>Adaptive Nutrition</Text>
        </View>
        <View style={Styles.content}>
          <Button title="Logout" onPress={this.logout}/>
        </View>
      </View>
    );
  }
}
