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
  TouchableWithoutFeedback,
  View
} from 'react-native';

export default class LoginScreen extends React.Component {
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
    this.signUp = this.signUp.bind(this);
  }

  async login() {
    const { navigate } = this.props.navigation;
    await AuthService.login(this.state.email, this.state.password);

    const authenticated = await AuthService.isSignedIn();
    if (authenticated) navigate('Authenticated');
    else this.setState({ unauthorized: true });
  }

  async signUp() {
    // Luke's code
    // this.setState({ signUp: true });
    // AuthService.signUp(this.state.email, this.state.password);
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.body}>
          <View style={styles.title}>
            <Image source={require('../assets/an_logo_green.jpg')} style={styles.logo} />
          </View>
          <View style={styles.title}>
            <Text style={[Styles.bigTitle, styles.welcomeText]}>Welcome!</Text>
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
            <View style={[Styles.button, styles.loginButton]}>
              <Button
                color={Colors.white}
                title="Login"
                disabled={!this.state.email.trim() || !this.state.password.trim()}
                onPress={this.login}
              />
            </View>
            <View>
              <Button
                color={Colors.primaryColor}
                title="Create account"
                onPress={() => navigate('CreateAccount')} />
            </View>
            <View>
              <Button
                color={Colors.black}
                title="Forgot your password?"
                onPress={() => navigate('ResetPassword')} />
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
    marginTop: 20
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
    padding: 15,
    backgroundColor: Colors.lightGray,
  },
  loginButton: {
    marginTop: 10,
    marginBottom: 20,
    marginRight: 5,
    marginLeft: 5
  }
});
