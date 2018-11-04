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

    this.state = {
      email: "",
      showSuccessMessage: false,
      showErrorMessage: false
    };
    this.resetPassword = this.resetPassword.bind(this);
  }

  componentWillUnmount() {
    this.setState = {
      email: "",
      showSuccessMessage: false,
      showErrorMessage: false
    };
  }

  resetPassword() {
    firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
      console.log('email sent');
      this.setState({ showSuccessMessage: true });
    }).catch((error) => {
      console.log('email could not be sent');
      this.setState({ showErrorMessage: true });
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

          {!this.state.showSuccessMessage && !this.state.showErrorMessage && <View>
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
              onPress={() => { !this.state.email.trim() ? null : this.resetPassword() }}>
              <Text style={Styles.buttonText}>RESET</Text>
            </TouchableHighlight>
          </View>}

          {this.state.showSuccessMessage && <View>
            <Text style={[Styles.paragraphText, Styles.textCenter]}>Check your inbox!</Text>
          </View>}

          {this.state.showErrorMessage && <View>
            <Text style={[Styles.paragraphText, Styles.textCenter]}>Something went wrong...</Text>
          </View>}
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
