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
import FieldValidation from '../services/FieldValidation';
import FirebaseDBService from '../services/FirebaseDBService'

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

  fieldValidation(navigate) {
    if(!FieldValidation.emptyFieldValidation(this.state.email)) {
      this.showAlert('Enter your email address.');
    }else if(!FieldValidation.emailValidation(this.state.email)) {
      this.showAlert('Invalid email address.')
    }else if(!FieldValidation.emptyFieldValidation(this.state.password)){
      this.showAlert('Enter a password.')
    }else if(!FieldValidation.passwordValidation(this.state.password)) {
      this.showAlert('Password must be at least 8 characters long.')
    }else{
      this.signUp(navigate)
    }
  }

  async loginWithFacebook(navigate) {
    let res = await AuthService.loginWithFacebook();
    
    if(res.success) { 
      console.log(res)     
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

  async signUp(navigate) {    
    let res = await AuthService.signUp(this.state.email, this.state.password);
    if(!res.success){
      this.showAlert(res.data)
    }else {
      navigate('CreateAccount')      
    }    
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.body}>
          <View style={styles.title}>
            <Text style={[Styles.bigTitle, styles.welcomeText]}>Sign up</Text>
          </View>
          <View style={styles.content}>
            {/* {this.state.unauthorized && <View style={Styles.center}><Text style={Styles.errorText}>Invalid username or password</Text></View>} */}
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
              onPress={() => this.fieldValidation(navigate)}>
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
