import React from 'react';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import moment from 'moment';

import AuthService from '../services/AuthService';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import Swiper from 'react-native-swiper';

import {
  Button,
  DatePickerIOS,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

export default class CreateAccountScreen extends React.Component {
  static navigationOptions = {
    title: 'Create Account',
  };

  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      gender: null,
      birthdate: null,
      height: null,
      bodyweight: null,
      bodyfat: null,
      email: "",
      password: null,

      page: 1,
      showError: false
    };

    console.log('date', this.state.birthdate)

    this.signUp = this.signUp.bind(this);
  }

  async signUp() {
    // TO DO: if error, don't navigate to meal plan
    console.log(this.state.firstName, this.state.lastName, this.state.gender, this.state.birthdate, this.state.height, this.state.bodyweight, this.state.bodyfat, this.state.email, this.state.password);

    // TO DO: default settings
    // phase, templateType (as number), latestBodyweight, weightPoints, mealPoints, socialPoints, quizPoints, totalPoints, leanMass

    const { navigate } = this.props.navigation;
    await AuthService.signUp(this.state.email, this.state.password, this.state.firstName, this.state.lastName, this.state.gender, this.state.birthdate, this.state.height, this.state.bodyweight, this.state.bodyfat);
    const authenticated = await AuthService.isSignedIn();
    if (authenticated) navigate('Authenticated');
    else this.setState({ unauthorized: true });
  }

  render() {
    return (
      <View style={Styles.body}>
        <Swiper
          style={styles.wrapper}
          showsButtons={true}
          loop={false}
          index={1}>
          <View style={styles.slide1}>
            <Text style={Styles.bigTitle}>Create Account</Text>
            <Text style={Styles.contentHeading}>
              We just need a few things in order to build your meal plan...
            </Text>
          </View>

          <View style={styles.slide1}>
            <TextInput
              style={styles.input}
              placeholder={"First name"}
              maxLength={20}
              onChangeText={firstName => this.setState({ firstName })}
              value={this.state.firstName}
            />
            <TextInput
              style={styles.input}
              placeholder={"Last name"}
              maxLength={20}
              onChangeText={lastName => this.setState({ lastName })}
              value={this.state.lastName}
            />
            {this.state.showError && <Text style={[Styles.errorText, Styles.textCenter, Styles.paragraphText]}>Make sure to fill out all fields!</Text>}
          </View>

          <View style={styles.slide1}>
            <View style={styles.genderButtons}>
              <TouchableHighlight
                style={[Styles.flexCol, styles.femaleButton]}
                onPress={() => this.setState({ gender: 'F' }) }>
                  <Text style={Styles.textCenter}>
                    <FontAwesome
                      name='female'
                      size={36}
                    />
                  </Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={[Styles.flexCol]}
                onPress={() => this.setState({ gender: 'M' }) }>
                  <Text style={[Styles.textCenter]}>
                  <FontAwesome
                    name='male'
                    size={36}
                  />
                </Text>
              </TouchableHighlight>
            </View>

            <Text style={[Styles.paragraphText, styles.blurb]}>Men and women vary in body fat percentage...</Text>

            {this.state.showError && <Text style={[Styles.errorText, Styles.textCenter, Styles.paragraphText]}>Make sure to fill out all fields!</Text>}
          </View>

          <View style={styles.slide1}>
            <TextInput
              style={styles.input}
              placeholder={"MM-DD-YYYY"}
              value={this.state.birthdate ? moment(this.state.birthdate).format('MM-DD-YYYY') : null} />

            {/*<DatePickerIOS
              mode={'date'}
              date={this.state.birthdate}
              maximumDate={new Date()}
              onDateChange={birthdate => this.setState({ birthdate }) } /> */}

            <Text style={[Styles.paragraphText, styles.blurb]}>Did you know that your protein needs vary by age?</Text>

            {this.state.showError && <Text style={[Styles.errorText, Styles.textCenter, Styles.paragraphText]}>Make sure to fill out all fields!</Text>}
          </View>

          <View style={styles.slide1}>
            <TextInput
              style={styles.input}
              placeholder={"Height (in inches)"}
              keyboardType={"decimal-pad"}
              maxLength={2}
              onChangeText={height => this.setState({ height })}
              value={this.state.height}
            />

            <Text style={[Styles.paragraphText, styles.blurb]}>Different sized people need different sized meals!</Text>
            {this.state.showError && <Text style={[Styles.errorText, Styles.textCenter, Styles.paragraphText]}>Make sure to fill out all fields!</Text>}
          </View>

          <View style={styles.slide1}>
            <TextInput
              style={styles.input}
              placeholder={"Weight (in pounds)"}
              keyboardType={"decimal-pad"}
              maxLength={3}
              onChangeText={bodyweight => this.setState({ bodyweight })}
              value={this.state.bodyweight}
            />

            <Text style={[Styles.paragraphText, styles.blurb]}>Your bodyweight will help determine what your portion sizes are.</Text>
            {this.state.showError && <Text style={[Styles.errorText, Styles.textCenter, Styles.paragraphText]}>Make sure to fill out all fields!</Text>}
          </View>

          <View style={styles.slide1}>
            <TextInput
              style={styles.input}
              placeholder={"Body fat %"}
              keyboardType={"decimal-pad"}
              maxLength={2}
              onChangeText={bodyfat => this.setState({ bodyfat })}
              value={this.state.bodyfat}
            />

            <Text style={[Styles.paragraphText, styles.blurb]}>Different sized people need different sized meals!</Text>

            {this.state.showError && <Text style={[Styles.errorText, Styles.textCenter, Styles.paragraphText]}>Make sure to fill out all fields!</Text>}
          </View>

          <View style={styles.slide1}>
            <TextInput
              style={styles.input}
              placeholder={"Email address"}
              keyboardType={"email-address"}
              maxLength={30}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
          </View>

          <View style={styles.slide1}>
            <TextInput
              style={styles.input}
              placeholder={"Password"}
              maxLength={20}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />

            {this.state.showError && <Text style={[Styles.errorText, Styles.textCenter, Styles.paragraphText]}>Make sure to fill out all fields!</Text>}

            <TouchableHighlight
              style={Styles.linkButton}
              disabled={!this.state.email.trim()}
              underlayColor={Colors.paleGreen}
              onPress={this.signUp}>
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
