import React from 'react';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

const loginStyles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50
  },
  loginBox: {
    width: 300,
    borderRadius: 10
  }
});

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.login = this.login.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  login() {
    console.log("Send API request here...");
  }

  resetPassword() {
    console.log("Navigate to reset password screen...");
  }

  render() {
    return (
      <View style={Styles.body}>
        <View style={Styles.title}>
          <Text style={Styles.titleText}>Adaptive Nutrition</Text>
        </View>
        <View style={loginStyles.content}>
          <View style={loginStyles.loginBox}>
            <TextInput
              style={Styles.forms.textInput}
              placeholder={"Email Address"}
              autoFocus
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />

            <TextInput
              style={Styles.forms.textInput}
              placeholder={"Password"}
              secureTextEntry
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <View style={{backgroundColor: Colors.primaryColor, margin: 5}}>
              <Button
                color={Colors.primaryColorText}
                title="Login"
                disabled={!this.state.email.trim() || !this.state.password.trim()}
                onPress={this.login}
              />
            </View>
            <View style={{margin: 5}}>
              <Button title="Forgot your password?" onPress={this.resetPassword}/>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
