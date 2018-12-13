import React from 'react';
import {
  Button,
  DatePickerIOS,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Alert,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';

import { AsyncStorage } from 'react-native';
import Swiper from 'react-native-swiper';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';
import moment from 'moment';
import { TextInputMask } from 'react-native-masked-text'


import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';
import AuthService from '../../services/AuthService';
import FirebaseDBService from '../../services/FirebaseDBService';
import FieldValidation from '../../services/FieldValidation';

export default class CreateAccountScreen extends React.Component {
  static navigationOptions = {
    title: 'Create Account',
  };

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      gender: '',
      birthdate: '',
      height: '',
      bodyweight: '',
      bodyfat: '',      

      page: 0,
      showError: false
    };
  }

  componentDidMount () {
    
  }

  componentWillUnmount () {
    
  }

  showAlert(page, msg) {
    Alert.alert(
      'Warning!',
      msg,
      [
        {text: 'OK', onPress: () => {
          this.refs.swiper.scrollBy(page)   
        }},
      ],
      { cancelable: false }
    )
  }

  async saveClientData(navigate) {
    let valid = this.refs.birthText.isValid()
    if(!FieldValidation.emptyFieldValidation(this.state.firstName) || !FieldValidation.emptyFieldValidation(this.state.lastName)) {
      this.showAlert(-5, 'Enter your First Name and Last Name')
    }else if(!FieldValidation.emptyFieldValidation(this.state.gender)){
      this.showAlert(-4, 'Select your gender.')
    }else if(!valid) {
      this.showAlert(-3, 'Enter your birthday correctly.')
    }else if(!FieldValidation.birthValidation(this.state.birthdate)) {
      this.showAlert(-3, 'Age should be 12 years or older.')
    }else if(FieldValidation.heightValidation(this.state.height) == -1) {
      this.showAlert(-2, 'Enter your height.')
    }else if(FieldValidation.heightValidation(this.state.height) == 0) {
      this.showAlert(-2, 'The height should be at least 8 inches.')
    }else if(FieldValidation.weightValidation(this.state.bodyweight) == -1) {
      this.showAlert(-1, 'Enter your weight.')
    }else if(FieldValidation.weightValidation(this.state.bodyweight) == 0) {
      this.showAlert(-1, 'The weight should be at most 600 pounds.')
    }else if(FieldValidation.bodyFatPercentageValidation(this.state.bodyfat) == -1) {
      this.showAlert(0, 'Enter your body fat.')
    }else if(FieldValidation.bodyFatPercentageValidation(this.state.bodyfat) == 0){
      this.showAlert(0, 'The body fat should be at most 75%.')
    }else{
      let deviceToken = await AsyncStorage.getItem("deviceToken")
      let res = await FirebaseDBService.setClientData(this.state.firstName, this.state.lastName, this.state.gender, this.state.birthdate, this.state.height, this.state.bodyweight, this.state.bodyfat, deviceToken);
      if(res.success) {
        await AsyncStorage.setItem('saveData', 'true')
        navigate('Authenticated');
      }else this.showAlert(0, res.data, false)
    }    
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={Styles.body}>
          <Swiper
            ref='swiper'
            style={styles.wrapper}
            showsButtons={true}
            loop={false}
            index={0}
            >          
            <View style={styles.slide1}>
              <TextInput
                ref='firstNameText'
                style={styles.input}
                placeholder={"First name"}
                maxLength={20}
                onChangeText={firstName => this.setState({ firstName })}
                value={this.state.firstName}
                autoFocus={false}
              />
              
              <TextInput
                ref='lastNameText'
                style={styles.input}
                placeholder={"Last name"}
                maxLength={20}
                onChangeText={lastName => this.setState({ lastName })}
                value={this.state.lastName}
                autoFocus={false}
              />
            </View>

            <View style={styles.slide1}>
              <View style={styles.genderButtons}>
                <TouchableHighlight
                  style={[Styles.flexCol, styles.femaleButton]}
                  onPress={() => this.setState({ gender: 'F' }) }>
                    <Text style={[Styles.textCenter, this.state.gender == 'F' && {color: 'red'}]}>
                      <FontAwesome
                        name='female'
                        size={36}
                      />
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={[Styles.flexCol]}
                  onPress={() => this.setState({ gender: 'M' }) }>
                    <Text style={[Styles.textCenter, this.state.gender == 'M' && {color: 'red'}]}>
                    <FontAwesome
                      name='male'
                      size={36}
                    />
                  </Text>
                </TouchableHighlight>
              </View>

              <Text style={[Styles.paragraphText, styles.blurb]}>Men and women vary in body fat percentage...</Text>
            </View>

            <View style={styles.slide1}>           
              <TextInputMask
                ref='birthText'
                type={'datetime'}
                options={{
                  format: 'MM-DD-YYYY'
                }}
                style={styles.input}
                placeholder={"MM-DD-YYYY"}
                onChangeText={birthdate => this.setState({ birthdate })}
                value={this.state.birthdate}
                />
              <Text style={[Styles.paragraphText, styles.blurb]}>Did you know that your protein needs vary by age?</Text>
            </View>

            <View style={styles.slide1}>
              <TextInput
                ref='heightText'
                style={styles.input}
                placeholder={"Height (in inches)"}
                keyboardType={"decimal-pad"}
                maxLength={2}
                onChangeText={height => this.setState({ height })}
                value={this.state.height}
              />

              <Text style={[Styles.paragraphText, styles.blurb]}>Different sized people need different sized meals!</Text>
            </View>

            <View style={styles.slide1}>
              <TextInput
                ref='weightText'
                style={styles.input}
                placeholder={"Weight (in pounds)"}
                keyboardType={"decimal-pad"}
                maxLength={3}
                onChangeText={bodyweight => this.setState({ bodyweight })}
                value={this.state.bodyweight}
              />

              <Text style={[Styles.paragraphText, styles.blurb]}>Your bodyweight will help determine what your portion sizes are.</Text>
            </View>

            <View style={styles.slide1}>
              <TextInput
                ref='bodyFatText'
                style={styles.input}
                placeholder={"Body fat %"}
                keyboardType={"decimal-pad"}
                maxLength={2}
                onChangeText={bodyfat => this.setState({ bodyfat })}
                value={this.state.bodyfat}
              />

              <Text style={[Styles.paragraphText, styles.blurb]}>Different sized people need different sized meals!</Text>

              <TouchableHighlight
                style={Styles.linkButton}
                underlayColor={Colors.paleGreen}
                onPress={() => this.saveClientData(navigate)}>
                <Text style={[Styles.link, Styles.textCenter, Styles.whiteColor]}>CREATE MY ACCOUNT</Text>
              </TouchableHighlight>
            </View>
          </Swiper>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.paleGreen,
    padding: 40
  },
  genderButtons: {
    marginBottom: 10,
    flexDirection: 'row'
  },
  femaleButton: {
    marginRight: 5
  },
  input: {
    fontSize: 36,
    textAlign: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightGray,
    fontFamily: 'Futura-Medium',
    marginBottom: 20
  },
  blurb: {
    textAlign: 'center',
    marginTop: 25
  }
});
