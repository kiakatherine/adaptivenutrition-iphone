import React from 'react';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

import AuthService from '../services/AuthService';

import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class CreateAccountScreen extends React.Component {
  static navigationOptions = {
    title: 'Create Account',
  };

  constructor(props) {
    super(props);

    this.state = { email: "" };
    this.signUp = this.signUp.bind(this);
  }

  async signUp() {
    const { navigate } = this.props.navigation;
    await AuthService.signUp(this.state.email, this.state.password);
    const authenticated = await AuthService.isSignedIn();
    if (authenticated) navigate('Authenticated');
    else this.setState({ unauthorized: true });
  }

  render() {
    return (
      <View style={Styles.body}>
        <View style={Styles.title}>
          <Text style={Styles.titleText}>Create Account</Text>
        </View>
        <View style={Styles.content}>
          <Text style={Styles.contentHeading}>
            Enter your email address and create a password.
          </Text>
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
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <View style={{backgroundColor: Colors.primaryColor, margin: 5}}>
            <Button
              title="Create"
              disabled={!this.state.email.trim()}
              onPress={this.signUp}
            />
          </View>
        </View>
      </View>
    );
  }
}
