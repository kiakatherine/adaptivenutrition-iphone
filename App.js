import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  title: {
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: "#4EB54D"
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 24
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50
  },
  loginBox: {
    width: 300,
    borderRadius: 10
  },
  formInput: {
    height: 40,
    margin: 5,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1
  }
});

export default class App extends React.Component {
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
      <View style={styles.body}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Adaptive Nutrition</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.loginBox}>
            <TextInput
              style={styles.formInput}
              placeholder={"Email Address"}
              autoFocus
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />

            <TextInput
              style={styles.formInput}
              placeholder={"Password"}
              secureTextEntry
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <View style={{backgroundColor: "#4EB54D", margin: 5}}>
              <Button
                color="#FFF"
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
