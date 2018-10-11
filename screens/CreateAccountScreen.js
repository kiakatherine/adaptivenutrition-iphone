import React from 'react';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

import AuthService from '../services/AuthService';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import {
  Button,
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

    this.signUp = this.signUp.bind(this);
  }

  async signUp() {
    const { navigate } = this.props.navigation;
    await AuthService.signUp(this.state.email, this.state.password);
    const authenticated = await AuthService.isSignedIn();
    if (authenticated) navigate('Authenticated');
    else this.setState({ unauthorized: true });
  }

  navigatePage(page, navigateBack) {
    if(navigateBack) {
      this.setState({ page });
      return;
    }

    console.log(this.state.gender, this.state.birthdate, this.state.height, this.state.bodyweight, this.state.bodyfat)

    if(page === 2 && (this.state.firstName && this.state.lastName)) {
      this.setState({ page, showError: false });
    } else if(page === 3 && (this.state.gender && this.state.birthdate && this.state.height && this.state.bodyweight && this.state.bodyfat)) {
      this.setState({ page, showError: false });
    } else {
      this.setState({ showError: true });
    }
  }

  render() {
    return (
      <View style={Styles.body}>
        <View>
          <Text style={Styles.bigTitle}>Create Account</Text>
        </View>

        <View style={Styles.content}>
          {this.state.page === 1 &&
            <View>
              <Text style={Styles.contentHeading}>
                We need a few things in order to build your meal plan...
              </Text>
              <TextInput
                style={Styles.forms.textInput}
                placeholder={"First Name"}
                autoFocus
                onChangeText={firstName => this.setState({ firstName })}
                value={this.state.firstName}
              />
              <TextInput
                style={Styles.forms.textInput}
                placeholder={"Last Name"}
                autoFocus
                onChangeText={lastName => this.setState({ lastName })}
                value={this.state.lastName}
              />

              {this.state.showError && <Text style={[Styles.errorText, Styles.textCenter, Styles.paragraphText]}>Make sure to fill out all fields!</Text>}

              <TouchableHighlight
                style={Styles.button}
                onPress={() => this.navigatePage(2) }>
                  <Text style={[Styles.buttonText, Styles.buttonWithIconText]}>
                    <FontAwesome
                      name='arrow-right'
                      size={16}
                    />
                  </Text>
              </TouchableHighlight>
            </View>}

          {this.state.page === 2 &&
            <View>
              <TextInput
                style={Styles.forms.textInput}
                placeholder={"Gender"}
                autoFocus
                onChangeText={gender => this.setState({ gender })}
                value={this.state.gender}
              />
              <TextInput
                style={Styles.forms.textInput}
                placeholder={"Birthdate"}
                autoFocus
                onChangeText={birthdate => this.setState({ birthdate })}
                value={this.state.birthdate}
              />
              <TextInput
                style={Styles.forms.textInput}
                placeholder={"Height"}
                keyboardType="numeric"
                autoFocus
                onChangeText={height => this.setState({ height })}
                value={this.state.height}
              />
              <TextInput
                style={Styles.forms.textInput}
                placeholder={"Bodyweight"}
                keyboardType="numeric"
                autoFocus
                onChangeText={bodyweight => this.setState({ bodyweight })}
                value={this.state.bodyweight}
              />
              <TextInput
                style={Styles.forms.textInput}
                placeholder={"Body fat percentage"}
                keyboardType="numeric"
                autoFocus
                onChangeText={bodyfat => this.setState({ bodyfat })}
                value={this.state.bodyfat}
              />

              {this.state.showError && <Text style={[Styles.errorText, Styles.textCenter, Styles.paragraphText]}>Make sure to fill out all fields!</Text>}

              <TouchableHighlight
                style={Styles.button}
                onPress={() => this.navigatePage(3) }>
                  <Text style={[Styles.buttonText, Styles.buttonWithIconText]}>
                    <FontAwesome
                      name='arrow-right'
                      size={16}
                    />
                  </Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={[Styles.button, Styles.buttonInverted]}
                onPress={() => this.navigatePage(1, true) }>
                  <Text style={Styles.buttonInvertedText}>Back</Text>
              </TouchableHighlight>
            </View>}

          {this.state.page === 3 &&
            <View>
              <TextInput
                style={Styles.forms.textInput}
                placeholder={"Email Address"}
                keyboardType="email-address"
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
              <TouchableHighlight
                style={Styles.button}
                disabled={!this.state.email.trim()}
                onPress={this.signUp}>
                <Text style={Styles.buttonText}>Create</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={Styles.button}
                onPress={() => this.navigatePage(2, true) }>
                  <Text style={Styles.link}>Back</Text>
              </TouchableHighlight>
            </View>}
        </View>
      </View>
    );
  }
}
