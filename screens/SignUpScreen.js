import React from 'react';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

import AuthService from '../services/AuthService';

import {
  Button,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      unauthorized: false
    };

    this.login = this.login.bind(this);
    // this.signUp = this.signUp.bind(this);
  }

  async login() {
    const { navigate } = this.props.navigation;

    await AuthService.login(this.state.email, this.state.password);

    const authenticated = await AuthService.isSignedIn();
    if (authenticated) navigate('Authenticated');
    else this.setState({ unauthorized: true });
  }

  async loginWithFacebook(navigate) {
    await AuthService.loginWithFacebook();

    const authenticated = await AuthService.isSignedIn();
    if (authenticated) navigate('Authenticated');
    else this.setState({ unauthorized: true });
  }

  async loginWithGoogle(navigate) {
    await AuthService.loginWithGoogle();

    const authenticated = await AuthService.isSignedIn();
    if (authenticated) navigate('Authenticated');
    else this.setState({ unauthorized: true });
  }

  // async signUp() {
    // Luke's code
    // this.setState({ signUp: true });
    // AuthService.signUp(this.state.email, this.state.password);
  // }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.body}>
          <View style={styles.title}>
            <Text style={[Styles.bigTitle, styles.welcomeText]}>Sign up</Text>
          </View>
          <View style={styles.content}>
            {this.state.unauthorized && <View style={Styles.center}><Text style={Styles.errorText}>Invalid username or password</Text></View>}
            <TextInput
              style={styles.textInput}
              autoCapitalize= { 'none' }
              placeholder={"Email Address"}
              autoFocus
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />

            <TextInput
              style={styles.textInput}
              placeholder={"Password"}
              secureTextEntry
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />

            <TouchableHighlight
              style={[Styles.button, {marginTop: 10}]}
              underlayColor={Colors.white}
              onPress={() => (!this.state.email.trim() || !this.state.password.trim()) ? this.login : null}>
              <Text style={Styles.buttonText}>SIGN UP</Text>
            </TouchableHighlight>

            <Text style={styles.orText}>OR</Text>

            <TouchableHighlight
              style={[Styles.button, Styles.buttonInverted, {marginTop: 10}]}
              underlayColor={Colors.white}
              onPress={() => this.loginWithFacebook(navigate)}>
              <Text style={[Styles.buttonText, Styles.buttonInvertedText]}>SIGN UP WITH FACEBOOK</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[Styles.button, Styles.buttonInverted, {marginTop: 10}]}
              underlayColor={Colors.white}
              onPress={() => this.loginWithGoogle(navigate)}>
              <Text style={[Styles.buttonText, Styles.buttonInvertedText]}>SIGN UP WITH GOOGLE</Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 50
  },
  title: {
    alignItems: 'center',
    // marginTop: 20
  },
  logo: {
    width: 75,
    height: 75,
    marginBottom: 10
  },
  welcomeText: {
    marginBottom: 20
  },
  // company: {
  //   color: Colors.primaryColor,
  //   fontFamily: 'Futura',
  //   fontWeight: '700',
  //   fontSize: 28,
  //   textAlign: 'center',
  //   marginTop: 15,
  //   marginBottom: 30
  // },
  content: {
    flex: 1
  },
  textInput: {
    fontFamily: 'Futura-Medium',
    fontSize: 20,
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.lightGray,
  },
  orText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 30,
    marginBottom: 30
  }
});
