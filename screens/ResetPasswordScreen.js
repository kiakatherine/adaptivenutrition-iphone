import React from 'react';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

import firebase from '../services/FirebaseService';

import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
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
        <Text style={[Styles.bigTitle, Styles.pageTitle, styles.pageTitle]}>Forgot Your Password?</Text>
        <View style={Styles.content}>
          <Text style={[Styles.paragraphText, Styles.textCenter]}>
            {"No worries! Enter your email address below and we'll send you a new password."}
          </Text>
          <TextInput
            style={Styles.forms.textInput}
            placeholder={"Email Address"}
            autoFocus
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TouchableHighlight
            style={[Styles.button, styles.button]}
            underlayColor={Colors.white}
            onPress={() => { !this.state.email.trim() ? this.resetPassword : null }}>
            <Text style={Styles.buttonText}>RESET</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageTitle: {
    marginTop: 40,
    fontSize: 24
  },
  button: {
    marginTop: 20
  }
});
