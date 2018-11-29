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

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
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
            <Image source={require('../assets/an_logo_green.jpg')} style={styles.logo} />
            <Text style={styles.logoText}>ADAPTIVE NUTRITION</Text>
          </View>
          <View style={styles.title}>
            <Text style={[Styles.bigTitle, styles.welcomeText]}>Feed your happiness</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.buttons}>
              <TouchableHighlight
                style={Styles.button}
                underlayColor={Colors.white}
                onPress={() => navigate('SignUpScreen')}>
                <Text style={Styles.buttonText}>SIGN UP</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[Styles.button, Styles.buttonInverted, styles.secondButton]}
                underlayColor={Colors.white}
                onPress={() => navigate('LoginScreen')}>
                <Text style={[Styles.buttonText, Styles.buttonInvertedText]}>I HAVE AN ACCOUNT</Text>
              </TouchableHighlight>
            </View>
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
  logoText: {
    color: Colors.primaryColor,
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: 'bold',
    marginBottom: 50
  },
  welcomeText: {
    marginBottom: 20
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  buttons: {
    flex: 1
  },
  secondButton: {
    marginTop: 10
  }
});
