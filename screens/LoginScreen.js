import React from 'react';
import {
  Button,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Alert,
  AsyncStorage
} from 'react-native';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import AuthService from '../services/AuthService';
import FirebaseDBService from '../services/FirebaseDBService'
import FieldValidation from '../services/FieldValidation';
import NotificationService from '../services/NotificationService';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      unauthorized: false
    };
  }

  showAlert(msg) {
    Alert.alert(
      'Warning!',
      msg,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }

  fieldValidation() {
    if(!FieldValidation.emptyFieldValidation(this.state.email)) {
      this.showAlert('Enter your email address.');
    }else if(!FieldValidation.emailValidation(this.state.email)) {
      this.showAlert('Invalid email address.')
    }else if(!FieldValidation.emptyFieldValidation(this.state.password)){
      this.showAlert('Enter a password.')
    }else{
      this.login()
    }
  }

  async login() {
    const { navigate } = this.props.navigation;
    let res = await AuthService.login(this.state.email, this.state.password);
    let deviceToken = await AsyncStorage.getItem('deviceToken')
    if(res.success) {      
      await AsyncStorage.setItem("user", JSON.stringify(res.data))
      let clientRef = await FirebaseDBService.getClientRef(res.data.uid)
      clientRef.on('value', snapshot => {
        clientResponse = snapshot.val();  
        if(clientResponse) {
          
          AsyncStorage.setItem('saveData', 'true')
          clientRef.update({devicetoken: deviceToken})
          navigate('Authenticated')
          
        }else{
          navigate('CreateAccount')
        }
      });   
    }else {
      this.showAlert(res.data)
    }
  }

  async loginWithFacebook(navigate) {
    let res = await AuthService.loginWithFacebook();
    
    if(res.success) {      
      await AsyncStorage.setItem("user", JSON.stringify(res.data))
      let clientRef = await FirebaseDBService.getClientRef(res.data.uid)
      clientRef.on('value', snapshot => {
        clientResponse = snapshot.val();  
        if(clientResponse) {          
          AsyncStorage.setItem('saveData', 'true')
          navigate('Authenticated')
        }else{
          navigate('CreateAccount')
        }
      });   
    }else {
      this.showAlert(res.data)
    }    
  }

  async loginWithGoogle(navigate) {
    let res = await AuthService.loginWithGoogle();
    
    if(res.success) {      
      await AsyncStorage.setItem("user", JSON.stringify(res.data))
      let clientRef = await FirebaseDBService.getClientRef(res.data.uid)
      clientRef.on('value', snapshot => {
        clientResponse = snapshot.val();  
        if(clientResponse) {         
          AsyncStorage.setItem('saveData', 'true')
          navigate('Authenticated')
        }else{
          navigate('CreateAccount')
        }
      });   
    }else {
      this.showAlert(res.data)
    }    
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.body}>
          <View style={styles.title}>
            <Text style={[Styles.bigTitle, styles.welcomeText]}>Welcome back!</Text>
          </View>
          <View style={styles.content}>
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
              onPress={() => this.fieldValidation()}>
              <Text style={Styles.buttonText}>LOG IN</Text>
            </TouchableHighlight>

            <Text style={styles.orText}>OR</Text>

            <TouchableHighlight
              style={[Styles.button, Styles.buttonInverted]}
              underlayColor={Colors.white}
              onPress={() => this.loginWithFacebook(navigate)}>
              <Text style={[Styles.buttonText, Styles.buttonInvertedText]}>LOG IN WITH FACEBOOK</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[Styles.button, Styles.buttonInverted, {marginTop: 10}]}
              underlayColor={Colors.white}
              onPress={() => this.loginWithGoogle(navigate)}>
              <Text style={[Styles.buttonText, Styles.buttonInvertedText]}>LOG IN WITH GOOGLE</Text>
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
