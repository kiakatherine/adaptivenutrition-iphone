import React from 'react';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

import firebase from '../services/FirebaseService';

import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class ResetPasswordScreen extends React.Component {
  static navigationOptions = {
    title: 'Reset Password',
  };

  constructor(props) {
    super(props);

    this.state = { email: "" };
    this.resetPassword = this.resetPassword.bind(this);
  }

  resetPassword() {
    firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
      console.log('email sent');
    }).catch((error) => {
      console.log('email could not be sent');
    });
  }

  render() {
    return (
      <View style={Styles.body}>
        <View style={Styles.title}>
          <Text style={Styles.titleText}>Forgot Your Password?</Text>
        </View>
        <View style={Styles.content}>
          <Text style={Styles.contentHeading}>
            Enter your email address below and we will send you a new password.
          </Text>
          <TextInput
            style={Styles.forms.textInput}
            placeholder={"Email Address"}
            autoFocus
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <View style={{backgroundColor: Colors.primaryColor, margin: 5}}>
            <Button
              title="Reset Password"
              disabled={!this.state.email.trim()}
              onPress={this.resetPassword}
            />
          </View>
        </View>
      </View>
    );
  }
}
